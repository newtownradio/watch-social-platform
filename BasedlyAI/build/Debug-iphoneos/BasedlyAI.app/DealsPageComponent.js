// DealsPageComponent.js - Deals browsing and filtering page
class DealsPageComponent extends BaseComponent {
    constructor(dataManager) {
        super(dataManager);
        this.pageName = 'deals';
        this.currentDeals = [];
        this.filteredDeals = [];
    }

    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Get deals from data manager
        this.currentDeals = this.dataManager.getDeals();
        this.filteredDeals = [...this.currentDeals];

        container.innerHTML = `
            <div class="deals-page">
                <div class="deals-header">
                    <h1 class="deals-title">DEALS</h1>
                    <p class="deals-subtitle">Browse all available deals</p>
                </div>

                <div class="deals-filters">
                    <div class="filter-group">
                        <label for="category-filter">Category</label>
                        <select id="category-filter" data-filter data-filter-type="category">
                            <option value="">All Categories</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home & Garden</option>
                            <option value="sports">Sports & Outdoors</option>
                            <option value="beauty">Beauty & Health</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="price-filter">Price Range</label>
                        <select id="price-filter" data-filter data-filter-type="price">
                            <option value="">All Prices</option>
                            <option value="0-50">Under $50</option>
                            <option value="50-100">$50 - $100</option>
                            <option value="100-200">$100 - $200</option>
                            <option value="200+">$200+</option>
                        </select>
                    </div>

                    <div class="filter-group">
                        <label for="brand-filter">Brand</label>
                        <select id="brand-filter" data-filter data-filter-type="brand">
                            <option value="">All Brands</option>
                            <option value="nike">Nike</option>
                            <option value="apple">Apple</option>
                            <option value="samsung">Samsung</option>
                            <option value="adidas">Adidas</option>
                            <option value="sony">Sony</option>
                        </select>
                    </div>
                </div>

                <div class="deals-search">
                    <div class="search-container">
                        <input type="text" id="deals-search" placeholder="Search deals by brand, category, or price..." data-search-input>
                        <button type="button" id="search-btn" data-search-btn>Search</button>
                    </div>
                </div>

                <div class="deals-results">
                    <div class="results-header">
                        <span class="results-count">${this.filteredDeals.length} deals found</span>
                        <div class="sort-options">
                            <select id="sort-deals" data-sort>
                                <option value="relevance">Sort by Relevance</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="newest">Newest First</option>
                            </select>
                        </div>
                    </div>

                    <div class="deals-grid" id="deals-grid">
                        ${this.renderDealsGrid()}
                    </div>

                    <div class="load-more" id="load-more-container" style="display: ${this.filteredDeals.length > 12 ? 'block' : 'none'}">
                        <button class="btn-secondary" data-load-more>Load More Deals</button>
                    </div>
                </div>
            </div>
        `;

