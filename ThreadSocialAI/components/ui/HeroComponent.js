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