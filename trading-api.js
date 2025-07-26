const express = require('express');
const TradingService = require('./trading-service');
const auth = require('./auth');

const router = express.Router();
const tradingService = new TradingService();

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

// Get available items in marketplace
router.get('/items', async (req, res) => {
    try {
        const items = tradingService.getAvailableItems();
        res.json({
            success: true,
            items,
            totalItems: items.length
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// List an item for sale
router.post('/sell', authenticateToken, async (req, res) => {
    try {
        const { itemId, price, title, description, category, condition, images } = req.body;
        const sellerId = req.user.id;

        if (!itemId || !price || !title) {
            return res.status(400).json({ 
                success: false, 
                message: 'Item ID, price, and title are required' 
            });
        }

        const itemDetails = {
            title,
            description,
            category,
            condition,
            images: images || []
        };

        const result = await tradingService.processSellTransaction(
            sellerId, 
            itemId, 
            parseFloat(price), 
            itemDetails
        );

        if (result.success) {
            res.json({
                success: true,
                message: 'Item listed successfully',
                transaction: result.transaction,
                item: result.item,
                feeBreakdown: result.feeBreakdown
            });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Buy an item
router.post('/buy', authenticateToken, async (req, res) => {
    try {
        const { itemId } = req.body;
        const buyerId = req.user.id;

        if (!itemId) {
            return res.status(400).json({ 
                success: false, 
                message: 'Item ID is required' 
            });
        }

        // Find the item
        const items = tradingService.getAvailableItems();
        const item = items.find(i => i.id === itemId);

        if (!item) {
            return res.status(404).json({ 
                success: false, 
                message: 'Item not found or not available' 
            });
        }

        const result = await tradingService.processBuyTransaction(
            buyerId,
            item.sellerId,
            itemId,
            item.price
        );

        if (result.success) {
            res.json({
                success: true,
                message: 'Purchase initiated successfully',
                transaction: result.transaction,
                paymentIntent: result.paymentIntent,
                feeBreakdown: result.feeBreakdown
            });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Initiate a trade
router.post('/trade', authenticateToken, async (req, res) => {
    try {
        const { userBId, itemAId, itemBId, itemAValue, itemBValue } = req.body;
        const userAId = req.user.id;

        if (!userBId || !itemAId || !itemBId || !itemAValue || !itemBValue) {
            return res.status(400).json({ 
                success: false, 
                message: 'All trade parameters are required' 
            });
        }

        const result = await tradingService.processTradeTransaction(
            userAId,
            userBId,
            itemAId,
            itemBId,
            parseFloat(itemAValue),
            parseFloat(itemBValue)
        );

        if (result.success) {
            res.json({
                success: true,
                message: 'Trade initiated successfully',
                transaction: result.transaction,
                paymentIntents: result.paymentIntents,
                feeBreakdown: result.feeBreakdown
            });
        } else {
            res.status(400).json({ success: false, error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get user's transaction history
router.get('/transactions', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = tradingService.getUserTransactions(userId);
        
        res.json({
            success: true,
            transactions,
            totalTransactions: transactions.length
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Get platform statistics (admin only)
router.get('/stats', authenticateToken, async (req, res) => {
    try {
        // Check if user is admin (you can implement your own admin check)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ 
                success: false, 
                message: 'Admin access required' 
            });
        }

        const stats = tradingService.getPlatformStats();
        res.json({
            success: true,
            stats
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Complete a transaction
router.post('/complete/:transactionId', authenticateToken, async (req, res) => {
    try {
        const { transactionId } = req.params;
        const result = tradingService.completeTransaction(transactionId);

        if (result.success) {
            res.json({
                success: true,
                message: 'Transaction completed successfully',
                transaction: result.transaction
            });
        } else {
            res.status(404).json({ success: false, error: result.error });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Calculate fees for preview
router.post('/calculate-fees', async (req, res) => {
    try {
        const { type, amount, itemAValue, itemBValue } = req.body;

        let feeBreakdown = {};

        switch (type) {
            case 'buy':
            case 'sell':
                const platformFee = tradingService.calculatePlatformFee(amount);
                const sellerPayout = tradingService.calculateSellerPayout(amount);
                const buyerCost = tradingService.calculateBuyerCost(amount);
                
                feeBreakdown = {
                    originalAmount: amount,
                    platformFee,
                    sellerPayout,
                    buyerCost,
                    feeRate: tradingService.platformFeeRate
                };
                break;

            case 'trade':
                const platformFeeA = tradingService.calculatePlatformFee(itemAValue);
                const platformFeeB = tradingService.calculatePlatformFee(itemBValue);
                const totalFees = platformFeeA + platformFeeB;
                
                feeBreakdown = {
                    itemAValue,
                    itemBValue,
                    platformFeeA,
                    platformFeeB,
                    totalFees,
                    feeRate: tradingService.platformFeeRate
                };
                break;

            default:
                return res.status(400).json({ 
                    success: false, 
                    message: 'Invalid transaction type' 
                });
        }

        res.json({
            success: true,
            feeBreakdown
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router; 