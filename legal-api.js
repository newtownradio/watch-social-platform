const express = require('express');
const LegalAgreementsService = require('./legal-agreements');
const auth = require('./auth');

const router = express.Router();
const legalService = new LegalAgreementsService();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access token required' });
    }

    try {
        const user = auth.verifyToken(token);
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

// Get all agreement templates
router.get('/templates', async (req, res) => {
    try {
        const templates = legalService.templates;
        const templateList = Object.keys(templates).map(key => ({
            type: key,
            title: templates[key].title,
            version: templates[key].version,
            effectiveDate: templates[key].effectiveDate
        }));

        res.json({
            success: true,
            templates: templateList
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get specific agreement template
router.get('/templates/:type', async (req, res) => {
    try {
        const { type } = req.params;
        const template = legalService.templates[type];

        if (!template) {
            return res.status(404).json({ 
                success: false, 
                message: 'Agreement template not found' 
            });
        }

        res.json({
            success: true,
            template
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Generate agreement package for user
router.post('/generate-package', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const customData = req.body.customData || {};

        const agreementPackage = legalService.generateUserAgreementPackage(userId, customData);

        res.json({
            success: true,
            message: 'Agreement package generated successfully',
            package: agreementPackage
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Generate specific agreement for user
router.post('/generate', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { agreementType, customData } = req.body;

        if (!agreementType) {
            return res.status(400).json({ 
                success: false, 
                message: 'Agreement type is required' 
            });
        }

        const agreement = legalService.generateUserAgreement(userId, agreementType, customData);

        res.json({
            success: true,
            message: 'Agreement generated successfully',
            agreement
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user's agreements
router.get('/user-agreements', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const agreements = legalService.getUserAgreements(userId);

        if (!agreements) {
            return res.json({
                success: true,
                agreements: [],
                message: 'No agreements found for user'
            });
        }

        res.json({
            success: true,
            agreements
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get specific agreement
router.get('/agreements/:agreementId', authenticateToken, async (req, res) => {
    try {
        const { agreementId } = req.params;
        const agreement = legalService.getAgreement(agreementId);

        if (!agreement) {
            return res.status(404).json({ 
                success: false, 
                message: 'Agreement not found' 
            });
        }

        // Check if user is authorized to view this agreement
        if (agreement.userId !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to view this agreement' 
            });
        }

        res.json({
            success: true,
            agreement
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Sign an agreement
router.post('/sign/:agreementId', authenticateToken, async (req, res) => {
    try {
        const { agreementId } = req.params;
        const userId = req.user.id;
        
        const signatureData = {
            timestamp: new Date().toISOString(),
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        };

        const signedAgreement = legalService.signAgreement(agreementId, userId, signatureData);

        res.json({
            success: true,
            message: 'Agreement signed successfully',
            agreement: signedAgreement
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// Check if user has signed required agreements
router.get('/compliance-check', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const hasSigned = legalService.hasSignedRequiredAgreements(userId);

        res.json({
            success: true,
            hasSignedRequiredAgreements: hasSigned,
            message: hasSigned ? 'User has signed all required agreements' : 'User needs to sign required agreements'
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Bulk sign agreements
router.post('/bulk-sign', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { agreementIds } = req.body;

        if (!agreementIds || !Array.isArray(agreementIds)) {
            return res.status(400).json({ 
                success: false, 
                message: 'Agreement IDs array is required' 
            });
        }

        const signatureData = {
            timestamp: new Date().toISOString(),
            ipAddress: req.ip || req.connection.remoteAddress,
            userAgent: req.headers['user-agent']
        };

        const signedAgreements = [];
        const errors = [];

        for (const agreementId of agreementIds) {
            try {
                const signedAgreement = legalService.signAgreement(agreementId, userId, signatureData);
                signedAgreements.push(signedAgreement);
            } catch (error) {
                errors.push({ agreementId, error: error.message });
            }
        }

        res.json({
            success: true,
            message: `Signed ${signedAgreements.length} agreements successfully`,
            signedAgreements,
            errors: errors.length > 0 ? errors : undefined
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Export agreement as PDF (placeholder)
router.get('/export/:agreementId', authenticateToken, async (req, res) => {
    try {
        const { agreementId } = req.params;
        const userId = req.user.id;

        const agreement = legalService.getAgreement(agreementId);
        if (!agreement) {
            return res.status(404).json({ 
                success: false, 
                message: 'Agreement not found' 
            });
        }

        if (agreement.userId !== userId && req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized to export this agreement' 
            });
        }

        const pdfExport = legalService.exportAgreementAsPDF(agreementId);

        res.json({
            success: true,
            message: 'PDF export generated successfully',
            export: pdfExport
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get agreement statistics (admin only)
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Admin access required' 
            });
        }

        const stats = legalService.getAgreementStats();

        res.json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Generate transaction-specific agreements
router.post('/transaction-agreements', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const { transactionType, transactionData } = req.body;

        let agreements = [];

        switch (transactionType) {
            case 'buy':
                agreements.push(legalService.generateUserAgreement(userId, 'buyerAgreement', transactionData));
                break;
            case 'sell':
                agreements.push(legalService.generateUserAgreement(userId, 'sellerAgreement', transactionData));
                break;
            case 'trade':
                agreements.push(legalService.generateUserAgreement(userId, 'tradeAgreement', transactionData));
                break;
            default:
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid transaction type' 
                });
        }

        res.json({
            success: true,
            message: 'Transaction agreements generated successfully',
            agreements
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Verify agreement signature
router.post('/verify-signature', async (req, res) => {
    try {
        const { agreementId, digitalSignature } = req.body;

        const agreement = legalService.getAgreement(agreementId);
        if (!agreement) {
            return res.status(404).json({ 
                success: false, 
                message: 'Agreement not found' 
            });
        }

        if (!agreement.signature) {
            return res.json({
                success: true,
                isValid: false,
                message: 'Agreement has not been signed'
            });
        }

        const isValid = agreement.signature.digitalSignature === digitalSignature;

        res.json({
            success: true,
            isValid,
            message: isValid ? 'Signature is valid' : 'Signature is invalid',
            agreement: {
                id: agreement.id,
                type: agreement.type,
                signedDate: agreement.signedDate,
                status: agreement.status
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Update agreement (admin only)
router.put('/agreements/:agreementId', authenticateToken, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Admin access required' 
            });
        }

        const { agreementId } = req.params;
        const { status, notes } = req.body;

        const agreement = legalService.getAgreement(agreementId);
        if (!agreement) {
            return res.status(404).json({ 
                success: false, 
                message: 'Agreement not found' 
            });
        }

        // Update agreement fields
        if (status) agreement.status = status;
        if (notes) agreement.adminNotes = notes;
        agreement.lastModified = new Date().toISOString();

        res.json({
            success: true,
            message: 'Agreement updated successfully',
            agreement
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router; 