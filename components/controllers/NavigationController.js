// NavigationController.js - Handles navigation and routing for the Watch app
// Manages page transitions, URL updates, and navigation state

class NavigationController {
    constructor() {
        this.currentPage = 'landing';
        this.pageHistory = [];
        this.isInitialized = false;
        this.navigationCallbacks = new Map();
    }

    initialize() {
        console.log('🧭 Initializing Navigation Controller...');
        this.setupNavigationHandlers();
        this.isInitialized = true;
        console.log('✅ Navigation Controller initialized');
    }

    setupNavigationHandlers() {
        // Handle browser back/forward buttons
        window.addEventListener('popstate', (event) => {
            this.handlePopState(event);
        });

        // Handle initial page load
        this.handleInitialLoad();
    }

    handleInitialLoad() {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 'landing';
        
        // Update current page
        this.currentPage = page;
        
        // Add to history
        this.addToHistory(page);
    }

    handlePopState(event) {
        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page') || 'landing';
        
        console.log(`🧭 Navigation popstate: ${page}`);
        
        // Update current page
        this.currentPage = page;
        
        // Trigger navigation callback
        this.triggerNavigationCallback(page);
    }

    navigateToPage(pageName, options = {}) {
        console.log(`🧭 Navigating to: ${pageName}`);
        
        // Validate page name
        if (!this.isValidPage(pageName)) {
            console.warn(`Invalid page: ${pageName}`);
            return false;
        }

        // Update current page
        this.currentPage = pageName;
        
        // Add to history
        this.addToHistory(pageName);
        
        // Update URL
        this.updateURL(pageName, options);
        
        // Trigger navigation callback
        this.triggerNavigationCallback(pageName, options);
        
        // Handle page-specific navigation
        this.handlePageNavigation(pageName, options);
        
        return true;
    }

    isValidPage(pageName) {
        const validPages = [
            'landing',
            'discovery',
            'buysell',
            'messages',
            'account',
            'social',
            'member'
        ];
        return validPages.includes(pageName);
    }

    addToHistory(pageName) {
        this.pageHistory.push({
            page: pageName,
            timestamp: Date.now()
        });
        
        // Keep only last 10 entries
        if (this.pageHistory.length > 10) {
            this.pageHistory.shift();
        }
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
        
        // Update browser URL
        if (options.replace) {
            window.history.replaceState({ page: pageName }, '', url);
        } else {
            window.history.pushState({ page: pageName }, '', url);
        }
    }

    triggerNavigationCallback(pageName, options = {}) {
        const callback = this.navigationCallbacks.get(pageName);
        if (callback) {
            try {
                callback(pageName, options);
            } catch (error) {
                console.error(`Error in navigation callback for ${pageName}:`, error);
            }
        }
    }

    handlePageNavigation(pageName, options = {}) {
        switch (pageName) {
            case 'discovery':
                this.navigateToDiscovery(options);
                break;
            case 'buysell':
                this.navigateToBuySell(options);
                break;
            case 'messages':
                this.navigateToMessages(options);
                break;
            case 'account':
                this.navigateToAccount(options);
                break;
            case 'social':
                this.navigateToSocial(options);
                break;
            case 'member':
                this.navigateToMember(options);
                break;
            default:
                console.log(`No specific handler for page: ${pageName}`);
        }
    }

    navigateToDiscovery(options = {}) {
        console.log('🔍 Navigating to Discovery page...');
        
        // Check if we should load the page directly or use SPA navigation
        if (options.loadDirect) {
            window.location.href = 'discovery.html';
        } else {
            // For SPA navigation, we would load content dynamically
            this.loadPageContent('discovery', options);
        }
    }

    navigateToBuySell(options = {}) {
        console.log('💰 Navigating to Buy/Sell page...');
        
        if (options.loadDirect) {
            window.location.href = 'buysell.html';
        } else {
            this.loadPageContent('buysell', options);
        }
    }

    navigateToMessages(options = {}) {
        console.log('💬 Navigating to Messages page...');
        
        if (options.loadDirect) {
            window.location.href = 'messages.html';
        } else {
            this.loadPageContent('messages', options);
        }
    }

    navigateToAccount(options = {}) {
        console.log('👤 Navigating to Account page...');
        
        if (options.loadDirect) {
            window.location.href = 'account.html';
        } else {
            this.loadPageContent('account', options);
        }
    }

    navigateToSocial(options = {}) {
        console.log('🌐 Navigating to Social page...');
        
        if (options.loadDirect) {
            window.location.href = 'social.html';
        } else {
            this.loadPageContent('social', options);
        }
    }

    navigateToMember(options = {}) {
        console.log('👥 Navigating to Member page...');
        
        if (options.loadDirect) {
            window.location.href = 'member.html';
        } else {
            this.loadPageContent('member', options);
        }
    }

    loadPageContent(pageName, options = {}) {
        // For SPA navigation, this would load content dynamically
        // For now, we'll use direct navigation
        console.log(`📄 Loading content for ${pageName}...`);
        
        // Simulate content loading
        setTimeout(() => {
            window.location.href = `${pageName}.html`;
        }, 100);
    }

    // Navigation callback registration
    onNavigate(pageName, callback) {
        this.navigationCallbacks.set(pageName, callback);
    }

    // Navigation history methods
    getNavigationHistory() {
        return [...this.pageHistory];
    }

    getCurrentPage() {
        return this.currentPage;
    }

    goBack() {
        if (this.pageHistory.length > 1) {
            this.pageHistory.pop(); // Remove current page
            const previousPage = this.pageHistory[this.pageHistory.length - 1];
            this.navigateToPage(previousPage.page, { replace: true });
        } else {
            console.log('No previous page to go back to');
        }
    }

    // Utility methods
    getPageURL(pageName) {
        return `${pageName}.html`;
    }

    isCurrentPage(pageName) {
        return this.currentPage === pageName;
    }

    // Error handling
    handleNavigationError(error, pageName) {
        console.error(`Navigation error for ${pageName}:`, error);
        
        // Fallback to landing page
        this.navigateToPage('landing', { replace: true });
    }

    destroy() {
        // Clear callbacks
        this.navigationCallbacks.clear();
        
        // Clear history
        this.pageHistory = [];
        
        console.log('🗑️ Navigation Controller destroyed');
    }
} 