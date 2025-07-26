class SwipeTradingComponent {
    constructor() {
        this.currentIndex = 0;
        this.items = [];
        this.userItems = [];
        this.matches = [];
        this.swipeThreshold = 100;
        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.init();
    }

    init() {
        this.loadUserItems();
        this.loadMatchingItems();
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.setupSwipeEvents();
            this.setupButtonEvents();
        });
    }

    setupSwipeEvents() {
        const cardContainer = document.getElementById('swipe-card-container');
        if (!cardContainer) return;

        // Touch events for mobile
        cardContainer.addEventListener('touchstart', (e) => this.handleTouchStart(e));
        cardContainer.addEventListener('touchmove', (e) => this.handleTouchMove(e));
        cardContainer.addEventListener('touchend', (e) => this.handleTouchEnd(e));

        // Mouse events for desktop
        cardContainer.addEventListener('mousedown', (e) => this.handleMouseStart(e));
        cardContainer.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        cardContainer.addEventListener('mouseup', (e) => this.handleMouseEnd(e));
        cardContainer.addEventListener('mouseleave', (e) => this.handleMouseEnd(e));
    }

    setupButtonEvents() {
        // Pass button
        const passBtn = document.getElementById('pass-btn');
        if (passBtn) {
            passBtn.addEventListener('click', () => this.passItem());
        }

        // Trade button
        const tradeBtn = document.getElementById('trade-btn');
        if (tradeBtn) {
            tradeBtn.addEventListener('click', () => this.tradeItem());
        }

        // Super like button
        const superLikeBtn = document.getElementById('super-like-btn');
        if (superLikeBtn) {
            superLikeBtn.addEventListener('click', () => this.superLikeItem());
        }
    }

    // Touch event handlers
    handleTouchStart(e) {
        this.isDragging = true;
        this.startX = e.touches[0].clientX;
        this.currentX = this.startX;
        this.updateCardTransform(0);
    }

    handleTouchMove(e) {
        if (!this.isDragging) return;
        e.preventDefault();
        this.currentX = e.touches[0].clientX;
        const deltaX = this.currentX - this.startX;
        this.updateCardTransform(deltaX);
    }

    handleTouchEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        const deltaX = this.currentX - this.startX;
        this.handleSwipeEnd(deltaX);
    }

    // Mouse event handlers
    handleMouseStart(e) {
        this.isDragging = true;
        this.startX = e.clientX;
        this.currentX = this.startX;
        this.updateCardTransform(0);
    }

    handleMouseMove(e) {
        if (!this.isDragging) return;
        this.currentX = e.clientX;
        const deltaX = this.currentX - this.startX;
        this.updateCardTransform(deltaX);
    }

    handleMouseEnd(e) {
        if (!this.isDragging) return;
        this.isDragging = false;
        const deltaX = this.currentX - this.startX;
        this.handleSwipeEnd(deltaX);
    }

    updateCardTransform(deltaX) {
        const currentCard = this.getCurrentCard();
        if (!currentCard) return;

        const rotation = (deltaX / 10) * (deltaX > 0 ? 1 : -1);
        const opacity = 1 - Math.abs(deltaX) / 500;
        
        currentCard.style.transform = `translateX(${deltaX}px) rotate(${rotation}deg)`;
        currentCard.style.opacity = Math.max(0.5, opacity);

        // Update action indicators
        this.updateActionIndicators(deltaX);
    }

    updateActionIndicators(deltaX) {
        const passIndicator = document.getElementById('pass-indicator');
        const tradeIndicator = document.getElementById('trade-indicator');
        const superLikeIndicator = document.getElementById('super-like-indicator');

        if (deltaX < -this.swipeThreshold) {
            // Swipe left - Pass
            if (passIndicator) {
                passIndicator.style.opacity = Math.min(1, Math.abs(deltaX) / 200);
                passIndicator.style.transform = 'scale(1.1)';
            }
        } else if (deltaX > this.swipeThreshold) {
            // Swipe right - Trade
            if (tradeIndicator) {
                tradeIndicator.style.opacity = Math.min(1, deltaX / 200);
                tradeIndicator.style.transform = 'scale(1.1)';
            }
        } else {
            // Reset indicators
            if (passIndicator) {
                passIndicator.style.opacity = 0;
                passIndicator.style.transform = 'scale(1)';
            }
            if (tradeIndicator) {
                tradeIndicator.style.opacity = 0;
                tradeIndicator.style.transform = 'scale(1)';
            }
        }
    }

    handleSwipeEnd(deltaX) {
        const currentCard = this.getCurrentCard();
        if (!currentCard) return;

        if (Math.abs(deltaX) > this.swipeThreshold) {
            if (deltaX > 0) {
                // Swipe right - Trade
                this.animateCardOut('right');
                setTimeout(() => this.tradeItem(), 300);
            } else {
                // Swipe left - Pass
                this.animateCardOut('left');
                setTimeout(() => this.passItem(), 300);
            }
        } else {
            // Return to center
            this.animateCardBack();
        }
    }

    animateCardOut(direction) {
        const currentCard = this.getCurrentCard();
        if (!currentCard) return;

        const translateX = direction === 'right' ? 500 : -500;
        const rotation = direction === 'right' ? 30 : -30;

        currentCard.style.transition = 'all 0.3s ease-out';
        currentCard.style.transform = `translateX(${translateX}px) rotate(${rotation}deg)`;
        currentCard.style.opacity = '0';
    }

    animateCardBack() {
        const currentCard = this.getCurrentCard();
        if (!currentCard) return;

        currentCard.style.transition = 'all 0.3s ease-out';
        currentCard.style.transform = 'translateX(0) rotate(0deg)';
        currentCard.style.opacity = '1';
    }

    getCurrentCard() {
        return document.querySelector('.swipe-card.active');
    }

    async loadUserItems() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return;

            // Mock user items - in real app, fetch from API
            this.userItems = [
                {
                    id: 1,
                    name: 'Nintendo Switch',
                    value: 250,
                    image: '🎮',
                    description: 'Like new condition, includes games',
                    category: 'Gaming'
                },
                {
                    id: 2,
                    name: 'iPhone 12',
                    value: 400,
                    image: '📱',
                    description: 'Excellent condition, 128GB',
                    category: 'Electronics'
                },
                {
                    id: 3,
                    name: 'Pokemon Cards',
                    value: 150,
                    image: '🎯',
                    description: 'Rare holographic collection',
                    category: 'Collectibles'
                }
            ];
        } catch (error) {
            console.error('Error loading user items:', error);
        }
    }

    async loadMatchingItems() {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) return;

            // Mock matching items - in real app, fetch from API based on user preferences
            this.items = [
                {
                    id: 101,
                    name: 'PlayStation 5',
                    value: 450,
                    image: '🎮',
                    description: 'Mint condition, barely used',
                    category: 'Gaming',
                    owner: 'GamerPro123',
                    location: 'New York, NY'
                },
                {
                    id: 102,
                    name: 'MacBook Air',
                    value: 800,
                    image: '💻',
                    description: '2022 model, perfect condition',
                    category: 'Electronics',
                    owner: 'TechTrader',
                    location: 'Los Angeles, CA'
                },
                {
                    id: 103,
                    name: 'Magic: The Gathering Cards',
                    value: 200,
                    image: '🎯',
                    description: 'Vintage collection, mint condition',
                    category: 'Collectibles',
                    owner: 'CardCollector',
                    location: 'Chicago, IL'
                },
                {
                    id: 104,
                    name: 'DJ Equipment Set',
                    value: 300,
                    image: '🎧',
                    description: 'Professional setup, includes mixer',
                    category: 'Music',
                    owner: 'DJMaster',
                    location: 'Miami, FL'
                },
                {
                    id: 105,
                    name: 'Mountain Bike',
                    value: 350,
                    image: '🚴',
                    description: 'High-end trail bike, excellent condition',
                    category: 'Sports',
                    owner: 'AdventureSeeker',
                    location: 'Denver, CO'
                }
            ];

            this.renderCards();
        } catch (error) {
            console.error('Error loading matching items:', error);
        }
    }

    renderCards() {
        const container = document.getElementById('swipe-cards-container');
        if (!container) return;

        container.innerHTML = '';

        this.items.forEach((item, index) => {
            const card = this.createCard(item, index);
            container.appendChild(card);
        });

        this.showCurrentCard();
    }

    createCard(item, index) {
        const card = document.createElement('div');
        card.className = `swipe-card ${index === 0 ? 'active' : ''}`;
        card.dataset.index = index;
        card.dataset.itemId = item.id;

        const valueDifference = this.calculateValueDifference(item);
        const matchPercentage = this.calculateMatchPercentage(item);

        card.innerHTML = `
            <div class="card-image">
                <div class="item-emoji">${item.image}</div>
                <div class="match-badge ${this.getMatchClass(matchPercentage)}">
                    ${matchPercentage}% Match
                </div>
            </div>
            <div class="card-content">
                <h3 class="item-name">${item.name}</h3>
                <p class="item-description">${item.description}</p>
                <div class="item-details">
                    <div class="item-value">
                        <span class="value-label">Value:</span>
                        <span class="value-amount">$${item.value}</span>
                    </div>
                    <div class="value-difference ${valueDifference >= 0 ? 'positive' : 'negative'}">
                        ${valueDifference >= 0 ? '+' : ''}$${Math.abs(valueDifference)} difference
                    </div>
                </div>
                <div class="item-meta">
                    <span class="item-category">${item.category}</span>
                    <span class="item-owner">by ${item.owner}</span>
                    <span class="item-location">📍 ${item.location}</span>
                </div>
            </div>
            <div class="card-actions">
                <div class="action-hint">
                    <span class="hint-text">Swipe right to trade • Swipe left to pass</span>
                </div>
            </div>
        `;

        return card;
    }

    calculateValueDifference(item) {
        // Find the best matching user item
        let bestMatch = null;
        let smallestDifference = Infinity;

        this.userItems.forEach(userItem => {
            const difference = Math.abs(item.value - userItem.value);
            if (difference < smallestDifference) {
                smallestDifference = difference;
                bestMatch = userItem;
            }
        });

        if (!bestMatch) return 0;
        return item.value - bestMatch.value;
    }

    calculateMatchPercentage(item) {
        const valueDifference = Math.abs(this.calculateValueDifference(item));
        const maxValue = Math.max(...this.userItems.map(i => i.value), item.value);
        const percentage = Math.max(0, 100 - (valueDifference / maxValue) * 100);
        return Math.round(percentage);
    }

    getMatchClass(percentage) {
        if (percentage >= 90) return 'excellent';
        if (percentage >= 75) return 'good';
        if (percentage >= 60) return 'fair';
        return 'poor';
    }

    showCurrentCard() {
        const cards = document.querySelectorAll('.swipe-card');
        cards.forEach((card, index) => {
            if (index === this.currentIndex) {
                card.classList.add('active');
                card.style.zIndex = cards.length - index;
            } else {
                card.classList.remove('active');
                card.style.zIndex = cards.length - index;
            }
        });

        this.updateProgress();
    }

    updateProgress() {
        const progressBar = document.getElementById('swipe-progress');
        if (progressBar) {
            const progress = ((this.currentIndex + 1) / this.items.length) * 100;
            progressBar.style.width = `${progress}%`;
        }

        const progressText = document.getElementById('swipe-progress-text');
        if (progressText) {
            progressText.textContent = `${this.currentIndex + 1} of ${this.items.length}`;
        }
    }

    passItem() {
        const currentItem = this.items[this.currentIndex];
        console.log('Passed:', currentItem.name);
        
        this.showNotification(`Passed on ${currentItem.name}`, 'info');
        this.nextCard();
    }

    tradeItem() {
        const currentItem = this.items[this.currentIndex];
        const valueDifference = this.calculateValueDifference(currentItem);
        
        if (Math.abs(valueDifference) > 100) {
            this.showNotification('Value difference too high for fair trade', 'warning');
            return;
        }

        console.log('Trading for:', currentItem.name);
        this.showTradeModal(currentItem);
    }

    superLikeItem() {
        const currentItem = this.items[this.currentIndex];
        console.log('Super liked:', currentItem.name);
        
        this.showNotification(`Super liked ${currentItem.name}!`, 'success');
        this.matches.push(currentItem);
        this.nextCard();
    }

    nextCard() {
        this.currentIndex++;
        
        if (this.currentIndex >= this.items.length) {
            this.showNoMoreCards();
            return;
        }

        this.showCurrentCard();
    }

    showNoMoreCards() {
        const container = document.getElementById('swipe-cards-container');
        if (!container) return;

        container.innerHTML = `
            <div class="no-more-cards">
                <div class="no-cards-icon">🎉</div>
                <h3>No More Items!</h3>
                <p>You've seen all available items. Check back later for new matches!</p>
                <div class="matches-summary">
                    <h4>Your Matches (${this.matches.length})</h4>
                    ${this.matches.map(item => `
                        <div class="match-item">
                            <span class="match-emoji">${item.image}</span>
                            <span class="match-name">${item.name}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="mario-btn primary" onclick="location.reload()">
                    🔄 Refresh
                </button>
            </div>
        `;
    }

    showTradeModal(item) {
        const modal = document.getElementById('trade-modal');
        if (!modal) return;

        const valueDifference = this.calculateValueDifference(item);
        const userItem = this.findBestMatchingUserItem(item);

        modal.innerHTML = `
            <div class="mario-modal-content">
                <div class="mario-modal-header">
                    <h2 class="mario-modal-title">🔄 Propose Trade</h2>
                    <span class="mario-modal-close" onclick="this.closest('.mario-modal').style.display='none'">&times;</span>
                </div>
                <div class="trade-proposal">
                    <div class="trade-items">
                        <div class="your-item">
                            <h3>Your Item</h3>
                            <div class="item-card">
                                <div class="item-emoji">${userItem.image}</div>
                                <div class="item-info">
                                    <h4>${userItem.name}</h4>
                                    <p>${userItem.description}</p>
                                    <div class="item-value">$${userItem.value}</div>
                                </div>
                            </div>
                        </div>
                        <div class="trade-arrow">🔄</div>
                        <div class="their-item">
                            <h3>Their Item</h3>
                            <div class="item-card">
                                <div class="item-emoji">${item.image}</div>
                                <div class="item-info">
                                    <h4>${item.name}</h4>
                                    <p>${item.description}</p>
                                    <div class="item-value">$${item.value}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="trade-details">
                        <div class="value-difference ${valueDifference >= 0 ? 'positive' : 'negative'}">
                            Value Difference: ${valueDifference >= 0 ? '+' : ''}$${Math.abs(valueDifference)}
                        </div>
                        <div class="platform-fees">
                            <div>Your Fee (25%): $${(userItem.value * 0.25).toFixed(2)}</div>
                            <div>Their Fee (25%): $${(item.value * 0.25).toFixed(2)}</div>
                        </div>
                    </div>
                    <div class="trade-actions">
                        <button class="mario-btn success" onclick="swipeTrading.sendTradeProposal('${item.id}', '${userItem.id}')">
                            Send Trade Proposal
                        </button>
                        <button class="mario-btn secondary" onclick="this.closest('.mario-modal').style.display='none'">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    findBestMatchingUserItem(item) {
        let bestMatch = this.userItems[0];
        let smallestDifference = Infinity;

        this.userItems.forEach(userItem => {
            const difference = Math.abs(item.value - userItem.value);
            if (difference < smallestDifference) {
                smallestDifference = difference;
                bestMatch = userItem;
            }
        });

        return bestMatch;
    }

    async sendTradeProposal(itemId, userItemId) {
        try {
            const token = localStorage.getItem('watch_token');
            if (!token) {
                this.showNotification('Please log in to send trade proposals', 'error');
                return;
            }

            // Mock API call - in real app, send to backend
            this.showNotification('Trade proposal sent! 🎉', 'success');
            document.getElementById('trade-modal').style.display = 'none';
            this.matches.push(this.items[this.currentIndex]);
            this.nextCard();
        } catch (error) {
            console.error('Error sending trade proposal:', error);
            this.showNotification('Error sending trade proposal', 'error');
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `mario-notification ${type}`;
        notification.textContent = message;
        
        const container = document.getElementById('notification-container') || document.body;
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize swipe trading component
const swipeTrading = new SwipeTradingComponent();

// Global functions for HTML onclick handlers
window.swipeTrading = swipeTrading; 