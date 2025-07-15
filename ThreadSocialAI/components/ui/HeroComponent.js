// HeroComponent.js - Hero section component
class HeroComponent extends BaseComponent {
    constructor(dataManager) {
        super('Hero', dataManager);
    }

    createElement(data = {}) {
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

        // Create logo container with global animation classes
        const logoContainer = document.createElement('div');
        logoContainer.className = 'basedly-logo-container';
        logoContainer.style.cssText = `
            margin-bottom: clamp(30px, 8vw, 60px);
        `;

        const title = document.createElement('h1');
        title.className = 'basedly-logo';
        title.textContent = data.title || 'BASEDLY';

        logoContainer.appendChild(title);
        section.appendChild(logoContainer);

        const subtitle = document.createElement('p');
        subtitle.style.cssText = `
            font-size: clamp(1rem, 3vw, 1.5rem); 
            color: var(--lux-white); 
            font-weight: 300; 
            letter-spacing: 2px; 
            margin-bottom: 32px;
            opacity: 0.9;
        `;
        subtitle.textContent = data.subtitle || 'AI-Powered Shopping Discovery Platform';

        const description = document.createElement('p');
        description.style.cssText = `
            font-size: clamp(0.9rem, 2.5vw, 1.2rem); 
            color: var(--lux-white); 
            opacity: 0.9; 
            line-height: 1.6;
            max-width: 600px;
        `;
        description.textContent = data.description || 'Our AI learns your style and finds hidden gems you\'ll love';

        section.appendChild(subtitle);
        section.appendChild(description);
        
        return section;
    }

    getIOSEquivalent() {
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
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HeroComponent;
} 