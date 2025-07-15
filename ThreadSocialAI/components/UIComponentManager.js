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
            searchResults: this.createSearchResultsComponent(),
            filterPanel: this.createFilterPanelComponent(),
            rainbowClouds: this.createRainbowCloudsComponent()
        };
    }

    // Create Navigation Component
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

                // Logo with image
                const logoContainer = document.createElement('div');
                logoContainer.style.cssText = `
                    display: flex;
                    align-items: center;
                    flex-shrink: 0;
                `;
                
                const logoImg = document.createElement('img');
                logoImg.src = './assets/app-icon-180.png';
                logoImg.alt = 'Basedly';
                logoImg.style.cssText = `
                    height: 40px;
                    width: auto;
                    filter: brightness(1.1) contrast(1.1);
                `;
                
                logoContainer.appendChild(logoImg);

                // Navigation links
                const navLinks = document.createElement('div');
                navLinks.style.cssText = `
                    display: flex;
                    align-items: center;
                    gap: 16px;
                `;

                const navItems = [
                    { text: 'DISCOVERY', page: 'discovery' },
                    { text: 'DEALS', page: 'deals' },
                    { text: 'MESSAGES', page: 'messages' },
                    { text: 'PLAN', page: 'social' },
                    { text: 'MEMBER', page: 'member' }
                ];

                navItems.forEach(item => {
                    const link = document.createElement('a');
                    link.textContent = item.text;
                    link.setAttribute('data-navigate', item.page);
                    link.style.cssText = `
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
                        cursor: pointer;
                    `;
                    
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (window.appController) {
                            window.appController.navigateToPage(item.page);
                        }
                    });
                    
                    navLinks.appendChild(link);
                });

                navContent.appendChild(logoContainer);
                navContent.appendChild(navLinks);
                nav.appendChild(navContent);
                container.appendChild(nav);
            },

            // iOS equivalent: UINavigationController with custom navigation bar
            getIOSEquivalent: () => {
                return {
                    type: 'UINavigationController',
                    navigationBar: {
                        title: 'BASEDLY',
                        titleFont: 'Playfair Display',
                        titleWeight: '900',
                        titleSize: 32,
                        titleGradient: ['#FFABDF', '#FF69B4', '#FF1493'],
                        backgroundColor: 'rgba(0,0,0,0.95)',
                        items: ['DISCOVERY', 'DEALS', 'MESSAGES', 'PLAN', 'MEMBER']
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
                title.textContent = data.title || 'BASEDLY';

                const subtitle = document.createElement('p');
                subtitle.style.cssText = `
                    font-size: 20px; 
                    color: var(--lux-white); 
                    font-weight: 300; 
                    letter-spacing: 2px; 
                    margin-bottom: 32px;
                `;
                subtitle.textContent = data.subtitle || 'AI-Powered Shopping Discovery Platform';

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
                        text: 'BASEDLY',
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

                // Add real-time search with debouncing
                let searchTimeout;
                searchInput.addEventListener('input', (e) => {
                    clearTimeout(searchTimeout);
                    searchTimeout = setTimeout(() => {
                        if (e.target.value.length >= 2) {
                            onSearch(e.target.value);
                        }
                    }, 300);
                });

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

    // Search Results Component
    createSearchResultsComponent() {
        return {
            render: (results, containerId, onLoadMore = null) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                // Clear previous results
                container.innerHTML = '';

                if (results.length === 0) {
                    const noResults = document.createElement('div');
                    noResults.style.cssText = `
                        text-align: center;
                        padding: 60px 20px;
                        color: var(--lux-white);
                        opacity: 0.7;
                    `;
                    noResults.innerHTML = `
                        <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                        <h3 style="color: var(--lux-hot-pink); margin-bottom: 8px;">No Results Found</h3>
                        <p>Try adjusting your search terms or browse our categories</p>
                    `;
                    container.appendChild(noResults);
                    return;
                }

                // Results header
                const resultsHeader = document.createElement('div');
                resultsHeader.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                    padding: 0 4px;
                `;

                const resultsCount = document.createElement('h3');
                resultsCount.style.cssText = `
                    color: var(--lux-hot-pink);
                    font-size: 18px;
                    font-weight: 700;
                    letter-spacing: 1px;
                `;
                resultsCount.textContent = `${results.length} result${results.length !== 1 ? 's' : ''} found`;

                const sortButton = document.createElement('button');
                sortButton.textContent = 'SORT';
                sortButton.style.cssText = `
                    background: var(--lux-black);
                    color: var(--lux-beige);
                    border: 2px solid var(--lux-beige);
                    padding: 8px 16px;
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border-radius: 0;
                `;

                resultsHeader.appendChild(resultsCount);
                resultsHeader.appendChild(sortButton);
                container.appendChild(resultsHeader);

                // Results grid with lazy loading
                const resultsGrid = document.createElement('div');
                resultsGrid.style.cssText = `
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                    margin-bottom: 40px;
                `;
                resultsGrid.id = 'search-results-grid';
                container.appendChild(resultsGrid);

                // Render results with lazy loading
                this.renderResultsWithLazyLoading(results, 'search-results-grid', onLoadMore);

                // Add load more button if there are more results
                if (onLoadMore && results.length >= 6) {
                    const loadMoreButton = document.createElement('button');
                    loadMoreButton.textContent = 'LOAD MORE RESULTS';
                    loadMoreButton.style.cssText = `
                        background: var(--lux-hot-pink);
                        color: var(--lux-white);
                        border: 2px solid var(--lux-hot-pink);
                        padding: 16px 32px;
                        font-weight: 700;
                        letter-spacing: 2px;
                        text-transform: uppercase;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        border-radius: 0;
                        margin: 0 auto;
                        display: block;
                    `;
                    loadMoreButton.onclick = onLoadMore;
                    container.appendChild(loadMoreButton);
                }
            },

            renderResultsWithLazyLoading: (results, containerId, onLoadMore) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                const itemsPerPage = 6;
                let currentPage = 0;

                const renderPage = (page) => {
                    const startIndex = page * itemsPerPage;
                    const endIndex = startIndex + itemsPerPage;
                    const pageResults = results.slice(startIndex, endIndex);

                    pageResults.forEach((result, index) => {
                        // Add delay for staggered animation
                        setTimeout(() => {
                            this.renderSearchResultCard(result, containerId);
                        }, index * 100);
                    });

                    // Check if we need to load more
                    if (endIndex < results.length && onLoadMore) {
                        const observer = new IntersectionObserver((entries) => {
                            entries.forEach(entry => {
                                if (entry.isIntersecting) {
                                    currentPage++;
                                    renderPage(currentPage);
                                    observer.disconnect();
                                }
                            });
                        });

                        // Create a sentinel element
                        const sentinel = document.createElement('div');
                        sentinel.style.cssText = `
                            height: 20px;
                            width: 100%;
                        `;
                        container.appendChild(sentinel);
                        observer.observe(sentinel);
                    }
                };

                renderPage(currentPage);
            },

            renderSearchResultCard: (result, containerId) => {
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
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 0.6s ease forwards;
                `;

                // Add animation keyframes
                if (!document.querySelector('#search-animations')) {
                    const style = document.createElement('style');
                    style.id = 'search-animations';
                    style.textContent = `
                        @keyframes fadeInUp {
                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                // Card content based on result type
                if (result.type === 'deal') {
                    card.innerHTML = `
                        <div style="display: flex; align-items: center; margin-bottom: 16px;">
                            <img src="${result.logo}" alt="${result.brand}" style="width: 60px; height: 40px; object-fit: contain; margin-right: 16px;">
                            <div>
                                <h4 style="color: var(--lux-hot-pink); font-size: 16px; font-weight: 700; margin: 0;">${result.brand}</h4>
                                <p style="color: var(--lux-beige); font-size: 12px; margin: 0;">${result.category}</p>
                            </div>
                        </div>
                        <h5 style="color: var(--lux-white); font-size: 14px; margin-bottom: 12px;">${result.description}</h5>
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="color: var(--lux-beige); font-size: 18px; font-weight: 700;">$${result.price}</span>
                            <span style="color: var(--lux-white); opacity: 0.6; text-decoration: line-through;">$${result.originalPrice}</span>
                        </div>
                        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--lux-dark-gray);">
                            <span style="color: var(--lux-hot-pink); font-size: 12px; font-weight: 600;">${result.dealType}</span>
                            <span style="color: var(--lux-white); opacity: 0.6; font-size: 12px; float: right;">${result.store}</span>
                        </div>
                    `;
                } else if (result.type === 'brand') {
                    card.innerHTML = `
                        <div style="text-align: center;">
                            <img src="${result.logo}" alt="${result.name}" style="width: 80px; height: 60px; object-fit: contain; margin-bottom: 16px;">
                            <h4 style="color: var(--lux-hot-pink); font-size: 18px; font-weight: 700; margin-bottom: 8px;">${result.name}</h4>
                            <p style="color: var(--lux-white); opacity: 0.8; font-size: 14px;">${result.category}</p>
                        </div>
                    `;
                }

                card.onclick = () => {
                    if (result.type === 'deal') {
                        window.open(result.realTimeLink, '_blank');
                    }
                };

                container.appendChild(card);
            },

            getIOSEquivalent: () => {
                return {
                    type: 'UICollectionView',
                    cell: 'SearchResultCell',
                    layout: 'flow',
                    backgroundColor: '#000000'
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

    // Create Rainbow Clouds Component
    createRainbowCloudsComponent() {
        return {
            render: (containerId) => {
                const container = document.getElementById(containerId);
                if (!container) return;

                // Add CSS for rainbow clouds if not already present
                if (!document.getElementById('rainbow-clouds-styles')) {
                    const style = document.createElement('style');
                    style.id = 'rainbow-clouds-styles';
                    style.textContent = `
                        .rainbow-clouds {
                            position: fixed;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            pointer-events: none;
                            z-index: 1;
                            overflow: hidden;
                        }
                        
                        .cloud {
                            position: absolute;
                            background: #ffffff;
                            border: 3px solid #e0e0e0;
                            border-radius: 50px;
                            box-shadow: 
                                0 0 0 2px #ffffff,
                                0 4px 8px rgba(0,0,0,0.1),
                                inset 0 2px 4px rgba(255,255,255,0.8);
                            animation: cartoonFloat 6s ease-in-out infinite;
                        }
                        
                        .cloud::before,
                        .cloud::after {
                            content: '';
                            position: absolute;
                            background: #ffffff;
                            border: 3px solid #e0e0e0;
                            border-radius: 50px;
                            box-shadow: 
                                0 0 0 2px #ffffff,
                                0 2px 4px rgba(0,0,0,0.1),
                                inset 0 1px 2px rgba(255,255,255,0.8);
                        }
                        
                        .cloud::before {
                            width: 70px;
                            height: 70px;
                            top: -35px;
                            left: 15px;
                        }
                        
                        .cloud::after {
                            width: 50px;
                            height: 50px;
                            top: -25px;
                            right: 15px;
                        }
                        
                        .cloud1 {
                            width: 120px;
                            height: 50px;
                            top: 15%;
                            left: -120px;
                            animation-delay: 0s;
                        }
                        
                        .cloud2 {
                            width: 100px;
                            height: 40px;
                            top: 35%;
                            right: -100px;
                            animation-delay: 2s;
                        }
                        
                        .cloud3 {
                            width: 140px;
                            height: 55px;
                            top: 55%;
                            left: -140px;
                            animation-delay: 4s;
                        }
                        
                        .cloud4 {
                            width: 110px;
                            height: 45px;
                            top: 75%;
                            right: -110px;
                            animation-delay: 1s;
                        }
                        
                        .cloud5 {
                            width: 90px;
                            height: 35px;
                            top: 25%;
                            left: -90px;
                            animation-delay: 3s;
                        }
                        
                        @keyframes cartoonFloat {
                            0%, 100% {
                                transform: translateX(0px) translateY(0px) rotate(0deg) scale(1);
                                opacity: 0.8;
                            }
                            25% {
                                transform: translateX(30px) translateY(-15px) rotate(3deg) scale(1.05);
                                opacity: 1;
                            }
                            50% {
                                transform: translateX(60px) translateY(-8px) rotate(-2deg) scale(1.1);
                                opacity: 0.9;
                            }
                            75% {
                                transform: translateX(30px) translateY(-20px) rotate(2deg) scale(1.05);
                                opacity: 1;
                            }
                        }
                        
                        .rainbow {
                            position: absolute;
                            top: 45%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 400px;
                            height: 200px;
                            border-radius: 200px 200px 0 0;
                            background: linear-gradient(
                                to bottom,
                                #ff0000 0%,
                                #ff8000 12%,
                                #ffff00 24%,
                                #00ff00 36%,
                                #0080ff 48%,
                                #8000ff 60%,
                                #ff0080 72%,
                                #ff0000 84%,
                                #ff8000 96%,
                                #ffff00 100%
                            );
                            opacity: 0.3;
                            animation: cartoonRainbow 5s ease-in-out infinite alternate;
                            border: 4px solid #ffffff;
                            box-shadow: 
                                0 0 20px rgba(255,255,255,0.3),
                                0 8px 16px rgba(0,0,0,0.2);
                        }
                        
                        .rainbow::before {
                            content: '';
                            position: absolute;
                            top: 8px;
                            left: 8px;
                            right: 8px;
                            bottom: 8px;
                            background: transparent;
                            border-radius: 192px 192px 0 0;
                        }
                        
                        @keyframes cartoonRainbow {
                            0% {
                                opacity: 0.2;
                                transform: translate(-50%, -50%) scale(0.9) rotate(-2deg);
                            }
                            50% {
                                opacity: 0.4;
                                transform: translate(-50%, -50%) scale(1.05) rotate(1deg);
                            }
                            100% {
                                opacity: 0.3;
                                transform: translate(-50%, -50%) scale(1.1) rotate(-1deg);
                            }
                        }
                        
                        .rainbow-particles {
                            position: absolute;
                            width: 100%;
                            height: 100%;
                        }
                        
                        .particle {
                            position: absolute;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            border: 2px solid #ffffff;
                            box-shadow: 0 0 8px currentColor;
                            animation: cartoonParticleFloat 8s linear infinite;
                        }
                        
                        .particle:nth-child(1) { background: #ff0000; left: 5%; animation-delay: 0s; }
                        .particle:nth-child(2) { background: #ff8000; left: 15%; animation-delay: 1s; }
                        .particle:nth-child(3) { background: #ffff00; left: 25%; animation-delay: 2s; }
                        .particle:nth-child(4) { background: #00ff00; left: 35%; animation-delay: 3s; }
                        .particle:nth-child(5) { background: #0080ff; left: 45%; animation-delay: 4s; }
                        .particle:nth-child(6) { background: #8000ff; left: 55%; animation-delay: 5s; }
                        .particle:nth-child(7) { background: #ff0080; left: 65%; animation-delay: 0s; }
                        .particle:nth-child(8) { background: #ff0000; left: 75%; animation-delay: 1s; }
                        .particle:nth-child(9) { background: #ff8000; left: 85%; animation-delay: 2s; }
                        .particle:nth-child(10) { background: #ffff00; left: 95%; animation-delay: 3s; }
                        
                        @keyframes cartoonParticleFloat {
                            0% {
                                transform: translateY(100vh) rotate(0deg) scale(0.5);
                                opacity: 0;
                            }
                            10% {
                                opacity: 1;
                                transform: translateY(90vh) rotate(36deg) scale(1);
                            }
                            50% {
                                transform: translateY(50vh) rotate(180deg) scale(1.2);
                                opacity: 1;
                            }
                            90% {
                                opacity: 1;
                                transform: translateY(10vh) rotate(324deg) scale(1);
                            }
                            100% {
                                transform: translateY(-50px) rotate(360deg) scale(0.5);
                                opacity: 0;
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }

                // Create rainbow clouds container
                const rainbowContainer = document.createElement('div');
                rainbowContainer.className = 'rainbow-clouds';
                rainbowContainer.innerHTML = `
                    <div class="rainbow"></div>
                `;

                // Insert at the beginning of the container
                container.insertBefore(rainbowContainer, container.firstChild);
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

        // Add rainbow clouds to every page
        this.components.rainbowClouds.render(containerId);

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
            case 'messages':
                this.components.navigation.render(containerId);
                this.renderMessagesPage(containerId, data);
                break;
            case 'social':
                this.components.navigation.render(containerId);
                this.renderSocialPage(containerId, data);
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
            // Trigger search in AppController
            if (window.appController) {
                window.appController.handleSearch(query);
            }
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

        // Add search results container (initially hidden)
        const searchResultsContainer = document.createElement('div');
        searchResultsContainer.id = 'search-results-container';
        searchResultsContainer.style.cssText = `
            margin-top: 24px;
            display: none;
        `;
        container.appendChild(searchResultsContainer);

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

    // Render messages page
    renderMessagesPage(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const subtitle = document.createElement('p');
        subtitle.style.cssText = `
            color: var(--lux-white);
            font-size: 18px;
            text-align: center;
            margin-bottom: 40px;
            opacity: 0.9;
        `;
        subtitle.textContent = 'Stay connected with your shopping community';
        container.appendChild(subtitle);

        // Add filter buttons
        const filterContainer = document.createElement('div');
        filterContainer.style.cssText = `
            display: flex;
            gap: 20px;
            justify-content: center;
            margin-bottom: 40px;
            flex-wrap: wrap;
        `;

        const filterButtons = [
            { text: 'ALL MESSAGES', filter: 'all', active: true },
            { text: 'UNREAD', filter: 'unread', active: false },
            { text: 'DEALS', filter: 'deals', active: false },
            { text: 'COMMUNITY', filter: 'community', active: false }
        ];

        filterButtons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.text;
            button.setAttribute('data-message-filter', btn.filter);
            button.style.cssText = `
                padding: 12px 24px;
                font-size: 14px;
                font-weight: 700;
                letter-spacing: 1px;
                text-transform: uppercase;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 0;
                -webkit-tap-highlight-color: transparent;
                ${btn.active ? 
                    'background: var(--lux-hot-pink); color: var(--lux-white); border: 2px solid var(--lux-hot-pink);' :
                    'background: var(--lux-black); color: var(--lux-beige); border: 2px solid var(--lux-beige);'
                }
            `;
            filterContainer.appendChild(button);
        });

        container.appendChild(filterContainer);

        // Add messages list
        const messagesContainer = document.createElement('div');
        messagesContainer.style.cssText = `
            max-width: 800px;
            margin: 0 auto;
            padding: 0 20px;
        `;
        messagesContainer.id = 'messages-list';
        container.appendChild(messagesContainer);

        // Sample messages data (now mutable)
        if (!window._basedlyMessages) {
            window._basedlyMessages = [
                {
                    id: 1,
                    sender: 'BASEDLY AI',
                    subject: 'New Chanel Deal Alert! 👜',
                    preview: 'Exclusive 20% off Classic Flap Collection. Limited time offer for VIP members only.',
                    time: '2 min ago',
                    unread: true
                },
                {
                    id: 2,
                    sender: 'SHOPPING BUDDY',
                    subject: 'Shopping Trip This Weekend? 🛍️',
                    preview: 'Hey! I found some amazing deals on Nike Air Jordans. Want to plan a shopping trip together?',
                    time: '15 min ago',
                    unread: true
                },
                {
                    id: 3,
                    sender: 'LUXURY INSIDER',
                    subject: 'VIP Access: Cartier Love Collection',
                    preview: 'As a premium member, you have early access to the new Cartier Love Collection.',
                    time: '1 hour ago',
                    unread: false
                }
            ];
        }
        const messages = window._basedlyMessages;

        function renderMessages() {
            messagesContainer.innerHTML = '';
            messages.forEach(message => {
                const messageCard = document.createElement('div');
                messageCard.setAttribute('data-message-id', message.id);
                messageCard.style.cssText = `
                    background: var(--lux-dark-gray);
                    border: 2px solid ${message.unread ? 'var(--lux-beige)' : 'var(--lux-hot-pink)'};
                    padding: 24px;
                    margin-bottom: 20px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    position: relative;
                    ${message.unread ? 'background: rgba(245, 245, 220, 0.1);' : ''}
                `;

                if (message.unread) {
                    const indicator = document.createElement('div');
                    indicator.className = 'unread-indicator';
                    indicator.style.cssText = `
                        position: absolute;
                        top: 16px;
                        right: 16px;
                        width: 12px;
                        height: 12px;
                        background: var(--lux-hot-pink);
                        border-radius: 50%;
                    `;
                    messageCard.appendChild(indicator);
                }

                const header = document.createElement('div');
                header.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 12px;
                `;

                const sender = document.createElement('div');
                sender.style.cssText = `
                    color: var(--lux-hot-pink);
                    font-weight: 700;
                    font-size: 16px;
                    letter-spacing: 1px;
                `;
                sender.textContent = message.sender;

                const time = document.createElement('div');
                time.style.cssText = `
                    color: var(--lux-beige);
                    font-size: 12px;
                    opacity: 0.8;
                `;
                time.textContent = message.time;

                header.appendChild(sender);
                header.appendChild(time);

                const subject = document.createElement('div');
                subject.style.cssText = `
                    color: var(--lux-white);
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 8px;
                    letter-spacing: 1px;
                `;
                subject.textContent = message.subject;

                const preview = document.createElement('div');
                preview.style.cssText = `
                    color: var(--lux-white);
                    opacity: 0.8;
                    font-size: 14px;
                    line-height: 1.4;
                `;
                preview.textContent = message.preview;

                messageCard.appendChild(header);
                messageCard.appendChild(subject);
                messageCard.appendChild(preview);
                messagesContainer.appendChild(messageCard);
            });
        }
        renderMessages();

        // Add compose and broadcast buttons
        const buttonContainer = document.createElement('div');
        buttonContainer.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            z-index: 1000;
        `;

        // Compose button
        const composeButton = document.createElement('button');
        composeButton.setAttribute('data-compose-message', 'true');
        composeButton.textContent = '+';
        composeButton.title = 'Compose Message';
        composeButton.style.cssText = `
            width: 60px;
            height: 60px;
            background: var(--lux-hot-pink);
            border: none;
            border-radius: 50%;
            color: var(--lux-white);
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(255, 171, 223, 0.3);
        `;
        buttonContainer.appendChild(composeButton);

        // Broadcast button
        const broadcastButton = document.createElement('button');
        broadcastButton.setAttribute('data-broadcast-message', 'true');
        broadcastButton.textContent = '📢';
        broadcastButton.title = 'Broadcast Shopping Trip';
        broadcastButton.style.cssText = `
            width: 60px;
            height: 60px;
            background: var(--lux-beige);
            border: none;
            border-radius: 50%;
            color: var(--lux-black);
            font-size: 28px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(255, 171, 223, 0.3);
        `;
        buttonContainer.appendChild(broadcastButton);

        container.appendChild(buttonContainer);

        // Broadcast modal
        let broadcastModal = null;
        broadcastButton.onclick = () => {
            if (broadcastModal) return;
            broadcastModal = document.createElement('div');
            broadcastModal.style.cssText = `
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: rgba(0,0,0,0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;
            broadcastModal.innerHTML = `
                <div style="background: var(--lux-black); padding: 32px 24px; border-radius: 12px; max-width: 90vw; width: 400px; box-shadow: 0 8px 40px rgba(0,0,0,0.4);">
                    <h2 style="color: var(--lux-hot-pink); margin-bottom: 16px; text-align: center;">Broadcast Shopping Trip</h2>
                    <textarea id="broadcast-message-input" style="width: 100%; min-height: 80px; padding: 12px; font-size: 16px; border: 2px solid var(--lux-hot-pink); background: var(--lux-dark-gray); color: var(--lux-white); border-radius: 0; margin-bottom: 16px;"></textarea>
                    <div style="display: flex; gap: 12px; justify-content: flex-end;">
                        <button id="broadcast-cancel" style="padding: 10px 20px; background: var(--lux-black); color: var(--lux-beige); border: 2px solid var(--lux-beige); font-weight: 700; cursor: pointer;">Cancel</button>
                        <button id="broadcast-send" style="padding: 10px 20px; background: var(--lux-hot-pink); color: var(--lux-white); border: 2px solid var(--lux-hot-pink); font-weight: 700; cursor: pointer;">Send</button>
                    </div>
                </div>
            `;
            document.body.appendChild(broadcastModal);

            document.getElementById('broadcast-cancel').onclick = () => {
                document.body.removeChild(broadcastModal);
                broadcastModal = null;
            };
            document.getElementById('broadcast-send').onclick = () => {
                const msg = document.getElementById('broadcast-message-input').value.trim();
                if (msg.length === 0) return;
                // Add broadcast message to top
                messages.unshift({
                    id: Date.now(),
                    sender: 'YOU (Broadcast)',
                    subject: 'Shopping Trip Announcement',
                    preview: msg,
                    time: 'Just now',
                    unread: true
                });
                renderMessages();
                document.body.removeChild(broadcastModal);
                broadcastModal = null;
                if (window.appController && window.appController.uiManager && window.appController.uiManager.components.notification) {
                    window.appController.uiManager.components.notification.show('Broadcast sent to friends!');
                }
            };
        };
    }

    // Render social (Plan) page
    renderSocialPage(containerId, data) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const subtitle = document.createElement('p');
        subtitle.style.cssText = `
            color: var(--lux-white);
            font-size: 20px;
            text-align: center;
            margin: 40px 0;
            opacity: 0.9;
        `;
        subtitle.textContent = 'Connect with friends and plan the perfect shopping experience together.';
        container.appendChild(subtitle);
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