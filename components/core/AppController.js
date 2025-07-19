// AppController.js - Centralized controller for the Watch app
// Manages navigation, authentication, and page state across the entire application

class AppController {
    constructor() {
        this.currentPage = 'landing';
        this.isAuthenticated = false;
        this.currentUser = null;
        this.navigationController = null;
        this.pageControllers = new Map();
        this.isInitialized = false;
    }

    async initialize() {
        try {
            console.log('🎮 Initializing Watch App Controller...');
            
            // Check authentication status
            this.checkAuthenticationStatus();
            
            // Initialize navigation controller
            this.initializeNavigation();
            
            // Set up global event listeners
            this.setupGlobalEventListeners();
            
            // Initialize current page
            this.initializeCurrentPage();
            
            this.isInitialized = true;
            console.log('✅ Watch App Controller initialized');
            
        } catch (error) {
            console.error('❌ Error initializing App Controller:', error);
        }
    }

    checkAuthenticationStatus() {
        const token = localStorage.getItem('watch_token');
        const user = JSON.parse(localStorage.getItem('watch_user') || 'null');
        
        this.isAuthenticated = !!token;
        this.currentUser = user;
        
        console.log(`🔐 Authentication status: ${this.isAuthenticated ? 'Authenticated' : 'Not authenticated'}`);
        if (this.isAuthenticated) {
            console.log(`👤 Current user: ${this.currentUser?.name || 'Unknown'}`);
        }
    }

    initializeNavigation() {
        // Create navigation controller if it doesn't exist
        if (typeof NavigationController !== 'undefined') {
            this.navigationController = new NavigationController();
            this.navigationController.initialize();
            
            // Override navigation methods to use MVC pattern
            this.setupMVCNavigation();
        }
    }

    setupMVCNavigation() {
        // Override the navigation methods to use MVC pattern instead of direct navigation
        this.navigationController.navigateToDiscovery = (options = {}) => {
            console.log('🔍 MVC: Navigating to Discovery...');
            this.navigateToPage('discovery', options);
        };

        this.navigationController.navigateToBuySell = (options = {}) => {
            console.log('💰 MVC: Navigating to Buy/Sell...');
            this.navigateToPage('buysell', options);
        };

        this.navigationController.navigateToMessages = (options = {}) => {
            console.log('💬 MVC: Navigating to Messages...');
            this.navigateToPage('messages', options);
        };

        this.navigationController.navigateToAccount = (options = {}) => {
            console.log('👤 MVC: Navigating to Account...');
            this.navigateToPage('account', options);
        };
    }

