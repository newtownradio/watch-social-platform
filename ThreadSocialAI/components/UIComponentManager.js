// UIComponentManager.js - Manages UI components for BubliAI
// This component can be easily translated to iOS using UIKit components

class UIComponentManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.components = {};
        this.initializeComponents();
    }

    // Initialize all UI components
    initializeComponents() {
        this.components = {
            navigation: this.createNavigationComponent(),
            hero: this.createHeroComponent(),
            dealCard: this.createDealCardComponent(),
            activityCard: this.createActivityCardComponent(),
            categoryButton: this.createCategoryButtonComponent(),
            notification: this.createNotificationComponent(),
            loadingSpinner: this.createLoadingSpinnerComponent(),
            searchBar: this.createSearchBarComponent(),
            filterPanel: this.createFilterPanelComponent()
        };
    }

    // Navigation Component - Maps to UINavigationController in iOS
    createNavigationComponent() {
        return {
            render: (containerId) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const nav = document.createElement('nav');
                nav.style.cssText = `
                    padding: 12px 0; 
                    border-bottom: 2px solid var(--lux-hot-pink); 
                    background: rgba(0,0,0,0.95); 
                    backdrop-filter: blur(10px); 
                    position: sticky; 
                    top: 0; 
                    z-index: 100; 
                    -webkit-backdrop-filter: blur(10px);
                `;

                const navContent = document.createElement('div');
                navContent.style.cssText = `
                    display: flex; 
                    align-items: center; 
                    justify-content: space-between; 
                    max-width: 1200px; 
                    margin: 0 auto; 
                    padding: 0 20px;
                `;

                const logo = document.createElement('div');
                logo.style.cssText = `
                    font-size: 28px; 
                    font-weight: 900; 
                    color: var(--lux-hot-pink); 
                    text-transform: uppercase; 
                    letter-spacing: 3px; 
                    flex-shrink: 0;
                `;
                logo.textContent = 'THREAD SOCIAL';

                const navLinks = document.createElement('div');
                navLinks.style.cssText = `
                    display: flex; 
                    align-items: center; 
                    gap: 16px;
                `;

                const links = [
                    { text: 'DISCOVERY', href: 'discovery.html' },
                    { text: 'DEALS', href: 'deals.html' },
                    { text: 'PLAN', href: 'social.html' },
                    { text: 'MEMBER', href: 'member.html' }
                ];

                links.forEach(link => {
                    const a = document.createElement('a');
                    a.href = link.href;
                    a.textContent = link.text;
                    a.style.cssText = `
                        color: var(--lux-white); 
                        text-decoration: none; 
                        font-weight: 600; 
                        text-transform: uppercase; 
                        letter-spacing: 1px; 
                        font-size: 12px; 
                        padding: 6px 8px; 
                        border-radius: 0; 
                        transition: all 0.3s ease; 
                        -webkit-tap-highlight-color: transparent;
                    `;
                    navLinks.appendChild(a);
                });

                navContent.appendChild(logo);
                navContent.appendChild(navLinks);
                nav.appendChild(navContent);
                container.appendChild(nav);
            },

            // iOS equivalent: UINavigationController with custom navigation bar
            getIOSEquivalent: () => {
                return {
                    type: 'UINavigationController',
                    navigationBar: {
                        title: 'THREAD SOCIAL',
                        titleColor: '#FFABDF',
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        items: ['DISCOVERY', 'DEALS', 'PLAN', 'MEMBER']
                    }
                };
            }
        };
    }

    // Hero Component - Maps to UIViewController with custom view in iOS
    createHeroComponent() {
        return {
            render: (containerId, data = {}) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const section = document.createElement('section');
                section.style.cssText = `
                    background: var(--lux-black); 
                    min-height: 100vh; 
                    display: flex; 
                    flex-direction: column; 
                    justify-content: center; 
                    align-items: center; 
                    padding: 40px 20px; 
                    text-align: center;
                `;

                const title = document.createElement('h1');
                title.style.cssText = `
                    font-size: 64px; 
                    color: var(--lux-hot-pink); 
                    font-weight: 900; 
                    margin-bottom: 24px; 
                    letter-spacing: 4px;
                `;
                title.textContent = data.title || 'THREAD SOCIAL';

                const subtitle = document.createElement('p');
                subtitle.style.cssText = `
                    font-size: 20px; 
                    color: var(--lux-white); 
                    font-weight: 300; 
                    letter-spacing: 2px; 
                    margin-bottom: 32px;
                `;
                subtitle.textContent = data.subtitle || 'Discover exclusive deals from the world\'s most prestigious brands';

                const description = document.createElement('p');
                description.style.cssText = `
                    font-size: 16px; 
                    color: var(--lux-white); 
                    opacity: 0.9; 
                    line-height: 1.6;
                `;
                description.textContent = data.description || 'Our AI learns your style and finds hidden gems you\'ll love';

                section.appendChild(title);
                section.appendChild(subtitle);
                section.appendChild(description);
                container.appendChild(section);
            },

            // iOS equivalent: UIViewController with custom view
            getIOSEquivalent: () => {
                return {
                    type: 'UIViewController',
                    view: {
                        backgroundColor: '#000000',
                        titleLabel: {
                            text: 'THREAD SOCIAL',
                            fontSize: 64,
                            textColor: '#FFABDF',
                            fontWeight: 'bold'
                        },
                        subtitleLabel: {
                            text: 'Discover exclusive deals...',
                            fontSize: 20,
                            textColor: '#FFFFFF'
                        }
                    }
                };
            }
        };
    }

    // Deal Card Component - Maps to UICollectionViewCell in iOS
    createDealCardComponent() {
        return {
            render: (deal, containerId) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const card = document.createElement('div');
                card.style.cssText = `
                    background: var(--lux-dark-gray); 
                    border: 2px solid var(--lux-hot-pink); 
                    padding: 24px; 
                    transition: all 0.3s ease; 
                    cursor: pointer;
                    position: relative;
                `;

                const brandLogo = document.createElement('img');
                brandLogo.src = deal.logo;
                brandLogo.style.cssText = `
                    width: 120px; 
                    height: 80px; 
                    object-fit: contain; 
                    margin-bottom: 16px;
                `;

                const brandName = document.createElement('h3');
                brandName.style.cssText = `
                    color: var(--lux-hot-pink); 
                    font-size: 18px; 
                    font-weight: 700; 
                    letter-spacing: 1px; 
                    margin-bottom: 8px;
                `;
                brandName.textContent = deal.brand;

                const description = document.createElement('p');
                description.style.cssText = `
                    color: var(--lux-white); 
                    font-size: 14px; 
                    margin-bottom: 16px; 
                    line-height: 1.4;
                `;
                description.textContent = deal.description;

                const priceContainer = document.createElement('div');
                priceContainer.style.cssText = `
                    display: flex; 
                    align-items: center; 
                    gap: 12px; 
                    margin-bottom: 16px;
                `;

                const currentPrice = document.createElement('span');
                currentPrice.style.cssText = `
                    color: var(--lux-beige); 
                    font-size: 20px; 
                    font-weight: 700;
                `;
                currentPrice.textContent = `$${deal.price}`;

                const originalPrice = document.createElement('span');
                originalPrice.style.cssText = `
                    color: var(--lux-white); 
                    font-size: 16px; 
                    text-decoration: line-through; 
                    opacity: 0.6;
                `;
                originalPrice.textContent = `$${deal.originalPrice}`;

                const discount = document.createElement('span');
                discount.style.cssText = `
                    color: var(--lux-hot-pink); 
                    font-size: 12px; 
                    font-weight: 700; 
                    text-transform: uppercase;
                `;
                const discountPercent = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100);
                discount.textContent = `${discountPercent}% OFF`;

                priceContainer.appendChild(currentPrice);
                priceContainer.appendChild(originalPrice);
                priceContainer.appendChild(discount);

                const storeInfo = document.createElement('p');
                storeInfo.style.cssText = `
                    color: var(--lux-white); 
                    font-size: 12px; 
                    opacity: 0.8; 
                    margin-bottom: 16px;
                `;
                storeInfo.textContent = `${deal.store} • ${deal.location}`;

                const actionButton = document.createElement('button');
                actionButton.style.cssText = `
                    background: var(--lux-hot-pink); 
                    color: var(--lux-white); 
                    border: 2px solid var(--lux-hot-pink); 
                    padding: 12px 24px; 
                    font-weight: 700; 
                    letter-spacing: 1px; 
                    text-transform: uppercase; 
                    cursor: pointer; 
                    transition: all 0.3s ease; 
                    border-radius: 0; 
                    width: 100%;
                `;
                actionButton.textContent = 'VIEW DEAL';
                actionButton.onclick = () => this.handleDealClick(deal);

                card.appendChild(brandLogo);
                card.appendChild(brandName);
                card.appendChild(description);
                card.appendChild(priceContainer);
                card.appendChild(storeInfo);
                card.appendChild(actionButton);
                container.appendChild(card);
            },

            // iOS equivalent: UICollectionViewCell
            getIOSEquivalent: () => {
                return {
                    type: 'UICollectionViewCell',
                    contentView: {
                        backgroundColor: '#111111',
                        borderColor: '#FFABDF',
                        borderWidth: 2,
                        cornerRadius: 0,
                        subviews: [
                            {
                                type: 'UIImageView',
                                name: 'brandLogoImageView'
                            },
                            {
                                type: 'UILabel',
                                name: 'brandNameLabel',
                                textColor: '#FFABDF',
                                fontSize: 18,
                                fontWeight: 'bold'
                            },
                            {
                                type: 'UILabel',
                                name: 'descriptionLabel',
                                textColor: '#FFFFFF',
                                fontSize: 14
                            },
                            {
                                type: 'UILabel',
                                name: 'priceLabel',
                                textColor: '#F5F5DC',
                                fontSize: 20,
                                fontWeight: 'bold'
                            },
                            {
                                type: 'UIButton',
                                name: 'actionButton',
                                title: 'VIEW DEAL',
                                backgroundColor: '#FFABDF',
                                titleColor: '#FFFFFF'
                            }
                        ]
                    }
                };
            }
        };
    }

    // Activity Card Component
    createActivityCardComponent() {
        return {
            render: (activity, containerId) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const card = document.createElement('div');
                card.style.cssText = `
                    background: var(--lux-dark-gray); 
                    border: 2px solid var(--lux-hot-pink); 
                    padding: 16px; 
                    transition: all 0.3s ease; 
                    cursor: pointer;
                `;

                const activityText = document.createElement('p');
                activityText.style.cssText = `
                    color: var(--lux-white); 
                    font-size: 14px; 
                    margin: 0;
                `;
                activityText.textContent = activity;

                card.appendChild(activityText);
                container.appendChild(card);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UITableViewCell',
                    backgroundColor: '#111111',
                    borderColor: '#FFABDF',
                    textLabel: {
                        textColor: '#FFFFFF',
                        fontSize: 14
                    }
                };
            }
        };
    }

    // Category Button Component
    createCategoryButtonComponent() {
        return {
            render: (category, containerId, onClick) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const button = document.createElement('button');
                button.style.cssText = `
                    padding: 16px; 
                    font-size: 12px; 
                    font-weight: 700; 
                    letter-spacing: 1px; 
                    background: var(--lux-black); 
                    border: 2px solid var(--lux-hot-pink); 
                    color: var(--lux-white); 
                    transition: all 0.3s ease; 
                    min-height: 50px; 
                    display: flex; 
                    align-items: center; 
                    justify-content: center; 
                    cursor: pointer; 
                    border-radius: 0; 
                    -webkit-tap-highlight-color: transparent;
                `;
                button.textContent = category.toUpperCase();
                button.onclick = () => onClick(category);

                container.appendChild(button);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UIButton',
                    titleColor: '#FFFFFF',
                    backgroundColor: '#000000',
                    borderColor: '#FFABDF',
                    borderWidth: 2,
                    cornerRadius: 0,
                    fontSize: 12,
                    fontWeight: 'bold'
                };
            }
        };
    }

    // Notification Component
    createNotificationComponent() {
        return {
            show: (message, duration = 3000) => {
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--lux-hot-pink);
                    color: var(--lux-white);
                    padding: 16px 24px;
                    border-radius: 8px;
                    font-family: 'Space Grotesk', Arial, sans-serif;
                    font-weight: 600;
                    letter-spacing: 1px;
                    z-index: 10000;
                    max-width: 300px;
                    box-shadow: 0 4px 20px rgba(255, 171, 223, 0.3);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                `;
                notification.textContent = message;
                
                document.body.appendChild(notification);
                
                // Animate in
                setTimeout(() => {
                    notification.style.transform = 'translateX(0)';
                }, 100);
                
                // Remove after duration
                setTimeout(() => {
                    notification.style.transform = 'translateX(100%)';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, duration);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UIAlertController',
                    style: 'alert',
                    backgroundColor: '#FFABDF',
                    textColor: '#FFFFFF'
                };
            }
        };
    }

    // Loading Spinner Component
    createLoadingSpinnerComponent() {
        return {
            render: (containerId) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const spinner = document.createElement('div');
                spinner.style.cssText = `
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 40px;
                `;

                const spinnerDot = document.createElement('div');
                spinnerDot.style.cssText = `
                    width: 20px;
                    height: 20px;
                    background: var(--lux-hot-pink);
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                `;

                spinner.appendChild(spinnerDot);
                container.appendChild(spinner);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UIActivityIndicatorView',
                    style: 'large',
                    color: '#FFABDF'
                };
            }
        };
    }

    // Search Bar Component
    createSearchBarComponent() {
        return {
            render: (containerId, onSearch) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const searchContainer = document.createElement('div');
                searchContainer.style.cssText = `
                    display: flex;
                    gap: 12px;
                    margin-bottom: 24px;
                `;

                const searchInput = document.createElement('input');
                searchInput.type = 'text';
                searchInput.placeholder = 'Search brands, categories...';
                searchInput.style.cssText = `
                    flex: 1;
                    padding: 12px 16px;
                    background: var(--lux-dark-gray);
                    border: 2px solid var(--lux-hot-pink);
                    color: var(--lux-white);
                    font-family: 'Space Grotesk', Arial, sans-serif;
                    font-size: 14px;
                    border-radius: 0;
                `;

                const searchButton = document.createElement('button');
                searchButton.textContent = 'SEARCH';
                searchButton.style.cssText = `
                    background: var(--lux-hot-pink);
                    color: var(--lux-white);
                    border: 2px solid var(--lux-hot-pink);
                    padding: 12px 24px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 0;
                `;

                searchButton.onclick = () => onSearch(searchInput.value);
                searchInput.onkeypress = (e) => {
                    if (e.key === 'Enter') onSearch(searchInput.value);
                };

                searchContainer.appendChild(searchInput);
                searchContainer.appendChild(searchButton);
                container.appendChild(searchContainer);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UISearchBar',
                    placeholder: 'Search brands, categories...',
                    backgroundColor: '#111111',
                    textColor: '#FFFFFF',
                    searchBarStyle: 'minimal'
                };
            }
        };
    }

    // Filter Panel Component
    createFilterPanelComponent() {
        return {
            render: (containerId, filters, onFilterChange) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const filterPanel = document.createElement('div');
                filterPanel.style.cssText = `
                    background: var(--lux-dark-gray);
                    border: 2px solid var(--lux-beige);
                    padding: 24px;
                    margin-bottom: 24px;
                `;

                const title = document.createElement('h3');
                title.style.cssText = `
                    color: var(--lux-beige);
                    font-size: 18px;
                    font-weight: 700;
                    letter-spacing: 1px;
                    margin-bottom: 16px;
                `;
                title.textContent = 'FILTERS';

                filterPanel.appendChild(title);

                // Add filter options
                Object.keys(filters).forEach(filterKey => {
                    const filterGroup = document.createElement('div');
                    filterGroup.style.cssText = `
                        margin-bottom: 16px;
                    `;

                    const filterLabel = document.createElement('label');
                    filterLabel.style.cssText = `
                        color: var(--lux-white);
                        font-size: 14px;
                        font-weight: 600;
                        display: block;
                        margin-bottom: 8px;
                    `;
                    filterLabel.textContent = filterKey.toUpperCase();

                    const filterSelect = document.createElement('select');
                    filterSelect.style.cssText = `
                        width: 100%;
                        padding: 8px 12px;
                        background: var(--lux-black);
                        border: 2px solid var(--lux-hot-pink);
                        color: var(--lux-white);
                        font-family: 'Space Grotesk', Arial, sans-serif;
                        font-size: 14px;
                        border-radius: 0;
                    `;

                    filters[filterKey].forEach(option => {
                        const optionElement = document.createElement('option');
                        optionElement.value = option;
                        optionElement.textContent = option;
                        filterSelect.appendChild(optionElement);
                    });

                    filterSelect.onchange = () => onFilterChange(filterKey, filterSelect.value);

                    filterGroup.appendChild(filterLabel);
                    filterGroup.appendChild(filterSelect);
                    filterPanel.appendChild(filterGroup);
                });

                container.appendChild(filterPanel);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UIView',
                    backgroundColor: '#111111',
                    borderColor: '#F5F5DC',
                    borderWidth: 2,
                    subviews: [
                        {
                            type: 'UILabel',
                            text: 'FILTERS',
                            textColor: '#F5F5DC',
                            fontSize: 18,
                            fontWeight: 'bold'
                        }
                    ]
                };
            }
        };
    }

    // Event handlers
    handleDealClick(deal) {
        this.components.notification.show(`Opening ${deal.brand} deal...`);
        setTimeout(() => {
            window.open(deal.realTimeLink, '_blank');
        }, 1000);
    }

    // Render a complete page
    renderPage(pageType, containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = ''; // Clear container

        switch (pageType) {
            case 'home':
                this.components.navigation.render(containerId);
                this.components.hero.render(containerId, data);
                break;
            case 'discovery':
                this.components.navigation.render(containerId);
                this.renderDiscoveryPage(containerId, data);
                break;
            case 'deals':
                this.components.navigation.render(containerId);
                this.renderDealsPage(containerId, data);
                break;
            default:
                console.error('Unknown page type:', pageType);
        }
    }

    // Render discovery page
    renderDiscoveryPage(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Add search bar
        this.components.searchBar.render(containerId, (query) => {
            this.components.notification.show(`Searching for: ${query}`);
        });

        // Add filter panel
        const filters = {
            'Category': ['All', 'Luxury Fashion', 'Streetwear', 'Jewelry', 'Tech'],
            'Price Range': ['All', 'Under $100', '$100-$500', '$500-$1000', 'Over $1000'],
            'Location': ['All', 'NYC', 'LA', 'Miami', 'Chicago']
        };
        this.components.filterPanel.render(containerId, filters, (filterType, value) => {
            this.components.notification.show(`Filter changed: ${filterType} = ${value}`);
        });

        // Add deals grid
        const dealsGrid = document.createElement('div');
        dealsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            margin-top: 24px;
        `;
        dealsGrid.id = 'deals-grid';
        container.appendChild(dealsGrid);

        // Render deals
        const deals = this.dataManager.getDeals();
        deals.forEach(deal => {
            this.components.dealCard.render(deal, 'deals-grid');
        });
    }

    // Render deals page
    renderDealsPage(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const title = document.createElement('h1');
        title.style.cssText = `
            color: var(--lux-hot-pink);
            font-size: 48px;
            font-weight: 900;
            letter-spacing: 3px;
            text-align: center;
            margin: 40px 0;
        `;
        title.textContent = 'EXCLUSIVE DEALS';
        container.appendChild(title);

        // Add deals grid
        const dealsGrid = document.createElement('div');
        dealsGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 24px;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        `;
        dealsGrid.id = 'deals-grid';
        container.appendChild(dealsGrid);

        // Render deals
        const deals = this.dataManager.getDeals();
        deals.forEach(deal => {
            this.components.dealCard.render(deal, 'deals-grid');
        });
    }

    // Get iOS equivalent for entire page
    getIOSEquivalent(pageType) {
        switch (pageType) {
            case 'home':
                return {
                    type: 'UIViewController',
                    navigationController: this.components.navigation.getIOSEquivalent(),
                    view: this.components.hero.getIOSEquivalent().view
                };
            case 'discovery':
                return {
                    type: 'UIViewController',
                    navigationController: this.components.navigation.getIOSEquivalent(),
                    searchBar: this.components.searchBar.getIOSEquivalent(),
                    collectionView: {
                        type: 'UICollectionView',
                        cell: this.components.dealCard.getIOSEquivalent()
                    }
                };
            default:
                return null;
        }
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UIComponentManager;
} else {
    window.UIComponentManager = UIComponentManager;
} 