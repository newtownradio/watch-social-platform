// LandingPageController.js - Main controller for the Watch landing page
// Implements MVC pattern for the landing page and associated tabs

class LandingPageController {
    constructor() {
        this.model = new LandingPageModel();
        this.view = new LandingPageView();
        this.currentTab = 'discovery';
        this.isInitialized = false;
        this.animationController = null;
        this.navigationController = null;
    }

    async init() {
        try {
            console.log('🎮 Initializing Watch Landing Page Controller...');
            
            // Initialize model
            await this.model.initialize();
            
            // Initialize view
            this.view.initialize();
            
            // Initialize controllers if they exist
            if (typeof AnimationController !== 'undefined') {
                this.animationController = new AnimationController();
                this.animationController.initialize();
            } else {
                console.warn('⚠️ AnimationController not available');
            }
            
            if (typeof NavigationController !== 'undefined') {
                this.navigationController = new NavigationController();
                this.navigationController.initialize();
            } else {
                console.warn('⚠️ NavigationController not available');
            }
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Render initial state
            this.renderLandingPage();
            
            this.isInitialized = true;
            console.log('✅ Watch Landing Page Controller initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing landing page controller:', error);
        }
    }

    setupEventListeners() {
        // Navigation button events
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-tab-navigation]')) {
                e.preventDefault();
                const tabName = e.target.getAttribute('data-tab-navigation');
                this.navigateToTab(tabName);
            }
        });

        // CTA button events
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-cta-action]')) {
                e.preventDefault();
                const action = e.target.getAttribute('data-cta-action');
                this.handleCTAAction(action);
            }
        });

        // Responsive events
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Touch events for mobile
        document.addEventListener('touchstart', (e) => {
            this.handleTouchStart(e);
        });

        document.addEventListener('touchend', (e) => {
            this.handleTouchEnd(e);
        });
    }

    renderLandingPage() {
        const pageData = this.model.getPageData();
        this.view.render(pageData);
        if (this.animationController) {
            this.animationController.startAnimations();
        }
    }

    navigateToTab(tabName) {
        console.log(`🎯 Navigating to tab: ${tabName}`);
        
        // Update current tab
        this.currentTab = tabName;
        
        // Update model
        this.model.setCurrentTab(tabName);
        
        // Update view
        this.view.updateActiveTab(tabName);
        
        // Handle navigation
        if (this.navigationController) {
            this.navigationController.navigateToPage(tabName);
        }
        
        // Trigger animations
        if (this.animationController) {
            this.animationController.triggerTabTransition(tabName);
        }
    }

    handleCTAAction(action) {
        console.log(`🎮 CTA Action: ${action}`);
        
        switch (action) {
            case 'watch':
                this.navigateToTab('discovery');
                break;
            case 'buysell':
                this.navigateToTab('buysell');
                break;
            case 'messages':
                this.navigateToTab('messages');
                break;
            case 'account':
                this.navigateToTab('account');
                break;
            default:
                console.warn(`Unknown CTA action: ${action}`);
        }
    }

    handleResize() {
        this.view.handleResize();
        if (this.animationController) {
            this.animationController.handleResize();
        }
    }

    handleTouchStart(e) {
        if (this.animationController) {
            this.animationController.handleTouchStart(e);
        }
    }

    handleTouchEnd(e) {
        if (this.animationController) {
            this.animationController.handleTouchEnd(e);
        }
    }

    // Public API methods
    getCurrentTab() {
        return this.currentTab;
    }

    getPageData() {
        return this.model.getPageData();
    }

    updatePageData(newData) {
        this.model.updateData(newData);
        this.view.update(this.model.getPageData());
    }

    destroy() {
        if (this.animationController) {
            this.animationController.destroy();
        }
        if (this.navigationController) {
            this.navigationController.destroy();
        }
        this.view.destroy();
        this.model.destroy();
        this.isInitialized = false;
    }
} 