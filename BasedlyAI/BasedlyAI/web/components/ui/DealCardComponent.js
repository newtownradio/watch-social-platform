// DealCardComponent.js - Deal card component
class DealCardComponent extends BaseComponent {
    constructor(dataManager) {
        super('DealCard', dataManager);
    }

    createElement(deal) {
        const card = document.createElement('div');
        card.style.cssText = `
            background: var(--lux-dark-gray); 
            border: 2px solid var(--lux-hot-pink); 
            padding: 24px; 
            transition: all 0.3s ease; 
            cursor: pointer;
            position: relative;
            margin-bottom: 20px;
        `;

        // New indicator if deal is new
        if (deal.isNew) {
            const newIndicator = this.createStyledElement('div', `
                position: absolute;
                top: 8px;
                right: 8px;
                background: var(--lux-beige);
                color: var(--lux-black);
                font-size: 10px;
                font-weight: bold;
                padding: 2px 6px;
                text-transform: uppercase;
                letter-spacing: 1px;
            `, 'NEW');
            card.appendChild(newIndicator);
        }

        // Brand logo
        const brandLogo = document.createElement('img');
        brandLogo.src = deal.logo;
        brandLogo.style.cssText = `
            width: 120px; 
            height: 80px; 
            object-fit: contain; 
            margin-bottom: 16px;
        `;

        // Brand name
        const brandName = this.createStyledElement('h3', `
            color: var(--lux-hot-pink); 
            font-size: 18px; 
            font-weight: 600; 
            margin-bottom: 8px;
        `, deal.brand);

        // Deal title
        const dealTitle = this.createStyledElement('h4', `
            color: var(--lux-white); 
            font-size: 16px; 
            font-weight: 400; 
            margin-bottom: 12px;
        `, deal.title);

        // Price
        const price = this.createStyledElement('p', `
            color: var(--lux-beige); 
            font-size: 20px; 
            font-weight: 700; 
            margin-bottom: 8px;
        `, `$${deal.price}`);

        // Original price if discounted
        if (deal.originalPrice && deal.originalPrice > deal.price) {
            const originalPrice = this.createStyledElement('p', `
                color: var(--lux-white); 
                font-size: 14px; 
                text-decoration: line-through; 
                opacity: 0.6;
                margin-bottom: 8px;
            `, `$${deal.originalPrice}`);
            card.appendChild(originalPrice);
        }

        // Category
        const category = this.createStyledElement('span', `
            background: var(--lux-hot-pink); 
            color: var(--lux-black); 
            padding: 4px 8px; 
            font-size: 12px; 
            font-weight: 600; 
            text-transform: uppercase;
            letter-spacing: 1px;
        `, deal.category);

        // Add event listeners
        this.addEventListeners(card, {
            'click': () => this.handleDealClick(deal),
            'mouseenter': () => {
                card.style.transform = 'translateY(-2px)';
                card.style.boxShadow = '0 8px 25px rgba(255, 171, 223, 0.3)';
            },
            'mouseleave': () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = 'none';
            }
        });

        card.appendChild(brandLogo);
        card.appendChild(brandName);
        card.appendChild(dealTitle);
        card.appendChild(price);
        card.appendChild(category);
        
        return card;
    }

    handleDealClick(deal) {
        console.log('Deal clicked:', deal);
        if (window.appController) {
            window.appController.handleDealInteraction(deal.id);
        }
    }

    getIOSEquivalent() {
        return {
            type: 'UICollectionViewCell',
            backgroundColor: '#111111',
            borderColor: '#FFABDF',
            borderWidth: 2,
            cornerRadius: 8
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DealCardComponent;
} 