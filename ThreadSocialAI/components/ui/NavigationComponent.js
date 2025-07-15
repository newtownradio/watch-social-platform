// NavigationComponent.js - Navigation bar component
class NavigationComponent extends BaseComponent {
    constructor(dataManager) {
        super('Navigation', dataManager);
        this.currentPage = 'home';
    }

    createElement(data = {}) {
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
        const logoContainer = this.createLogoContainer();
        
        // Navigation links
        const navLinks = this.createNavLinks();

        navContent.appendChild(logoContainer);
        navContent.appendChild(navLinks);
        nav.appendChild(navContent);
        
        return nav;
    }

    createLogoContainer() {
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
        return logoContainer;
    }

    createNavLinks() {
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
            const link = this.createNavLink(item);
            navLinks.appendChild(link);
        });

        return navLinks;
    }

    createNavLink(item) {
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
        
        this.addEventListeners(link, {
            'click': (e) => {
                e.preventDefault();
                this.handleNavigation(item.page);
            },
            'mouseenter': () => {
                link.style.color = 'var(--lux-hot-pink)';
            },
            'mouseleave': () => {
                link.style.color = 'var(--lux-white)';
            }
        });
        
        return link;
    }

    handleNavigation(page) {
        this.currentPage = page;
        if (window.appController) {
            window.appController.navigateToPage(page);
        }
        this.updateActiveLink(page);
    }

    updateActiveLink(activePage) {
        const links = this.element.querySelectorAll('[data-navigate]');
        links.forEach(link => {
            const page = link.getAttribute('data-navigate');
            if (page === activePage) {
                link.style.color = 'var(--lux-hot-pink)';
                link.style.borderBottom = '2px solid var(--lux-hot-pink)';
            } else {
                link.style.color = 'var(--lux-white)';
                link.style.borderBottom = 'none';
            }
        });
    }

    getIOSEquivalent() {
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
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationComponent;
} 