        this.addStyles();
        this.setupEventListeners();
    }

    renderDealsGrid() {
        const dealsToShow = this.filteredDeals.slice(0, 12);
        
        if (dealsToShow.length === 0) {
            return `
                <div class="no-deals">
                    <h3>No deals found</h3>
                    <p>Try adjusting your filters or search terms</p>
                </div>
            `;
        }

        return dealsToShow.map(deal => `
            <div class="deal-card" data-deal-id="${deal.id}">
                <div class="deal-image">
                    <img src="${deal.image}" alt="${deal.title}" loading="lazy">
                    <div class="deal-badge">${deal.discount}% OFF</div>
                </div>
                <div class="deal-content">
                    <h3 class="deal-title">${deal.title}</h3>
                    <p class="deal-brand">${deal.brand}</p>
                    <div class="deal-price">
                        <span class="current-price">$${deal.currentPrice}</span>
                        <span class="original-price">$${deal.originalPrice}</span>
                    </div>
                    <div class="deal-meta">
                        <span class="deal-category">${deal.category}</span>
                        <span class="deal-rating">⭐ ${deal.rating}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    addStyles() {
        const styleId = 'deals-page-styles';
        if (document.getElementById(styleId)) return;

        const styles = `
            .deals-page {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .deals-header {
                text-align: center;
                margin-bottom: 40px;
            }

            .deals-title {
                font-size: clamp(2rem, 6vw, 3rem);
                font-weight: 900;
                background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 50%, #ffffff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 10px;
            }

            .deals-subtitle {
                color: var(--lux-white);
                font-size: 18px;
                opacity: 0.8;
            }

            .deals-filters {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 20px;
            }

            .filter-group {
                display: flex;
                flex-direction: column;
            }

            .filter-group label {
                color: var(--lux-white);
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .filter-group select {
                padding: 10px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.05);
                color: var(--lux-white);
                font-size: 14px;
                cursor: pointer;
            }

            .filter-group select:focus {
                outline: none;
                border-color: var(--lux-hot-pink);
            }

            .deals-search {
                margin-bottom: 30px;
            }

            .search-container {
                display: flex;
                gap: 10px;
                max-width: 600px;
                margin: 0 auto;
            }

            .search-container input {
                flex: 1;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.05);
                color: var(--lux-white);
                font-size: 16px;
            }

            .search-container input:focus {
                outline: none;
                border-color: var(--lux-hot-pink);
            }

            .search-container button {
                padding: 12px 24px;
                background: linear-gradient(135deg, var(--lux-hot-pink) 0%, #ff69b4 100%);
                color: var(--lux-white);
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .search-container button:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
            }

            .deals-results {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 20px;
            }

            .results-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .results-count {
                color: var(--lux-white);
                font-size: 16px;
                font-weight: 600;
            }

            .sort-options select {
                padding: 8px 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 6px;
                background: rgba(255, 255, 255, 0.05);
                color: var(--lux-white);
                font-size: 14px;
                cursor: pointer;
            }

            .deals-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }

            .deal-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                overflow: hidden;
                transition: all 0.3s ease;
                cursor: pointer;
            }

            .deal-card:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 30px rgba(255, 20, 147, 0.2);
                border-color: var(--lux-hot-pink);
            }

            .deal-image {
                position: relative;
                height: 200px;
                overflow: hidden;
            }

            .deal-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.3s ease;
            }

            .deal-card:hover .deal-image img {
                transform: scale(1.05);
            }

            .deal-badge {
                position: absolute;
                top: 10px;
                right: 10px;
                background: var(--lux-hot-pink);
                color: var(--lux-white);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                font-weight: 600;
            }

            .deal-content {
                padding: 15px;
            }

            .deal-title {
                color: var(--lux-white);
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 5px;
                line-height: 1.3;
            }

            .deal-brand {
                color: var(--lux-hot-pink);
                font-size: 14px;
                margin-bottom: 10px;
            }

            .deal-price {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-bottom: 10px;
            }

            .current-price {
                color: var(--lux-white);
                font-size: 18px;
                font-weight: 700;
            }

            .original-price {
                color: rgba(255, 255, 255, 0.5);
                font-size: 14px;
                text-decoration: line-through;
            }

            .deal-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .deal-category {
                color: rgba(255, 255, 255, 0.7);
                font-size: 12px;
                text-transform: uppercase;
            }

            .deal-rating {
                color: var(--lux-hot-pink);
                font-size: 12px;
            }

            .no-deals {
                text-align: center;
                padding: 40px;
                color: var(--lux-white);
            }

            .no-deals h3 {
                font-size: 24px;
                margin-bottom: 10px;
            }

            .no-deals p {
                opacity: 0.7;
            }

            .load-more {
                text-align: center;
            }

            .btn-secondary {
                padding: 12px 24px;
                background: rgba(255, 255, 255, 0.1);
                color: var(--lux-white);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            @media (max-width: 768px) {
                .deals-page {
                    padding: 15px;
                }

                .deals-filters {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }

                .search-container {
                    flex-direction: column;
                }

                .results-header {
                    flex-direction: column;
                    gap: 10px;
                    align-items: flex-start;
                }

                .deals-grid {
                    grid-template-columns: 1fr;
                    gap: 15px;
                }
            }
        `;

        this.injectStyles(styles, styleId);
    }

    setupEventListeners() {
        // Filter event listeners
        const filters = document.querySelectorAll('[data-filter]');
        filters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                this.applyFilters();
            });
        });

        // Search functionality
        const searchInput = document.querySelector('[data-search-input]');
        const searchBtn = document.querySelector('[data-search-btn]');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = searchInput ? searchInput.value : '';
                this.handleSearch(query);
            });
        }

        // Sort functionality
        const sortSelect = document.querySelector('[data-sort]');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortDeals(e.target.value);
            });
        }

        // Load more functionality
        const loadMoreBtn = document.querySelector('[data-load-more]');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreDeals();
            });
        }

        // Deal card clicks
        document.addEventListener('click', (e) => {
            const dealCard = e.target.closest('[data-deal-id]');
            if (dealCard) {
                const dealId = parseInt(dealCard.getAttribute('data-deal-id'));
                this.handleDealClick(dealId);
            }
        });
    }

    applyFilters() {
        const categoryFilter = document.getElementById('category-filter');
        const priceFilter = document.getElementById('price-filter');
        const brandFilter = document.getElementById('brand-filter');

        this.filteredDeals = this.currentDeals.filter(deal => {
            // Category filter
            if (categoryFilter.value && deal.category.toLowerCase() !== categoryFilter.value.toLowerCase()) {
                return false;
            }

            // Price filter
            if (priceFilter.value) {
                const [min, max] = priceFilter.value.split('-').map(Number);
                if (max && (deal.currentPrice < min || deal.currentPrice > max)) {
                    return false;
                }
                if (!max && deal.currentPrice < min) {
                    return false;
                }
            }

            // Brand filter
            if (brandFilter.value && deal.brand.toLowerCase() !== brandFilter.value.toLowerCase()) {
                return false;
            }

            return true;
        });

        this.updateResults();
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.filteredDeals = [...this.currentDeals];
        } else {
            const searchTerm = query.toLowerCase();
            this.filteredDeals = this.currentDeals.filter(deal => 
                deal.title.toLowerCase().includes(searchTerm) ||
                deal.brand.toLowerCase().includes(searchTerm) ||
                deal.category.toLowerCase().includes(searchTerm)
            );
        }

        this.updateResults();
    }

    sortDeals(sortType) {
        switch (sortType) {
            case 'price-low':
                this.filteredDeals.sort((a, b) => a.currentPrice - b.currentPrice);
                break;
            case 'price-high':
                this.filteredDeals.sort((a, b) => b.currentPrice - a.currentPrice);
                break;
            case 'newest':
                this.filteredDeals.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            default:
                // Relevance - keep original order
                break;
        }

        this.updateResults();
    }

    updateResults() {
        const resultsCount = document.querySelector('.results-count');
        const dealsGrid = document.getElementById('deals-grid');
        const loadMoreContainer = document.getElementById('load-more-container');

        if (resultsCount) {
            resultsCount.textContent = `${this.filteredDeals.length} deals found`;
        }

        if (dealsGrid) {
            dealsGrid.innerHTML = this.renderDealsGrid();
        }

        if (loadMoreContainer) {
            loadMoreContainer.style.display = this.filteredDeals.length > 12 ? 'block' : 'none';
        }
    }

    loadMoreDeals() {
        // Implementation for loading more deals
        console.log('Loading more deals...');
        alert('Load more functionality coming soon!');
    }

    handleDealClick(dealId) {
        console.log('Deal clicked:', dealId);
        // Implementation for deal interaction
        alert(`Deal ${dealId} clicked! Feature coming soon.`);
    }
} 