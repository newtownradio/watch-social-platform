/**
 * Main Application Controller - MVC Architecture
 * Handles all routing, navigation, and component management
 */
class AppController {
    constructor() {
        this.currentPage = null;
        this.components = new Map();
        this.routes = new Map();
        this.navigationState = {
            currentPage: 'index',
            previousPage: null,
            navigationHistory: []
        };
        
        this.init();
    }

    init() {
        this.setupRoutes();
        this.setupNavigation();
        this.setupEventListeners();
        this.loadCurrentPage();
        this.updateNavigationState();
    }

    setupRoutes() {
        // Define all application routes
        this.routes.set('index', {
            path: 'index.html',
            title: 'Watch',
            component: 'HomeComponent',
            navActive: 'home'
        });

        this.routes.set('discovery', {
            path: 'discovery.html',
            title: 'Watch - Discovery',
            component: 'DiscoveryComponent',
            navActive: 'discovery'
        });

        this.routes.set('deals', {
            path: 'deals.html',
            title: 'Watch - Deals',
            component: 'DealsComponent',
            navActive: 'deals'
        });

        this.routes.set('messages', {
            path: 'messages.html',
            title: 'Watch - Messages',
            component: 'MessagesComponent',
            navActive: 'messages'
        });

        this.routes.set('social', {
            path: 'social.html',
            title: 'Watch - Plan',
            component: 'SocialComponent',
            navActive: 'social'
        });

        this.routes.set('member', {
            path: 'member.html',
            title: 'Watch - Member',
            component: 'MemberComponent',
            navActive: 'member'
        });

        this.routes.set('login', {
            path: 'login.html',
            title: 'Watch - Sign In',
            component: 'LoginComponent',
            navActive: null
        });

        this.routes.set('signup', {
            path: 'signup.html',
            title: 'Watch - Join',
            component: 'SignupComponent',
            navActive: null
        });
    }

    setupNavigation() {
        // Create navigation component
        this.navigationComponent = new NavigationComponent();
        this.navigationComponent.render();
    }

