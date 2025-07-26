class TradingComponent {
    constructor() {
        this.apiBase = '/api/trading';
        this.feeRate = 0.25; // 25%
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadMarketplace();
    }

    setupEventListeners() {
        // Fee calculator
        const feeCalculator = document.getElementById('fee-calculator');
        if (feeCalculator) {
            feeCalculator.addEventListener('input', (e) => {
                if (e.target.id === 'item-price') {
                    this.updateFeeCalculation();
                }
            });
        }

        // Buy/Sell buttons
        const buyButton = document.getElementById('buy-item-btn');
        if (buyButton) {
            buyButton.addEventListener('click', () => this.showBuyModal());
        }

        const sellButton = document.getElementById('sell-item-btn');
        if (sellButton) {
            sellButton.addEventListener('click', () => this.showSellModal());
        }

        const tradeButton = document.getElementById('trade-item-btn');
        if (tradeButton) {
            tradeButton.addEventListener('click', () => this.showTradeModal());
        }
    }

    // Update fee calculation display
    updateFeeCalculation() {
        const priceInput = document.getElementById('item-price');
        const price = parseFloat(priceInput.value) || 0;
        
        const platformFee = price * this.feeRate;
        const sellerPayout = price - platformFee;
        const buyerCost = price + platformFee;

        // Update display
        document.getElementById('platform-fee').textContent = `$${platformFee.toFixed(2)}`;
        document.getElementById('seller-payout').textContent = `$${sellerPayout.toFixed(2)}`;
        document.getElementById('buyer-cost').textContent = `$${buyerCost.toFixed(2)}`;
        document.getElementById('fee-rate').textContent = `${(this.feeRate * 100)}%`;

        // Update trade calculation if trade modal is open
        this.updateTradeCalculation();
    }

    // Update trade fee calculation
    updateTradeCalculation() {
        const itemAValue = parseFloat(document.getElementById('item-a-value')?.value) || 0;
        const itemBValue = parseFloat(document.getElementById('item-b-value')?.value) || 0;

        const feeA = itemAValue * this.feeRate;
        const feeB = itemBValue * this.feeRate;
        const totalFees = feeA + feeB;

        if (document.getElementById('trade-fee-a')) {
            document.getElementById('trade-fee-a').textContent = `$${feeA.toFixed(2)}`;
            document.getElementById('trade-fee-b').textContent = `$${feeB.toFixed(2)}`;
            document.getElementById('total-trade-fees').textContent = `$${totalFees.toFixed(2)}`;
        }
    }

    // Show buy modal with fee breakdown
    showBuyModal() {
        const modal = document.getElementById('buy-modal');
        if (modal) {
            modal.style.display = 'block';
            this.loadAvailableItems();
        }
    }

    // Show sell modal with fee breakdown
    showSellModal() {
        const modal = document.getElementById('sell-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Show trade modal with fee breakdown
    showTradeModal() {
        const modal = document.getElementById('trade-modal');
        if (modal) {
            modal.style.display = 'block';
        }
    }

    // Load available items in marketplace
    async loadMarketplace() {
        try {
            const response = await fetch(`${this.apiBase}/items`);
            const data = await response.json();
            
            if (data.success) {
                this.renderMarketplace(data.items);
            }
        } catch (error) {
            console.error('Error loading marketplace:', error);
        }
    }

    // Render marketplace items
    renderMarketplace(items) {
        const container = document.getElementById('marketplace-items');
        if (!container) return;

        container.innerHTML = items.map(item => `
            <div class="marketplace-item" data-item-id="${item.id}">
                <div class="item-image">
                    <img src="${item.images[0] || '/placeholder-item.jpg'}" alt="${item.title}">
                </div>
                <div class="item-details">
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="item-price">
                        <span class="original-price">$${item.price.toFixed(2)}</span>
                        <span class="platform-fee">+ $${item.platformFee.toFixed(2)} fee</span>
                        <span class="total-cost">Total: $${(item.price + item.platformFee).toFixed(2)}</span>
                    </div>
                    <div class="item-meta">
                        <span class="condition">${item.condition}</span>
                        <span class="category">${item.category}</span>
                    </div>
                    <button class="buy-now-btn" onclick="tradingComponent.buyItem('${item.id}')">
                        Buy Now - $${(item.price + item.platformFee).toFixed(2)}
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Buy an item
    async buyItem(itemId) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to make a purchase');
                return;
            }

            const response = await fetch(`${this.apiBase}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ itemId })
            });

            const data = await response.json();
            
            if (data.success) {
                this.showPaymentModal(data.paymentIntent, data.feeBreakdown);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error buying item:', error);
            alert('Error processing purchase');
        }
    }

    // Sell an item
    async sellItem(itemData) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to sell an item');
                return;
            }

            const response = await fetch(`${this.apiBase}/sell`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(itemData)
            });

            const data = await response.json();
            
            if (data.success) {
                alert(`Item listed successfully! You'll receive $${data.feeBreakdown.sellerPayout.toFixed(2)} after the 25% platform fee.`);
                this.loadMarketplace();
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error selling item:', error);
            alert('Error listing item');
        }
    }

    // Initiate a trade
    async initiateTrade(tradeData) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                alert('Please log in to initiate a trade');
                return;
            }

            const response = await fetch(`${this.apiBase}/trade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(tradeData)
            });

            const data = await response.json();
            
            if (data.success) {
                this.showTradePaymentModal(data.paymentIntents, data.feeBreakdown);
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error('Error initiating trade:', error);
            alert('Error processing trade');
        }
    }

    // Show payment modal for purchases
    showPaymentModal(paymentIntent, feeBreakdown) {
        const modal = document.getElementById('payment-modal');
        if (modal) {
            document.getElementById('payment-amount').textContent = `$${feeBreakdown.totalCost.toFixed(2)}`;
            document.getElementById('item-price-display').textContent = `$${feeBreakdown.itemPrice.toFixed(2)}`;
            document.getElementById('fee-display').textContent = `$${feeBreakdown.platformFee.toFixed(2)}`;
            modal.style.display = 'block';
        }
    }

    // Show trade payment modal
    showTradePaymentModal(paymentIntents, feeBreakdown) {
        const modal = document.getElementById('trade-payment-modal');
        if (modal) {
            document.getElementById('trade-fee-a-display').textContent = `$${feeBreakdown.platformFeeA.toFixed(2)}`;
            document.getElementById('trade-fee-b-display').textContent = `$${feeBreakdown.platformFeeB.toFixed(2)}`;
            document.getElementById('total-trade-fees-display').textContent = `$${feeBreakdown.totalFees.toFixed(2)}`;
            modal.style.display = 'block';
        }
    }

    // Load user's transaction history
    async loadTransactionHistory() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return;

            const response = await fetch(`${this.apiBase}/transactions`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.renderTransactionHistory(data.transactions);
            }
        } catch (error) {
            console.error('Error loading transaction history:', error);
        }
    }

    // Render transaction history
    renderTransactionHistory(transactions) {
        const container = document.getElementById('transaction-history');
        if (!container) return;

        container.innerHTML = transactions.map(tx => `
            <div class="transaction-item ${tx.type}">
                <div class="transaction-header">
                    <span class="transaction-type">${tx.type.toUpperCase()}</span>
                    <span class="transaction-date">${new Date(tx.timestamp).toLocaleDateString()}</span>
                </div>
                <div class="transaction-details">
                    ${this.getTransactionDetails(tx)}
                </div>
                <div class="transaction-fees">
                    <span class="fee-label">Platform Fee (25%):</span>
                    <span class="fee-amount">$${this.getTransactionFee(tx).toFixed(2)}</span>
                </div>
                <div class="transaction-status ${tx.status}">
                    ${tx.status.toUpperCase()}
                </div>
            </div>
        `).join('');
    }

    // Get transaction details based on type
    getTransactionDetails(tx) {
        switch (tx.type) {
            case 'buy':
                return `
                    <div>Item Price: $${tx.itemPrice.toFixed(2)}</div>
                    <div>Total Paid: $${tx.totalCost.toFixed(2)}</div>
                `;
            case 'sell':
                return `
                    <div>Sale Price: $${tx.itemPrice.toFixed(2)}</div>
                    <div>You Received: $${tx.sellerPayout.toFixed(2)}</div>
                `;
            case 'trade':
                return `
                    <div>Your Item Value: $${tx.itemAValue.toFixed(2)}</div>
                    <div>Their Item Value: $${tx.itemBValue.toFixed(2)}</div>
                `;
            default:
                return '';
        }
    }

    // Get transaction fee
    getTransactionFee(tx) {
        switch (tx.type) {
            case 'buy':
            case 'sell':
                return tx.platformFee;
            case 'trade':
                return tx.totalFees;
            default:
                return 0;
        }
    }

    // Close modals
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
        }
    }
}

// Initialize trading component
const tradingComponent = new TradingComponent();

// Global functions for HTML onclick handlers
window.tradingComponent = tradingComponent; 