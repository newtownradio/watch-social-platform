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
        title.className = 'hero-title';
        title.textContent = data.title || 'The Future of Shopping';

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
        
        // Add CSS styles for the hero title
        const style = document.createElement('style');
        style.textContent = `
            .hero-title {
                font-family: 'Inter', 'Space Grotesk', Arial, sans-serif;
                font-size: clamp(3rem, 10vw, 7rem);
                font-weight: 900;
                background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 50%, #ffffff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-shadow: 
                    0 0 50px rgba(255,255,255,1),
                    0 0 100px rgba(255,192,203,0.8),
                    0 0 150px rgba(255,192,203,0.6),
                    3px 3px 6px rgba(0,0,0,0.8);
                letter-spacing: clamp(2px, 1vw, 4px);
                animation: heroTitleGlow 3s ease-in-out infinite alternate;
                filter: drop-shadow(0 12px 24px rgba(255,255,255,0.6));
                position: relative;
                z-index: 25;
                text-align: center;
                line-height: 1.1;
                padding: clamp(20px, 5vw, 40px);
                border-radius: 20px;
                background-color: rgba(0,0,0,0.5);
                backdrop-filter: blur(15px);
                margin-bottom: clamp(30px, 8vw, 60px);
                transform: translateZ(0);
                transition: all 0.3s ease;
            }

            .hero-title:hover {
                transform: scale(1.02) translateZ(0);
                filter: 
                    drop-shadow(0 12px 24px rgba(255,255,255,0.7)) 
                    drop-shadow(0 0 40px rgba(255,192,203,0.9))
                    drop-shadow(0 0 70px rgba(255,255,255,0.6));
            }

            @keyframes heroTitleGlow {
                0% { 
                    filter: drop-shadow(0 8px 16px rgba(255,255,255,0.5)) 
                           drop-shadow(0 0 30px rgba(255,192,203,0.6))
                           drop-shadow(0 0 50px rgba(255,255,255,0.4));
                    text-shadow: 
                        0 0 40px rgba(255,255,255,1),
                        0 0 80px rgba(255,192,203,0.8),
                        0 0 120px rgba(255,192,203,0.6),
                        2px 2px 4px rgba(0,0,0,0.8);
                }
                100% { 
                    filter: drop-shadow(0 12px 24px rgba(255,255,255,0.7)) 
                           drop-shadow(0 0 40px rgba(255,192,203,0.9))
                           drop-shadow(0 0 70px rgba(255,255,255,0.6));
                    text-shadow: 
                        0 0 50px rgba(255,255,255,1),
                        0 0 100px rgba(255,192,203,0.9),
                        0 0 150px rgba(255,192,203,0.7),
                        2px 2px 4px rgba(0,0,0,0.8);
                }
            }

            /* iOS-specific responsive optimizations */
            @supports (-webkit-touch-callout: none) {
                .hero-title {
                    -webkit-transform: translateZ(0);
                    -webkit-backface-visibility: hidden;
                }
            }

            /* Responsive breakpoints for all iOS devices */
            @media screen and (max-width: 428px) { /* iPhone 14 Pro Max */
                .hero-title {
                    font-size: clamp(2rem, 7vw, 3.5rem);
                    margin-bottom: 30px;
                }
            }

            @media screen and (max-width: 390px) { /* iPhone 14, 13, 12 */
                .hero-title {
                    font-size: clamp(1.8rem, 6.5vw, 3rem);
                    margin-bottom: 25px;
                }
            }

            @media screen and (max-width: 375px) { /* iPhone SE, 12 mini */
                .hero-title {
                    font-size: clamp(1.6rem, 6vw, 2.8rem);
                    margin-bottom: 20px;
                }
            }

            @media screen and (max-width: 320px) { /* iPhone SE 1st gen */
                .hero-title {
                    font-size: clamp(1.4rem, 5.5vw, 2.5rem);
                    margin-bottom: 15px;
                }
            }

            /* iPad responsive */
            @media screen and (min-width: 768px) and (max-width: 1024px) {
                .hero-title {
                    font-size: clamp(3rem, 9vw, 4.5rem);
                    margin-bottom: 50px;
                }
            }

            /* Landscape orientation adjustments */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                .hero-title {
                    font-size: clamp(1.5rem, 5vw, 2.5rem);
                    margin-bottom: 15px;
                }
            }

            /* Large desktop screens */
            @media screen and (min-width: 1200px) {
                .hero-title {
                    font-size: clamp(4rem, 10vw, 6rem);
                    margin-bottom: 60px;
                }
            }
        `;
        document.head.appendChild(style);
        
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