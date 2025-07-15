// AppController.js - Main application controller for BubliAI
// This component manages the overall application state and coordinates between data and UI

class AppController {
    constructor() {
        this.dataManager = new DataManager();
        this.uiManager = new UIComponentManager(this.dataManager);
        this.currentPage = 'home';
        this.isInitialized = false;
        this.realTimeInterval = null;
    }

    // Initialize the application
    async initialize() {
        try {
            console.log('Initializing BubliAI Application...');
            
            // Initialize data
            this.dataManager.initializeData();
            
            // Initialize UI components
            this.uiManager.initializeComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Start real-time updates
            this.startRealTimeUpdates();
            
            // Render initial page
            this.renderPage('home');
            
            this.isInitialized = true;
            console.log('BubliAI Application initialized successfully');
            
        } catch (error) {
            console.error('Error initializing application:', error);
            this.uiManager.components.notification.show('Error initializing application');
        }
    }

    // Set up global event listeners
    setupEventListeners() {
        // Navigation event listeners
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-navigate]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-navigate');
                this.navigateToPage(page);
            }
        });

        // Search functionality
        document.addEventListener('submit', (e) => {
            if (e.target.matches('[data-search-form]')) {
                e.preventDefault();
                const formData = new FormData(e.target);
                const query = formData.get('search');
                this.handleSearch(query);
            }
        });

        // Filter functionality
        document.addEventListener('change', (e) => {
            if (e.target.matches('[data-filter]')) {
                const filterType = e.target.getAttribute('data-filter-type');
                const filterValue = e.target.value;
                this.handleFilter(filterType, filterValue);
            }
        });

        // Deal interaction
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-deal-id]')) {
                const dealId = parseInt(e.target.getAttribute('data-deal-id'));
                this.handleDealInteraction(dealId);
            }
        });
    }

    // Navigate to a specific page
    navigateToPage(pageName) {
        console.log(`Navigating to page: ${pageName}`);
        
        // Update current page
        this.currentPage = pageName;
        
        // Update URL without page reload
        const url = new URL(window.location);
        url.searchParams.set('page', pageName);
        window.history.pushState({ page: pageName }, '', url);
        
        // Render the page
        this.renderPage(pageName);
        
        // Show notification
        this.uiManager.components.notification.show(`Navigated to ${pageName}`);
    }

    // Render a specific page
    renderPage(pageName, data = {}) {
        console.log(`Rendering page: ${pageName}`);
        
        const container = document.getElementById('app-container');
        if (!container) {
            console.error('App container not found');
            return;
        }

        // Clear container
        container.innerHTML = '';
        
        // Render the page using UI manager
        this.uiManager.renderPage(pageName, 'app-container', data);
        
        // Post-render setup
        this.setupPageSpecificEvents(pageName);
    }

    // Set up page-specific event listeners
    setupPageSpecificEvents(pageName) {
        switch (pageName) {
            case 'discovery':
                this.setupDiscoveryEvents();
                break;
            case 'deals':
                this.setupDealsEvents();
                break;
            case 'social':
                this.setupSocialEvents();
                break;
            case 'member':
                this.setupMemberEvents();
                break;
        }
    }

    // Discovery page events
    setupDiscoveryEvents() {
        // Category filter buttons
        const categoryButtons = document.querySelectorAll('[data-category]');
        categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                this.filterByCategory(category);
            });
        });

        // Trending deals refresh
        const refreshButton = document.querySelector('[data-refresh-trending]');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => {
                this.refreshTrendingDeals();
            });
        }
    }

    // Deals page events
    setupDealsEvents() {
        // Price range filters
        const priceFilters = document.querySelectorAll('[data-price-filter]');
        priceFilters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                const priceRange = e.target.value;
                this.filterByPrice(priceRange);
            });
        });

        // Brand filters
        const brandFilters = document.querySelectorAll('[data-brand-filter]');
        brandFilters.forEach(filter => {
            filter.addEventListener('change', (e) => {
                const brand = e.target.value;
                this.filterByBrand(brand);
            });
        });
    }

    // Social page events
    setupSocialEvents() {
        // Create trip button
        const createTripButton = document.querySelector('[data-create-trip]');
        if (createTripButton) {
            createTripButton.addEventListener('click', () => {
                this.createShoppingTrip();
            });
        }

        // View events button
        const viewEventsButton = document.querySelector('[data-view-events]');
        if (viewEventsButton) {
            viewEventsButton.addEventListener('click', () => {
                this.viewAllEvents();
            });
        }
    }

    // Member page events
    setupMemberEvents() {
        // Profile update form
        const profileForm = document.querySelector('[data-profile-form]');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile(new FormData(profileForm));
            });
        }

        // Export data button
        const exportButton = document.querySelector('[data-export-data]');
        if (exportButton) {
            exportButton.addEventListener('click', () => {
                this.exportUserData();
            });
        }
    }

    // Handle search functionality
    handleSearch(query) {
        console.log(`Searching for: ${query}`);
        
        if (!query.trim()) {
            this.uiManager.components.notification.show('Please enter a search term');
            return;
        }

        // Search in deals
        const searchResults = this.searchDeals(query);
        
        // Update UI with search results
        this.displaySearchResults(searchResults);
        
        this.uiManager.components.notification.show(`Found ${searchResults.length} results for "${query}"`);
    }

    // Search deals by query
    searchDeals(query) {
        const deals = this.dataManager.getDeals();
        const searchTerm = query.toLowerCase();
        
        return deals.filter(deal => 
            deal.brand.toLowerCase().includes(searchTerm) ||
            deal.description.toLowerCase().includes(searchTerm) ||
            deal.category.toLowerCase().includes(searchTerm) ||
            deal.store.toLowerCase().includes(searchTerm)
        );
    }

    // Display search results
    displaySearchResults(results) {
        const container = document.getElementById('search-results');
        if (!container) return;

        container.innerHTML = '';
        
        if (results.length === 0) {
            container.innerHTML = '<p style="color: var(--lux-white); text-align: center;">No results found</p>';
            return;
        }

        results.forEach(deal => {
            this.uiManager.components.dealCard.render(deal, 'search-results');
        });
    }

    // Handle filter changes
    handleFilter(filterType, filterValue) {
        console.log(`Filter changed: ${filterType} = ${filterValue}`);
        
        let filteredDeals = this.dataManager.getDeals();
        
        switch (filterType) {
            case 'category':
                filteredDeals = this.dataManager.getDealsByCategory(filterValue);
                break;
            case 'price':
                filteredDeals = this.filterByPriceRange(filteredDeals, filterValue);
                break;
            case 'brand':
                filteredDeals = this.dataManager.getDealsByBrand(filterValue);
                break;
        }
        
        this.displayFilteredDeals(filteredDeals);
        this.uiManager.components.notification.show(`Filtered by ${filterType}: ${filterValue}`);
    }

    // Filter by price range
    filterByPriceRange(deals, priceRange) {
        switch (priceRange) {
            case 'under-100':
                return deals.filter(deal => deal.price < 100);
            case '100-500':
                return deals.filter(deal => deal.price >= 100 && deal.price <= 500);
            case '500-1000':
                return deals.filter(deal => deal.price >= 500 && deal.price <= 1000);
            case 'over-1000':
                return deals.filter(deal => deal.price > 1000);
            default:
                return deals;
        }
    }

    // Display filtered deals
    displayFilteredDeals(deals) {
        const container = document.getElementById('filtered-deals');
        if (!container) return;

        container.innerHTML = '';
        
        if (deals.length === 0) {
            container.innerHTML = '<p style="color: var(--lux-white); text-align: center;">No deals match your filters</p>';
            return;
        }

        deals.forEach(deal => {
            this.uiManager.components.dealCard.render(deal, 'filtered-deals');
        });
    }

    // Handle deal interactions
    handleDealInteraction(dealId) {
        const deal = this.dataManager.deals.find(d => d.id === dealId);
        if (!deal) {
            console.error('Deal not found:', dealId);
            return;
        }

        console.log(`Deal interaction: ${deal.brand} - ${deal.description}`);
        
        // Open deal link
        window.open(deal.realTimeLink, '_blank');
        
        // Add to user activity
        this.dataManager.addActivity(`Viewed ${deal.brand} deal: ${deal.description}`);
        
        this.uiManager.components.notification.show(`Opening ${deal.brand} deal...`);
    }

    // Filter by category
    filterByCategory(category) {
        const deals = this.dataManager.getDealsByCategory(category);
        this.displayFilteredDeals(deals);
        this.uiManager.components.notification.show(`Filtered by category: ${category}`);
    }

    // Filter by price
    filterByPrice(priceRange) {
        const deals = this.dataManager.getDeals();
        const filteredDeals = this.filterByPriceRange(deals, priceRange);
        this.displayFilteredDeals(filteredDeals);
        this.uiManager.components.notification.show(`Filtered by price: ${priceRange}`);
    }

    // Filter by brand
    filterByBrand(brand) {
        const deals = this.dataManager.getDealsByBrand(brand);
        this.displayFilteredDeals(deals);
        this.uiManager.components.notification.show(`Filtered by brand: ${brand}`);
    }

    // Refresh trending deals
    refreshTrendingDeals() {
        const trendingDeals = this.dataManager.getTrendingDeals();
        this.displayFilteredDeals(trendingDeals);
        this.uiManager.components.notification.show('Refreshed trending deals');
    }

    // Create shopping trip
    createShoppingTrip() {
        this.uiManager.components.notification.show('Creating shopping trip with friends...');
        setTimeout(() => {
            this.navigateToPage('social');
        }, 2000);
    }

    // View all events
    viewAllEvents() {
        this.uiManager.components.notification.show('Viewing all upcoming events...');
        setTimeout(() => {
            this.navigateToPage('discovery');
        }, 1500);
    }

    // Update user profile
    updateProfile(formData) {
        const profileData = Object.fromEntries(formData);
        console.log('Updating profile:', profileData);
        
        // Update user preferences
        this.dataManager.userPreferences = {
            ...this.dataManager.userPreferences,
            ...profileData
        };
        
        this.uiManager.components.notification.show('Profile updated successfully');
    }

    // Export user data
    exportUserData() {
        const data = this.dataManager.exportForIOS();
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = 'bubli-ai-user-data.json';
        link.click();
        
        this.uiManager.components.notification.show('User data exported successfully');
    }

    // Start real-time updates
    startRealTimeUpdates() {
        this.realTimeInterval = setInterval(() => {
            this.dataManager.simulateRealTimeUpdates();
            this.updateUI();
        }, 5000); // Update every 5 seconds
    }

    // Stop real-time updates
    stopRealTimeUpdates() {
        if (this.realTimeInterval) {
            clearInterval(this.realTimeInterval);
            this.realTimeInterval = null;
        }
    }

    // Update UI with new data
    updateUI() {
        // Update activity feed
        const activityContainer = document.getElementById('activity-feed');
        if (activityContainer) {
            activityContainer.innerHTML = '';
            const activities = this.dataManager.getActivityFeed();
            activities.forEach(activity => {
                this.uiManager.components.activityCard.render(activity, 'activity-feed');
            });
        }

        // Update trending deals
        const trendingContainer = document.getElementById('trending-deals');
        if (trendingContainer) {
            trendingContainer.innerHTML = '';
            const trendingDeals = this.dataManager.getTrendingDeals();
            trendingDeals.forEach(deal => {
                this.uiManager.components.dealCard.render(deal, 'trending-deals');
            });
        }
    }

    // Get application state
    getState() {
        return {
            currentPage: this.currentPage,
            isInitialized: this.isInitialized,
            dataManager: this.dataManager.exportForIOS(),
            uiManager: this.uiManager.getIOSEquivalent(this.currentPage)
        };
    }

    // Destroy application
    destroy() {
        this.stopRealTimeUpdates();
        this.isInitialized = false;
        console.log('BubliAI Application destroyed');
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppController;
} else {
    window.AppController = AppController;
} 