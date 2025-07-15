// DiscoveryPageComponent.js - Discovery page component
class DiscoveryPageComponent extends BaseComponent {
    constructor(dataManager) {
        super('DiscoveryPage', dataManager);
        this.dealCardComponent = null;
        this.searchBarComponent = null;
    }

    createElement(data = {}) {
        const container = document.createElement('div');
        container.style.cssText = `
            padding: 20px;
            max-width: 1200px;
            margin: 0 auto;
        `;

        // Page title
        const title = this.createStyledElement('h2', `
            color: var(--lux-hot-pink);
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, 'DISCOVERY');

        // Subtitle
        const subtitle = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `, 'Find coveted deals and trending products');

        // Search bar
        const searchContainer = document.createElement('div');
        searchContainer.id = 'search-container';
        
        // Category filters
        const categoryFilters = this.createCategoryFilters();
        
        // Trending deals section
        const trendingSection = this.createTrendingSection();
        
        // Recent deals section
        const recentSection = this.createRecentSection();

        container.appendChild(title);
        container.appendChild(subtitle);
        container.appendChild(searchContainer);
        container.appendChild(categoryFilters);
        container.appendChild(trendingSection);
        container.appendChild(recentSection);
        
        return container;
    }

    createCategoryFilters() {
        const container = document.createElement('div');
        container.style.cssText = `
            margin: 20px 0;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            justify-content: center;
        `;

        const categories = ['All', 'Fashion', 'Electronics', 'Home', 'Beauty', 'Sports'];
        
        categories.forEach(category => {
            const button = this.createStyledElement('button', `
                padding: 8px 16px;
                background: var(--lux-dark-gray);
                border: 2px solid var(--lux-hot-pink);
                color: var(--lux-white);
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
            `, category);

            this.addEventListeners(button, {
                'click': () => this.handleCategoryFilter(category),
                'mouseenter': () => {
                    button.style.background = 'var(--lux-hot-pink)';
                    button.style.color = 'var(--lux-black)';
                },
                'mouseleave': () => {
                    button.style.background = 'var(--lux-dark-gray)';
                    button.style.color = 'var(--lux-white)';
                }
            });

            container.appendChild(button);
        });

        return container;
    }

    createTrendingSection() {
        const section = document.createElement('section');
        section.style.cssText = `
            margin: 40px 0;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-hot-pink);
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
        `, 'TRENDING DEALS');

        const dealsContainer = document.createElement('div');
        dealsContainer.id = 'trending-deals';
        dealsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        `;

        section.appendChild(title);
        section.appendChild(dealsContainer);
        
        return section;
    }

    createRecentSection() {
        const section = document.createElement('section');
        section.style.cssText = `
            margin: 40px 0;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-hot-pink);
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 20px;
        `, 'RECENT DEALS');

        const dealsContainer = document.createElement('div');
        dealsContainer.id = 'recent-deals';
        dealsContainer.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        `;

        section.appendChild(title);
        section.appendChild(dealsContainer);
        
        return section;
    }

    handleCategoryFilter(category) {
        console.log('Category filter:', category);
        if (window.appController) {
            window.appController.filterByCategory(category);
        }
    }

    afterRender() {
        // Initialize sub-components
        if (this.dataManager) {
            this.dealCardComponent = new DealCardComponent(this.dataManager);
            this.searchBarComponent = new SearchBarComponent(this.dataManager);
            
            // Render search bar
            this.searchBarComponent.render('search-container');
            
            // Load and render deals
            this.loadDeals();
        }
    }

    loadDeals() {
        if (this.dataManager) {
            const trendingDeals = this.dataManager.getTrendingDeals();
            const recentDeals = this.dataManager.getRecentDeals();
            
            this.renderDeals('trending-deals', trendingDeals);
            this.renderDeals('recent-deals', recentDeals);
        }
    }

    renderDeals(containerId, deals) {
        const container = document.getElementById(containerId);
        if (!container || !this.dealCardComponent) return;

        container.innerHTML = '';
        deals.forEach(deal => {
            const dealElement = this.dealCardComponent.createElement(deal);
            container.appendChild(dealElement);
        });
    }

    getIOSEquivalent() {
        return {
            type: 'UIViewController',
            title: 'DISCOVERY',
            view: {
                backgroundColor: '#000000',
                collectionView: {
                    layout: 'UICollectionViewFlowLayout',
                    cellSize: { width: 300, height: 200 }
                }
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DiscoveryPageComponent;
} 