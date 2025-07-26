const crypto = require('crypto');

class LegalAgreementsService {
    constructor() {
        this.agreements = new Map();
        this.userAgreements = new Map();
        this.templates = this.initializeTemplates();
    }

    initializeTemplates() {
        return {
            termsOfService: this.getTermsOfServiceTemplate(),
            privacyPolicy: this.getPrivacyPolicyTemplate(),
            marketplaceAgreement: this.getMarketplaceAgreementTemplate(),
            sellerAgreement: this.getSellerAgreementTemplate(),
            buyerAgreement: this.getBuyerAgreementTemplate(),
            tradeAgreement: this.getTradeAgreementTemplate(),
            disputeResolution: this.getDisputeResolutionTemplate(),
            feeAgreement: this.getFeeAgreementTemplate()
        };
    }

    // Generate Terms of Service
    getTermsOfServiceTemplate() {
        return {
            title: "Watch Platform Terms of Service",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Acceptance of Terms",
                    content: "By accessing and using the Watch trading platform, you accept and agree to be bound by the terms and provision of this agreement."
                },
                {
                    title: "2. Platform Description",
                    content: "Watch is a social trading platform that allows users to buy, sell, and trade items with other community members. The platform charges a 25% fee on all transactions."
                },
                {
                    title: "3. User Eligibility",
                    content: "You must be at least 18 years old to use this platform. You must provide accurate and complete information when creating your account."
                },
                {
                    title: "4. Prohibited Activities",
                    content: "Users may not: sell illegal items, engage in fraud, violate intellectual property rights, or use the platform for any unlawful purpose."
                },
                {
                    title: "5. Platform Fees",
                    content: "Watch charges a 25% platform fee on all transactions. This fee is clearly displayed before each transaction and is non-negotiable."
                },
                {
                    title: "6. Dispute Resolution",
                    content: "All disputes will be resolved through our internal dispute resolution process. Users agree to participate in good faith."
                },
                {
                    title: "7. Limitation of Liability",
                    content: "Watch is not liable for any damages arising from the use of the platform, including but not limited to lost profits, data, or business opportunities."
                },
                {
                    title: "8. Termination",
                    content: "Watch reserves the right to terminate or suspend accounts that violate these terms. Users may terminate their account at any time."
                }
            ]
        };
    }

    // Generate Privacy Policy
    getPrivacyPolicyTemplate() {
        return {
            title: "Watch Platform Privacy Policy",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Information We Collect",
                    content: "We collect: account information, transaction data, communication records, and usage analytics to provide and improve our services."
                },
                {
                    title: "2. How We Use Information",
                    content: "We use your information to: process transactions, provide customer support, prevent fraud, and improve our platform."
                },
                {
                    title: "3. Information Sharing",
                    content: "We do not sell your personal information. We may share data with: payment processors, law enforcement (when required), and service providers."
                },
                {
                    title: "4. Data Security",
                    content: "We implement industry-standard security measures to protect your personal information from unauthorized access or disclosure."
                },
                {
                    title: "5. Your Rights",
                    content: "You have the right to: access your data, request corrections, delete your account, and opt out of marketing communications."
                },
                {
                    title: "6. Data Retention",
                    content: "We retain your information for as long as your account is active or as needed to provide services and comply with legal obligations."
                }
            ]
        };
    }

    // Generate Marketplace Agreement
    getMarketplaceAgreementTemplate() {
        return {
            title: "Watch Marketplace Agreement",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Marketplace Services",
                    content: "Watch provides a marketplace platform for users to buy, sell, and trade items. We facilitate transactions but are not a party to user agreements."
                },
                {
                    title: "2. User Responsibilities",
                    content: "Users are responsible for: accurate item descriptions, honest pricing, timely shipping, and resolving disputes with other users."
                },
                {
                    title: "3. Platform Fees",
                    content: "A 25% platform fee applies to all transactions. This fee is calculated and displayed before each transaction is completed."
                },
                {
                    title: "4. Payment Processing",
                    content: "All payments are processed through Stripe. Users agree to Stripe's terms of service and privacy policy."
                },
                {
                    title: "5. Item Authenticity",
                    content: "Sellers must ensure items are authentic and as described. Watch may require proof of authenticity for high-value items."
                },
                {
                    title: "6. Shipping and Delivery",
                    content: "Sellers are responsible for shipping items within 3 business days of payment confirmation. Buyers must provide accurate shipping addresses."
                },
                {
                    title: "7. Returns and Refunds",
                    content: "Returns are handled on a case-by-case basis. Watch will mediate disputes and may issue refunds when appropriate."
                }
            ]
        };
    }

    // Generate Seller Agreement
    getSellerAgreementTemplate() {
        return {
            title: "Watch Seller Agreement",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Seller Obligations",
                    content: "As a seller, you agree to: provide accurate item descriptions, ship items promptly, respond to buyer inquiries, and resolve issues professionally."
                },
                {
                    title: "2. Item Listings",
                    content: "All listings must include: clear photos, accurate descriptions, honest pricing, and truthful condition assessments."
                },
                {
                    title: "3. Platform Fees",
                    content: "You will receive 75% of the sale price after our 25% platform fee. Fees are deducted automatically upon successful sale."
                },
                {
                    title: "4. Payment Schedule",
                    content: "Seller payouts are processed within 3-5 business days after buyer confirms receipt and satisfaction with the item."
                },
                {
                    title: "5. Shipping Requirements",
                    content: "Items must be shipped within 3 business days of payment confirmation. Provide tracking information to buyers."
                },
                {
                    title: "6. Dispute Resolution",
                    content: "If a buyer disputes a transaction, you agree to participate in our dispute resolution process and provide requested documentation."
                },
                {
                    title: "7. Prohibited Items",
                    content: "You may not sell: illegal items, counterfeit goods, dangerous materials, or items that violate intellectual property rights."
                }
            ]
        };
    }

    // Generate Buyer Agreement
    getBuyerAgreementTemplate() {
        return {
            title: "Watch Buyer Agreement",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Buyer Obligations",
                    content: "As a buyer, you agree to: pay promptly, provide accurate shipping information, inspect items upon receipt, and communicate with sellers professionally."
                },
                {
                    title: "2. Payment Terms",
                    content: "Payment is due immediately upon purchase. You will pay the item price plus our 25% platform fee, clearly displayed before purchase."
                },
                {
                    title: "3. Item Inspection",
                    content: "Inspect items within 48 hours of receipt. Report any issues immediately to the seller and Watch support."
                },
                {
                    title: "4. Dispute Process",
                    content: "If an item is not as described, contact the seller first. If unresolved, contact Watch support within 7 days of receipt."
                },
                {
                    title: "5. Shipping Address",
                    content: "Provide accurate and complete shipping addresses. Watch is not responsible for delivery issues due to incorrect addresses."
                },
                {
                    title: "6. Payment Security",
                    content: "All payments are processed securely through Stripe. Your payment information is protected by industry-standard encryption."
                },
                {
                    title: "7. Refund Policy",
                    content: "Refunds are issued when items are not as described or arrive damaged. Processing time is 3-5 business days."
                }
            ]
        };
    }

    // Generate Trade Agreement
    getTradeAgreementTemplate() {
        return {
            title: "Watch Trade Agreement",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Trade Process",
                    content: "Trades involve exchanging items between two users. Each user pays a 25% platform fee based on their item's declared value."
                },
                {
                    title: "2. Item Valuation",
                    content: "Both users must honestly declare their item values. Watch may require proof of value for high-value items."
                },
                {
                    title: "3. Fee Payment",
                    content: "Each user pays their respective platform fee before the trade is processed. Fees are calculated as 25% of declared item value."
                },
                {
                    title: "4. Shipping Coordination",
                    content: "Both users must ship their items within 3 business days of fee payment confirmation. Provide tracking information to each other."
                },
                {
                    title: "5. Trade Completion",
                    content: "Trade is complete when both users confirm receipt and satisfaction with received items. Disputes must be reported within 48 hours."
                },
                {
                    title: "6. Dispute Resolution",
                    content: "If items are not as described, both users must participate in our dispute resolution process. Fees are non-refundable."
                },
                {
                    title: "7. Trade Cancellation",
                    content: "Trades may be cancelled before shipping. Platform fees are non-refundable once paid."
                }
            ]
        };
    }

    // Generate Dispute Resolution Agreement
    getDisputeResolutionTemplate() {
        return {
            title: "Watch Dispute Resolution Agreement",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Dispute Types",
                    content: "Disputes may arise from: items not as described, damaged items, non-delivery, payment issues, or communication problems."
                },
                {
                    title: "2. Initial Resolution",
                    content: "Users must attempt to resolve disputes directly first. Contact the other party within 48 hours of issue discovery."
                },
                {
                    title: "3. Watch Mediation",
                    content: "If direct resolution fails, contact Watch support with: transaction details, evidence, and attempted resolution steps."
                },
                {
                    title: "4. Evidence Requirements",
                    content: "Provide: photos, communication records, shipping information, and any other relevant documentation to support your case."
                },
                {
                    title: "5. Resolution Timeline",
                    content: "Watch will review disputes within 3-5 business days and provide a resolution decision. Complex cases may take longer."
                },
                {
                    title: "6. Possible Outcomes",
                    content: "Possible resolutions include: full refund, partial refund, item return, account suspension, or no action required."
                },
                {
                    title: "7. Appeal Process",
                    content: "Users may appeal decisions within 7 days by providing additional evidence or clarification."
                }
            ]
        };
    }

    // Generate Fee Agreement
    getFeeAgreementTemplate() {
        return {
            title: "Watch Platform Fee Agreement",
            version: "1.0",
            effectiveDate: new Date().toISOString(),
            sections: [
                {
                    title: "1. Fee Structure",
                    content: "Watch charges a 25% platform fee on all transactions. This fee is applied to: buy transactions, sell transactions, and trade transactions."
                },
                {
                    title: "2. Fee Calculation",
                    content: "For buy/sell: 25% of sale price. For trades: 25% of each item's declared value. Fees are calculated and displayed before each transaction."
                },
                {
                    title: "3. Fee Payment",
                    content: "Fees are automatically deducted from seller payouts and added to buyer costs. Trade fees are paid separately by each user."
                },
                {
                    title: "4. Fee Transparency",
                    content: "All fees are clearly displayed before transaction completion. Users must acknowledge fee amounts before proceeding."
                },
                {
                    title: "5. Fee Non-Negotiability",
                    content: "Platform fees are non-negotiable and apply to all users equally. No exceptions or discounts are provided."
                },
                {
                    title: "6. Fee Refunds",
                    content: "Platform fees are non-refundable except in cases of platform error or technical failure."
                },
                {
                    title: "7. Fee Changes",
                    content: "Watch reserves the right to modify fee structure with 30 days notice. Users will be notified of any changes."
                }
            ]
        };
    }

    // Generate agreement for a specific user
    generateUserAgreement(userId, agreementType, customData = {}) {
        const template = this.templates[agreementType];
        if (!template) {
            throw new Error(`Unknown agreement type: ${agreementType}`);
        }

        const agreementId = this.generateAgreementId();
        const timestamp = new Date().toISOString();
        
        const agreement = {
            id: agreementId,
            userId: userId,
            type: agreementType,
            title: template.title,
            version: template.version,
            effectiveDate: template.effectiveDate,
            generatedDate: timestamp,
            customData: customData,
            sections: template.sections,
            signature: null,
            signedDate: null,
            status: 'pending'
        };

        this.agreements.set(agreementId, agreement);
        return agreement;
    }

    // Generate multiple agreements for a user
    generateUserAgreementPackage(userId, customData = {}) {
        const packageId = this.generateAgreementId();
        const agreements = {};

        // Generate all relevant agreements
        const agreementTypes = [
            'termsOfService',
            'privacyPolicy', 
            'marketplaceAgreement',
            'feeAgreement',
            'disputeResolution'
        ];

        agreementTypes.forEach(type => {
            agreements[type] = this.generateUserAgreement(userId, type, customData);
        });

        const agreementPackage = {
            id: packageId,
            userId: userId,
            agreements: agreements,
            generatedDate: new Date().toISOString(),
            status: 'pending'
        };

        this.userAgreements.set(userId, agreementPackage);
        return agreementPackage;
    }

    // Sign an agreement
    signAgreement(agreementId, userId, signatureData) {
        const agreement = this.agreements.get(agreementId);
        if (!agreement) {
            throw new Error('Agreement not found');
        }

        if (agreement.userId !== userId) {
            throw new Error('User not authorized to sign this agreement');
        }

        agreement.signature = {
            userId: userId,
            timestamp: new Date().toISOString(),
            ipAddress: signatureData.ipAddress,
            userAgent: signatureData.userAgent,
            digitalSignature: this.generateDigitalSignature(agreement, signatureData)
        };

        agreement.signedDate = new Date().toISOString();
        agreement.status = 'signed';

        return agreement;
    }

    // Generate digital signature
    generateDigitalSignature(agreement, signatureData) {
        const data = `${agreement.id}-${agreement.userId}-${signatureData.timestamp}-${signatureData.ipAddress}`;
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    // Get user's agreements
    getUserAgreements(userId) {
        const userPackage = this.userAgreements.get(userId);
        if (!userPackage) {
            return null;
        }

        return Object.values(userPackage.agreements);
    }

    // Get agreement by ID
    getAgreement(agreementId) {
        return this.agreements.get(agreementId);
    }

    // Check if user has signed required agreements
    hasSignedRequiredAgreements(userId) {
        const userPackage = this.userAgreements.get(userId);
        if (!userPackage) {
            return false;
        }

        const requiredAgreements = ['termsOfService', 'privacyPolicy', 'marketplaceAgreement'];
        return requiredAgreements.every(type => 
            userPackage.agreements[type] && userPackage.agreements[type].status === 'signed'
        );
    }

    // Generate agreement ID
    generateAgreementId() {
        return `agreement_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    // Export agreement as PDF (placeholder for future implementation)
    exportAgreementAsPDF(agreementId) {
        const agreement = this.getAgreement(agreementId);
        if (!agreement) {
            throw new Error('Agreement not found');
        }

        // This would integrate with a PDF generation library
        return {
            agreementId: agreement.id,
            pdfUrl: `/agreements/${agreement.id}.pdf`,
            generatedAt: new Date().toISOString()
        };
    }

    // Get agreement statistics
    getAgreementStats() {
        const stats = {
            totalAgreements: this.agreements.size,
            signedAgreements: 0,
            pendingAgreements: 0,
            agreementTypes: {}
        };

        for (const agreement of this.agreements.values()) {
            if (agreement.status === 'signed') {
                stats.signedAgreements++;
            } else {
                stats.pendingAgreements++;
            }

            if (!stats.agreementTypes[agreement.type]) {
                stats.agreementTypes[agreement.type] = 0;
            }
            stats.agreementTypes[agreement.type]++;
        }

        return stats;
    }
}

module.exports = LegalAgreementsService; 