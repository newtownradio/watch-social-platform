// ComponentManager.js - Main component orchestrator
class ComponentManager {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.components = {};
        this.currentPage = null;
        this.initializeComponents();
    }

    initializeComponents() {
        // Initialize UI components
        this.components.navigation = new NavigationComponent(this.dataManager);
        this.components.hero = new HeroComponent(this.dataManager);
        this.components.dealCard = new DealCardComponent(this.dataManager);
        this.components.searchBar = new SearchBarComponent(this.dataManager);
        this.components.weatherAnimation = new WeatherAnimationComponent(this.dataManager);

        // Initialize page components
        this.components.splashPage = new SplashPageComponent(this.dataManager);
        this.components.discoveryPage = new DiscoveryPageComponent(this.dataManager);
        this.components.messagesPage = new MessagesPageComponent(this.dataManager);

        console.log('ComponentManager initialized with all components');
    }

    // Render navigation
    renderNavigation(containerId) {
        this.components.navigation.render(containerId);
    }

    // Render hero section
    renderHero(containerId, data = {}) {
        this.components.hero.render(containerId, data);
    }

    // Render weather animation
    renderWeather(containerId) {
        this.components.weatherAnimation.render(containerId);
    }

    // Render a specific page
    renderPage(pageName, containerId, data = {}) {
        console.log(`Rendering page: ${pageName}`);
        
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found`);
            return;
        }

        // Clear container
        container.innerHTML = '';

        // Render page content based on page name
        switch (pageName) {
            case 'home':
            case 'splash':
                this.renderSplashPage(containerId, data);
                break;
            case 'discovery':
                this.renderDiscoveryPage(containerId, data);
                break;
            case 'deals':
                this.renderDealsPage(containerId, data);
                break;
            case 'messages':
                this.renderMessagesPage(containerId, data);
                break;
            case 'social':
                this.renderSocialPage(containerId, data);
                break;
            case 'member':
                this.renderMemberPage(containerId, data);
                break;
            default:
                this.renderSplashPage(containerId, data);
        }

        this.currentPage = pageName;
    }

    // Render splash page (home page with animations)
    renderSplashPage(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Render the splash page component
        this.components.splashPage.render(containerId, data);
    }

    // Render discovery page
    renderDiscoveryPage(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Render navigation
        this.renderNavigation(containerId);

        // Create main content container
        const mainContent = document.createElement('div');
        mainContent.id = 'main-content';
        mainContent.style.cssText = `
            margin-top: 80px;
        `;

        this.components.discoveryPage.render('main-content', data);
        container.appendChild(mainContent);
    }

    // Render deals page
    renderDealsPage(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Render navigation
        this.renderNavigation(containerId);

        const mainContent = document.createElement('div');
        mainContent.id = 'main-content';
        mainContent.style.cssText = `
            margin-top: 80px;
            padding: 20px;
            max-width: 1200px;
            margin-left: auto;
            margin-right: auto;
        `;

        const title = document.createElement('h2');
        title.style.cssText = `
            color: var(--lux-hot-pink);
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `;
        title.textContent = 'DEALS';

        const subtitle = document.createElement('p');
        subtitle.style.cssText = `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `;
        subtitle.textContent = 'Browse all available deals';

        // Render search bar
        this.components.searchBar.render('main-content', {
            placeholder: 'Search deals by brand, category, or price...'
        });

        mainContent.appendChild(title);
        mainContent.appendChild(subtitle);
        container.appendChild(mainContent);
    }

    // Render messages page
    renderMessagesPage(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Render navigation
        this.renderNavigation(containerId);

        const mainContent = document.createElement('div');
        mainContent.id = 'main-content';
        mainContent.style.cssText = `
            margin-top: 80px;
        `;

        this.components.messagesPage.render('main-content', data);
        container.appendChild(mainContent);
    }

    // Render social page
    renderSocialPage(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Render navigation
        this.renderNavigation(containerId);

        const mainContent = document.createElement('div');
        mainContent.id = 'main-content';
        mainContent.style.cssText = `
            margin-top: 80px;
            padding: 20px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        `;

        const title = document.createElement('h2');
        title.style.cssText = `
            color: var(--lux-hot-pink);
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `;
        title.textContent = 'PLAN';

        const subtitle = document.createElement('p');
        subtitle.style.cssText = `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `;
        subtitle.textContent = 'Plan your shopping trips and events';

        mainContent.appendChild(title);
        mainContent.appendChild(subtitle);
        container.appendChild(mainContent);
    }

    // Render member page
    renderMemberPage(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Render navigation
        this.renderNavigation(containerId);

        const mainContent = document.createElement('div');
        mainContent.id = 'main-content';
        mainContent.style.cssText = `
            margin-top: 80px;
            padding: 20px;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        `;

        const title = document.createElement('h2');
        title.style.cssText = `
            color: var(--lux-hot-pink);
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `;
        title.textContent = 'MEMBER';

        const subtitle = document.createElement('p');
        subtitle.style.cssText = `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `;
        subtitle.textContent = 'Manage your profile and preferences';

        mainContent.appendChild(title);
        mainContent.appendChild(subtitle);
        container.appendChild(mainContent);
    }

    // Get component by name
    getComponent(name) {
        return this.components[name];
    }

    // Update component
    updateComponent(name, data) {
        const component = this.components[name];
        if (component) {
            component.update(data);
        }
    }

    // Destroy all components
    destroy() {
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        this.components = {};
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentManager;
} 