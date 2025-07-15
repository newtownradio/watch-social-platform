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

        // Create cloud animation container
        const cloudContainer = document.createElement('div');
        cloudContainer.id = 'cloud-animation-container';
        cloudContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        // Create 3 layers of clouds with enhanced 3D effects
        const cloudLayers = [
            { count: 5, size: 'large', zIndex: 1, opacity: 0.9, speed: 0.5 },
            { count: 8, size: 'medium', zIndex: 2, opacity: 0.7, speed: 0.8 },
            { count: 12, size: 'small', zIndex: 3, opacity: 0.5, speed: 1.2 }
        ];

        cloudLayers.forEach((layer, layerIndex) => {
            for (let i = 0; i < layer.count; i++) {
                const cloud = document.createElement('div');
                cloud.className = `cloud cloud-${layer.size}`;
                cloud.style.cssText = `
                    position: absolute;
                    background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,192,203,0.7) 100%);
                    border-radius: 50px;
                    box-shadow: 
                        0 8px 32px rgba(255,255,255,0.3),
                        inset 0 -4px 8px rgba(0,0,0,0.1),
                        0 4px 16px rgba(255,192,203,0.4);
                    opacity: ${layer.opacity};
                    z-index: ${layer.zIndex};
                    transform: translateZ(${layerIndex * 10}px);
                    filter: blur(${layerIndex * 0.5}px);
                    transition: all 0.3s ease;
                `;

                // Set cloud size based on layer
                const sizeMap = {
                    large: { width: 'clamp(120px, 30vw, 220px)', height: 'clamp(60px, 12vw, 110px)' },
                    medium: { width: 'clamp(80px, 20vw, 150px)', height: 'clamp(40px, 8vw, 75px)' },
                    small: { width: 'clamp(50px, 12vw, 100px)', height: 'clamp(25px, 5vw, 50px)' }
                };

                cloud.style.width = sizeMap[layer.size].width;
                cloud.style.height = sizeMap[layer.size].height;

                // Random positioning
                cloud.style.left = `${Math.random() * 100}%`;
                cloud.style.top = `${Math.random() * 100}%`;

                cloudContainer.appendChild(cloud);
            }
        });

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

        // Create floating Basedly logo with enhanced animations
        const logoContainer = document.createElement('div');
        logoContainer.id = 'floating-logo';
        logoContainer.style.cssText = `
            margin-bottom: clamp(30px, 8vw, 60px);
            animation: logoFloat 4s ease-in-out infinite;
            transform-origin: center;
            position: relative;
            z-index: 20;
        `;

        const logo = document.createElement('div');
        logo.innerHTML = 'BASEDLY';
        logo.style.cssText = `
            font-family: 'Arial Black', sans-serif;
            font-size: clamp(3rem, 10vw, 6rem);
            font-weight: 900;
            background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 50%, #ffffff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-shadow: 
                0 0 40px rgba(255,255,255,1),
                0 0 80px rgba(255,192,203,0.8),
                0 0 120px rgba(255,192,203,0.6),
                2px 2px 4px rgba(0,0,0,0.8);
            letter-spacing: clamp(3px, 1.5vw, 6px);
            animation: logoGlow 3s ease-in-out infinite alternate;
            filter: drop-shadow(0 8px 16px rgba(255,255,255,0.5));
            position: relative;
            z-index: 25;
            text-align: center;
            line-height: 1.2;
            padding: clamp(10px, 3vw, 20px);
            border-radius: 10px;
            background-color: rgba(0,0,0,0.3);
            backdrop-filter: blur(5px);
        `;

        logoContainer.appendChild(logo);
        heroContent.appendChild(logoContainer);

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
            @keyframes logoFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(1deg); }
                50% { transform: translateY(-5px) rotate(-1deg); }
                75% { transform: translateY(-15px) rotate(0.5deg); }
            }

            @keyframes logoGlow {
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

            /* Responsive breakpoints for all iOS devices */
            @media screen and (max-width: 428px) { /* iPhone 14 Pro Max */
                #floating-logo {
                    margin-bottom: 40px;
                }
            }

            @media screen and (max-width: 390px) { /* iPhone 14, 13, 12 */
                #floating-logo {
                    margin-bottom: 35px;
                }
            }

            @media screen and (max-width: 375px) { /* iPhone SE, 12 mini */
                #floating-logo {
                    margin-bottom: 30px;
                }
            }

            @media screen and (max-width: 320px) { /* iPhone SE 1st gen */
                #floating-logo {
                    margin-bottom: 25px;
                }
            }

            /* iPad responsive */
            @media screen and (min-width: 768px) and (max-width: 1024px) {
                #splash-page {
                    padding: 40px;
                }
                
                #floating-logo {
                    margin-bottom: 60px;
                }
            }

            /* Landscape orientation adjustments */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                #splash-page {
                    min-height: 100vh;
                    padding: 20px;
                }
                
                #floating-logo {
                    margin-bottom: 20px;
                }
                
                .cloud {
                    display: none;
                }
            }
        `;

        document.head.appendChild(style);

        // Add components to splash container
        splashContainer.appendChild(cloudContainer);
        splashContainer.appendChild(heroContent);

        // Clear container and add splash page
        container.innerHTML = '';
        container.appendChild(splashContainer);

        // Initialize GSAP animations for clouds
        this.initCloudAnimations();
    }

    initCloudAnimations() {
        if (typeof gsap === 'undefined') {
            // Fallback animation if GSAP not loaded
            this.fallbackCloudAnimation();
            return;
        }

        const clouds = document.querySelectorAll('.cloud');
        
        clouds.forEach((cloud, index) => {
            const duration = 5 + Math.random() * 3; // 5-8 seconds
            const delay = Math.random() * 2;
            
            gsap.set(cloud, {
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight
            });

            gsap.to(cloud, {
                x: `+=${(Math.random() - 0.5) * 200}`,
                y: `+=${(Math.random() - 0.5) * 100}`,
                rotation: Math.random() * 360,
                duration: duration,
                delay: delay,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        });
    }

    fallbackCloudAnimation() {
        const clouds = document.querySelectorAll('.cloud');
        
        clouds.forEach((cloud, index) => {
            const keyframes = `
                @keyframes cloudFloat${index} {
                    0%, 100% { 
                        transform: translate(${Math.random() * 100}px, ${Math.random() * 100}px) rotate(0deg); 
                    }
                    50% { 
                        transform: translate(${Math.random() * 100}px, ${Math.random() * 100}px) rotate(180deg); 
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            cloud.style.animation = `cloudFloat${index} ${5 + Math.random() * 3}s ease-in-out infinite`;
        });
    }

    destroy() {
        this.isAnimationsActive = false;
        const splashPage = document.getElementById('splash-page');
        if (splashPage) {
            splashPage.remove();
        }
    }
} 