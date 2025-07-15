// SplashPageComponent.js - Dedicated splash page with animations
class SplashPageComponent extends BaseComponent {
    constructor(dataManager) {
        super(dataManager);
        this.hero = new HeroComponent(dataManager);
        this.isAnimationsActive = true;
    }

    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Create splash page container
        const splashContainer = document.createElement('div');
        splashContainer.id = 'splash-page';
        splashContainer.style.cssText = `
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%);
            overflow: hidden;
            cursor: pointer;
            touch-action: manipulation;
            -webkit-tap-highlight-color: transparent;
        `;

        // Add click/touch event to reload index page
        splashContainer.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
        splashContainer.addEventListener('touchend', (e) => {
            e.preventDefault();
            window.location.href = 'index.html';
        });

        // Cloud animation container removed - keeping clean background

        // Create hero content container
        const heroContent = document.createElement('div');
        heroContent.id = 'splash-hero-content';
        heroContent.style.cssText = `
            position: relative;
            z-index: 15;
            text-align: center;
            padding: clamp(20px, 5vw, 40px);
            max-width: 90vw;
            width: 100%;
        `;

        // Create floating hero title with compelling messaging
        const heroContainer = document.createElement('div');
        heroContainer.className = 'hero-title-container';
        heroContainer.id = 'floating-hero';
        heroContainer.style.cssText = `
            margin-bottom: clamp(30px, 8vw, 60px);
            position: relative;
            z-index: 20;
        `;

        const heroTitle = document.createElement('h1');
        heroTitle.className = 'hero-title';
        heroTitle.textContent = 'The Future of Shopping';

        heroContainer.appendChild(heroTitle);
        heroContent.appendChild(heroContainer);

        // Create subtitle
        const subtitle = document.createElement('p');
        subtitle.textContent = 'AI-Powered Shopping Discovery';
        subtitle.style.cssText = `
            font-size: clamp(1rem, 3vw, 1.5rem);
            color: #ffffff;
            margin: clamp(15px, 4vw, 30px) 0;
            opacity: 0.9;
            font-weight: 300;
            letter-spacing: 1px;
            animation: fadeInUp 1s ease-out 0.5s both;
        `;

        heroContent.appendChild(subtitle);

        // Create tap instruction
        const tapInstruction = document.createElement('div');
        tapInstruction.textContent = 'Tap anywhere to continue';
        tapInstruction.style.cssText = `
            font-size: clamp(0.9rem, 2.5vw, 1.2rem);
            color: rgba(255,255,255,0.7);
            margin-top: clamp(20px, 6vw, 40px);
            padding: clamp(10px, 3vw, 20px) clamp(20px, 5vw, 40px);
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 25px;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            animation: pulseGlow 2s ease-in-out infinite;
            transition: all 0.3s ease;
        `;

        heroContent.appendChild(tapInstruction);

        // Add hover effect for tap instruction
        tapInstruction.addEventListener('mouseenter', () => {
            tapInstruction.style.background = 'rgba(255,255,255,0.2)';
            tapInstruction.style.borderColor = 'rgba(255,255,255,0.5)';
        });

        tapInstruction.addEventListener('mouseleave', () => {
            tapInstruction.style.background = 'rgba(255,255,255,0.1)';
            tapInstruction.style.borderColor = 'rgba(255,255,255,0.3)';
        });

        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes pulseGlow {
                0%, 100% { 
                    box-shadow: 0 0 10px rgba(255,255,255,0.2);
                }
                50% { 
                    box-shadow: 0 0 20px rgba(255,255,255,0.4);
                }
            }

            /* iOS-specific responsive optimizations */
            @supports (-webkit-touch-callout: none) {
                #splash-page {
                    -webkit-overflow-scrolling: touch;
                    -webkit-user-select: none;
                    -webkit-touch-callout: none;
                }
                
                .cloud {
                    -webkit-transform: translateZ(0);
                    -webkit-backface-visibility: hidden;
                }
            }

            /* Hero title styles for splash page */
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
                max-width: 95vw;
                word-wrap: break-word;
                hyphens: auto;
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

            /* Responsive breakpoints for all iOS devices */
            @media screen and (max-width: 428px) { /* iPhone 14 Pro Max */
                #floating-hero {
                    margin-bottom: 50px;
                }
                .hero-title {
                    font-size: clamp(2.5rem, 8vw, 4rem);
                }
            }

            @media screen and (max-width: 390px) { /* iPhone 14, 13, 12 */
                #floating-hero {
                    margin-bottom: 45px;
                }
                .hero-title {
                    font-size: clamp(2.2rem, 7.5vw, 3.5rem);
                }
            }

            @media screen and (max-width: 375px) { /* iPhone SE, 12 mini */
                #floating-hero {
                    margin-bottom: 40px;
                }
                .hero-title {
                    font-size: clamp(2rem, 7vw, 3.2rem);
                }
            }

            @media screen and (max-width: 320px) { /* iPhone SE 1st gen */
                #floating-hero {
                    margin-bottom: 35px;
                }
                .hero-title {
                    font-size: clamp(1.8rem, 6.5vw, 2.8rem);
                }
            }

            /* iPad responsive */
            @media screen and (min-width: 768px) and (max-width: 1024px) {
                #splash-page {
                    padding: 40px;
                }
                
                #floating-hero {
                    margin-bottom: 70px;
                }
                .hero-title {
                    font-size: clamp(4rem, 11vw, 5.5rem);
                }
            }

            /* Landscape orientation adjustments */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                #splash-page {
                    min-height: 100vh;
                    padding: 20px;
                }
                
                #floating-hero {
                    margin-bottom: 25px;
                }
                .hero-title {
                    font-size: clamp(2rem, 6vw, 3rem);
                }
                
                /* Cloud elements removed */
            }

            /* Large desktop screens */
            @media screen and (min-width: 1200px) {
                .hero-title {
                    font-size: clamp(5rem, 12vw, 8rem);
                }
            }
        `;

        document.head.appendChild(style);

        // Add components to splash container
        splashContainer.appendChild(heroContent);

        // Clear container and add splash page
        container.innerHTML = '';
        container.appendChild(splashContainer);

        // Cloud animations removed - keeping clean background
    }

    // Cloud animation methods removed

    destroy() {
        this.isAnimationsActive = false;
        const splashPage = document.getElementById('splash-page');
        if (splashPage) {
            splashPage.remove();
        }
    }
} 