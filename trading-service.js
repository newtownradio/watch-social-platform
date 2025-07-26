const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class TradingService {
    constructor() {
        this.platformFeeRate = 0.25; // 25%
        this.transactions = [];
        this.items = [];
    }

    // Calculate platform fee
    calculatePlatformFee(amount) {
        return amount * this.platformFeeRate;
    }

    // Calculate seller payout after fees
    calculateSellerPayout(salePrice) {
        const platformFee = this.calculatePlatformFee(salePrice);
        return salePrice - platformFee;
    }

    // Calculate total buyer cost
    calculateBuyerCost(itemPrice) {
        const platformFee = this.calculatePlatformFee(itemPrice);
        return itemPrice + platformFee;
    }

    // Process a buy transaction
    async processBuyTransaction(buyerId, sellerId, itemId, itemPrice) {
        try {
            const platformFee = this.calculatePlatformFee(itemPrice);
            const totalCost = itemPrice + platformFee;
            const sellerPayout = itemPrice - platformFee;

            const transaction = {
                id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'buy',
                buyerId,
                sellerId,
                itemId,
                itemPrice,
                platformFee,
                totalCost,
                sellerPayout,
                status: 'pending',
                timestamp: new Date(),
                feeRate: this.platformFeeRate
            };

            // Process payment through Stripe
            const paymentIntent = await stripe.paymentIntents.create({
                amount: Math.round(totalCost * 100), // Convert to cents
                currency: 'usd',
                metadata: {
                    transactionId: transaction.id,
                    itemId,
                    buyerId,
                    sellerId,
                    platformFee: platformFee.toString()
                }
            });

            transaction.paymentIntentId = paymentIntent.id;
            this.transactions.push(transaction);

            return {
                success: true,
                transaction,
                paymentIntent,
                feeBreakdown: {
                    itemPrice,
                    platformFee,
                    totalCost,
                    sellerPayout,
                    feeRate: this.platformFeeRate
                }
            };
        } catch (error) {
            console.error('Buy transaction error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Process a sell transaction
    async processSellTransaction(sellerId, itemId, itemPrice, itemDetails) {
        try {
            const platformFee = this.calculatePlatformFee(itemPrice);
            const sellerPayout = itemPrice - platformFee;

            const transaction = {
                id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'sell',
                sellerId,
                itemId,
                itemPrice,
                platformFee,
                sellerPayout,
                status: 'listed',
                timestamp: new Date(),
                feeRate: this.platformFeeRate,
                itemDetails
            };

            // Add item to marketplace
            const item = {
                id: itemId,
                sellerId,
                price: itemPrice,
                platformFee,
                sellerPayout,
                status: 'available',
                listedAt: new Date(),
                ...itemDetails
            };

            this.items.push(item);
            this.transactions.push(transaction);

            return {
                success: true,
                transaction,
                item,
                feeBreakdown: {
                    itemPrice,
                    platformFee,
                    sellerPayout,
                    feeRate: this.platformFeeRate
                }
            };
        } catch (error) {
            console.error('Sell transaction error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Process a trade transaction
    async processTradeTransaction(userAId, userBId, itemAId, itemBId, itemAValue, itemBValue) {
        try {
            const platformFeeA = this.calculatePlatformFee(itemAValue);
            const platformFeeB = this.calculatePlatformFee(itemBValue);
            const totalFees = platformFeeA + platformFeeB;

            const transaction = {
                id: `tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                type: 'trade',
                userAId,
                userBId,
                itemAId,
                itemBId,
                itemAValue,
                itemBValue,
                platformFeeA,
                platformFeeB,
                totalFees,
                status: 'pending',
                timestamp: new Date(),
                feeRate: this.platformFeeRate
            };

            // Create payment intents for both users' fees
            const paymentIntentA = await stripe.paymentIntents.create({
                amount: Math.round(platformFeeA * 100),
                currency: 'usd',
                metadata: {
                    transactionId: transaction.id,
                    userId: userAId,
                    itemId: itemAId,
                    feeType: 'trade_fee'
                }
            });

            const paymentIntentB = await stripe.paymentIntents.create({
                amount: Math.round(platformFeeB * 100),
                currency: 'usd',
                metadata: {
                    transactionId: transaction.id,
                    userId: userBId,
                    itemId: itemBId,
                    feeType: 'trade_fee'
                }
            });

            transaction.paymentIntentAId = paymentIntentA.id;
            transaction.paymentIntentBId = paymentIntentB.id;
            this.transactions.push(transaction);

            return {
                success: true,
                transaction,
                paymentIntents: {
                    userA: paymentIntentA,
                    userB: paymentIntentB
                },
                feeBreakdown: {
                    itemAValue,
                    itemBValue,
                    platformFeeA,
                    platformFeeB,
                    totalFees,
                    feeRate: this.platformFeeRate
                }
            };
        } catch (error) {
            console.error('Trade transaction error:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // Get transaction history for a user
    getUserTransactions(userId) {
        return this.transactions.filter(tx => 
            tx.buyerId === userId || 
            tx.sellerId === userId || 
            tx.userAId === userId || 
            tx.userBId === userId
        );
    }

    // Get available items in marketplace
    getAvailableItems() {
        return this.items.filter(item => item.status === 'available');
    }

    // Get platform revenue statistics
    getPlatformStats() {
        const completedTransactions = this.transactions.filter(tx => tx.status === 'completed');
        const totalRevenue = completedTransactions.reduce((sum, tx) => {
            if (tx.type === 'buy' || tx.type === 'sell') {
                return sum + tx.platformFee;
            } else if (tx.type === 'trade') {
                return sum + tx.totalFees;
            }
            return sum;
        }, 0);

        return {
            totalTransactions: completedTransactions.length,
            totalRevenue,
            averageFee: totalRevenue / completedTransactions.length || 0,
            feeRate: this.platformFeeRate
        };
    }

    // Complete a transaction
    completeTransaction(transactionId) {
        const transaction = this.transactions.find(tx => tx.id === transactionId);
        if (transaction) {
            transaction.status = 'completed';
            transaction.completedAt = new Date();
            return { success: true, transaction };
        }
        return { success: false, error: 'Transaction not found' };
    }
}

module.exports = TradingService; 