    setupEventListeners() {
        // Global event listeners
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
        });

        // Navigation event listeners
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-nav]')) {
                e.preventDefault();
                const targetPage = e.target.getAttribute('data-nav');
                this.navigateTo(targetPage);
            }
        });

        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            this.handlePopState(e);
        });
    }

    navigateTo(pageName) {
        const route = this.routes.get(pageName);
        if (!route) {
            console.error(`Route not found: ${pageName}`);
            return;
        }

        // Update navigation history
        this.navigationState.previousPage = this.navigationState.currentPage;
        this.navigationState.currentPage = pageName;
        this.navigationState.navigationHistory.push(pageName);

        // Update URL
        const url = new URL(window.location);
        url.pathname = route.path;
        window.history.pushState({ page: pageName }, route.title, url);

        // Load page content
        this.loadPage(pageName);
    }

    loadPage(pageName) {
        const route = this.routes.get(pageName);
        if (!route) return;

        // Update page title
        document.title = route.title;

        // Load page content
        this.loadPageContent(route.path, () => {
            // Initialize page component
            this.initializePageComponent(route.component);
            
            // Update navigation state
            this.updateNavigationState();
            
            // Trigger page load event
            this.triggerPageLoadEvent(pageName);
        });
    }

    loadPageContent(path, callback) {
        fetch(path)
            .then(response => response.text())
            .then(html => {
                // Extract main content from HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const mainContent = doc.querySelector('.main-content');
                
                if (mainContent) {
                    document.querySelector('.main-content').innerHTML = mainContent.innerHTML;
                }
                
                if (callback) callback();
            })
            .catch(error => {
                console.error('Error loading page:', error);
                // Fallback to direct navigation
                window.location.href = path;
            });
    }

    initializePageComponent(componentName) {
        // Initialize page-specific component
        switch (componentName) {
            case 'HomeComponent':
                this.initializeHomeComponent();
                break;
            case 'DiscoveryComponent':
                this.initializeDiscoveryComponent();
                break;
            case 'DealsComponent':
                this.initializeDealsComponent();
                break;
            case 'MessagesComponent':
                this.initializeMessagesComponent();
                break;
            case 'SocialComponent':
                this.initializeSocialComponent();
                break;
            case 'MemberComponent':
                this.initializeMemberComponent();
                break;
            case 'LoginComponent':
                this.initializeLoginComponent();
                break;
            case 'SignupComponent':
                this.initializeSignupComponent();
                break;
        }
    }

    // Page-specific component initializers
    initializeHomeComponent() {
        // Initialize home page functionality
        this.setupHeroAnimations();
        this.setupCTAButtons();
    }

    initializeDiscoveryComponent() {
        // Initialize discovery page functionality
        this.setupSearchFunctionality();
        this.setupCategoryNavigation();
    }

    initializeDealsComponent() {
        // Initialize deals page functionality
        this.setupDealsGrid();
        this.setupFiltering();
    }

    initializeMessagesComponent() {
        // Initialize messages page functionality
        this.setupEmailInbox();
        this.setupMessageCompose();
    }

    initializeSocialComponent() {
        // Initialize social/plan page functionality
        this.setupSocialFeatures();
    }

    initializeMemberComponent() {
        // Initialize member page functionality
        this.setupMemberProfile();
    }

    initializeLoginComponent() {
        // Initialize login page functionality
        this.setupAuthentication();
    }

    initializeSignupComponent() {
        // Initialize signup page functionality
        this.setupRegistration();
    }

    // Navigation state management
    updateNavigationState() {
        const currentRoute = this.routes.get(this.navigationState.currentPage);
        if (currentRoute) {
            this.navigationComponent.updateActiveState(currentRoute.navActive);
        }
    }

    // Event handling
    handlePageLoad() {
        const currentPage = this.getCurrentPageFromURL();
        this.navigationState.currentPage = currentPage;
        this.updateNavigationState();
    }

    handlePopState(event) {
        if (event.state && event.state.page) {
            this.loadPage(event.state.page);
        }
    }

    getCurrentPageFromURL() {
        const path = window.location.pathname;
        const pageName = path.split('/').pop().replace('.html', '');
        return pageName || 'index';
    }

    // Utility methods
    setupHeroAnimations() {
        // Hero section animations
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.animation = 'titleGlow 3s ease-in-out infinite alternate';
        }
    }

    setupCTAButtons() {
        // CTA button functionality
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const target = button.getAttribute('href');
                if (target) {
                    e.preventDefault();
                    this.navigateTo(target.replace('.html', ''));
                }
            });
        });
    }

    setupSearchFunctionality() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }
    }

    setupCategoryNavigation() {
        // Category navigation
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const category = card.getAttribute('data-category');
                this.navigateToCategory(category);
            });
        });
    }

    setupDealsGrid() {
        // Deals grid functionality
        // Implementation for deals page
    }

    setupFiltering() {
        // Filtering functionality
        // Implementation for filtering
    }

    setupEmailInbox() {
        // Email inbox functionality
        this.initializeEmailComponent();
    }

    setupMessageCompose() {
        // Message compose functionality
        // Implementation for message composition
    }

    setupSocialFeatures() {
        // Social features functionality
        // Implementation for social features
    }

    setupMemberProfile() {
        // Member profile functionality
        // Implementation for member profile
    }

    setupAuthentication() {
        // Authentication functionality
        // Implementation for login
    }

    setupRegistration() {
        // Registration functionality
        // Implementation for signup
    }

    // Event triggers
    triggerPageLoadEvent(pageName) {
        const event = new CustomEvent('pageLoaded', {
            detail: { page: pageName }
        });
        document.dispatchEvent(event);
    }

    // Search and navigation handlers
    handleSearch(query) {
        console.log('Searching for:', query);
        // Implement search functionality
    }

    navigateToCategory(category) {
        console.log('Navigating to category:', category);
        // Implement category navigation
    }

    initializeEmailComponent() {
        // Initialize email component
        if (typeof EmailComponent !== 'undefined') {
            this.emailComponent = new EmailComponent();
            this.emailComponent.init();
        }
    }

    // Public API
    getCurrentPage() {
        return this.navigationState.currentPage;
    }

    getNavigationState() {
        return this.navigationState;
    }

    getRoutes() {
        return this.routes;
    }
}

// Global app controller instance
window.appController = new AppController(); 