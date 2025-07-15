// RainbowCloudsComponent.js - Rainbow animation component
class RainbowCloudsComponent extends BaseComponent {
    constructor(dataManager) {
        super('RainbowClouds', dataManager);
    }

    createElement(data = {}) {
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;

        // Create rainbow
        const rainbow = this.createRainbow();
        container.appendChild(rainbow);

        return container;
    }

    createRainbow() {
        const rainbow = document.createElement('div');
        rainbow.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 300px;
            height: 150px;
            border-radius: 150px 150px 0 0;
            background: linear-gradient(
                to bottom,
                #ff0000 0%,
                #ff8000 16.66%,
                #ffff00 33.33%,
                #00ff00 50%,
                #0080ff 66.66%,
                #8000ff 83.33%,
                #ff0080 100%
            );
            opacity: 0.8;
            animation: rainbowFloat 4s ease-in-out infinite;
            filter: blur(1px);
        `;

        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbowFloat {
                0%, 100% { 
                    transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                    opacity: 0.8;
                }
                25% { 
                    transform: translate(-50%, -50%) scale(1.05) rotate(1deg); 
                    opacity: 0.9;
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.1) rotate(-0.5deg); 
                    opacity: 1;
                }
                75% { 
                    transform: translate(-50%, -50%) scale(1.05) rotate(0.5deg); 
                    opacity: 0.9;
                }
            }
        `;
        document.head.appendChild(style);

        return rainbow;
    }

    getIOSEquivalent() {
        return {
            type: 'UIView',
            backgroundColor: 'transparent',
            layer: {
                cornerRadius: 150,
                masksToBounds: true
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = RainbowCloudsComponent;
} 