    setupGlobalEventListeners() {
        // Global navigation event listeners
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Handle navigation links
            if (target.matches('[data-navigate]')) {
                e.preventDefault();
                const page = target.getAttribute('data-navigate');
                this.navigateToPage(page);
            }
            
            // Handle logout
            if (target.matches('[data-logout]')) {
                e.preventDefault();
                this.logout();
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handlePopState(e);
        });
    }

    initializeCurrentPage() {
        // Determine current page from URL
        const path = window.location.pathname;
        const page = this.getPageFromPath(path);
        
        this.currentPage = page;
        this.loadPageContent(page);
    }

    getPageFromPath(path) {
        if (path.includes('discovery')) return 'discovery';
        if (path.includes('buysell')) return 'buysell';
        if (path.includes('messages')) return 'messages';
        if (path.includes('account')) return 'account';
        return 'landing';
    }

    async navigateToPage(pageName, options = {}) {
        console.log(`🎮 App Controller: Navigating to ${pageName}`);
        
        // Check authentication for protected pages
        if (this.isPageProtected(pageName) && !this.isAuthenticated) {
            console.log('🔒 Redirecting to login - page requires authentication');
            this.redirectToLogin();
            return;
        }
        
        // Update current page
        this.currentPage = pageName;
        
        // Update URL without page reload
        this.updateURL(pageName, options);
        
        // Load page content
        await this.loadPageContent(pageName, options);
        
        // Update navigation state
        this.updateNavigationState(pageName);
        
        // Trigger page-specific initialization
        this.initializePageController(pageName);
    }

    isPageProtected(pageName) {
        const protectedPages = ['discovery', 'buysell', 'messages', 'account'];
        return protectedPages.includes(pageName);
    }

    async loadPageContent(pageName, options = {}) {
        try {
            // For now, use direct navigation but with proper state management
            // In a full SPA, this would load content dynamically
            const url = this.getPageURL(pageName);
            
            // Update page title
            document.title = `Watch - ${this.capitalizeFirst(pageName)}`;
            
            // Navigate to the page
            window.location.href = url;
            
        } catch (error) {
            console.error(`❌ Error loading page ${pageName}:`, error);
            this.handleNavigationError(error, pageName);
        }
    }

    getPageURL(pageName) {
        const pageUrls = {
            'landing': 'index.html',
            'discovery': 'discovery.html',
            'buysell': 'buysell.html',
            'messages': 'messages.html',
            'account': 'account.html'
        };
        return pageUrls[pageName] || 'index.html';
    }

    updateURL(pageName, options = {}) {
        const url = new URL(window.location);
        
        if (pageName === 'landing') {
            url.searchParams.delete('page');
        } else {
            url.searchParams.set('page', pageName);
        }
        
        // Add any additional parameters
        if (options.params) {
            Object.entries(options.params).forEach(([key, value]) => {
                url.searchParams.set(key, value);
            });
        }
        
        // Update browser URL without reload
        if (options.replace) {
            window.history.replaceState({ page: pageName }, '', url);
        } else {
            window.history.pushState({ page: pageName }, '', url);
        }
    }

    updateNavigationState(pageName) {
        // Update active navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-navigate') === pageName) {
                link.classList.add('active');
            }
        });
    }

    initializePageController(pageName) {
        // Initialize page-specific controller if it exists
        const controllerName = `${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Controller`;
        
        if (typeof window[controllerName] !== 'undefined') {
            if (!this.pageControllers.has(pageName)) {
                this.pageControllers.set(pageName, new window[controllerName]());
            }
            
            const controller = this.pageControllers.get(pageName);
            if (controller && typeof controller.initialize === 'function') {
                controller.initialize();
            }
        }
    }

    handlePopState(event) {
        const page = event.state?.page || 'landing';
        console.log(`🔄 Pop state: ${page}`);
        this.navigateToPage(page, { replace: true });
    }

    redirectToLogin() {
        window.location.href = 'index.html';
    }

    logout() {
        console.log('🚪 Logging out user...');
        
        // Clear authentication data
        localStorage.removeItem('watch_token');
        localStorage.removeItem('watch_user');
        
        // Update state
        this.isAuthenticated = false;
        this.currentUser = null;
        
        // Redirect to landing page
        this.navigateToPage('landing', { replace: true });
    }

    handleNavigationError(error, pageName) {
        console.error(`Navigation error for ${pageName}:`, error);
        
        // Fallback to landing page
        this.navigateToPage('landing', { replace: true });
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Public API methods
    getCurrentPage() {
        return this.currentPage;
    }

    isUserAuthenticated() {
        return this.isAuthenticated;
    }

    getCurrentUser() {
        return this.currentUser;
    }

    // Utility methods
    showLoading() {
        // Show loading indicator
        const loadingEl = document.getElementById('loading-indicator');
        if (loadingEl) {
            loadingEl.style.display = 'block';
        }
    }

    hideLoading() {
        // Hide loading indicator
        const loadingEl = document.getElementById('loading-indicator');
        if (loadingEl) {
            loadingEl.style.display = 'none';
        }
    }

    destroy() {
        console.log('🗑️ Destroying App Controller...');
        
        // Destroy page controllers
        this.pageControllers.forEach(controller => {
            if (controller && typeof controller.destroy === 'function') {
                controller.destroy();
            }
        });
        this.pageControllers.clear();
        
        // Destroy navigation controller
        if (this.navigationController) {
            this.navigationController.destroy();
        }
        
        this.isInitialized = false;
        console.log('✅ App Controller destroyed');
    }
}

// Global app controller instance
window.appController = null;

// Initialize app controller when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎮 DOM ready, initializing App Controller...');
    
    try {
        window.appController = new AppController();
        await window.appController.initialize();
        
        console.log('🎉 App Controller ready!');
        
    } catch (error) {
        console.error('❌ Failed to initialize App Controller:', error);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppController;
} 