// SplashPageComponent.js - Dedicated splash page with animations
class SplashPageComponent extends BaseComponent {
    constructor(dataManager) {
        super(dataManager);
        this.landingWeather = new LandingWeatherComponent(dataManager);
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
            align-items: center;
            justify-content: center;
            overflow: hidden;
        `;

        // Create content wrapper
        const contentWrapper = document.createElement('div');
        contentWrapper.id = 'splash-content';
        contentWrapper.style.cssText = `
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 800px;
            padding: 20px;
        `;

        // Create animation container for GSAP hero clouds
        const heroCloudAnim = document.createElement('div');
        heroCloudAnim.id = 'hero-cloud-anim';
        heroCloudAnim.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 180px;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            pointer-events: none;
            z-index: 20;
        `;
        // Add 3 large puffy clouds
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'gsap-puffy-cloud';
            cloud.style.cssText = `
                position: absolute;
                bottom: ${20 + i * 30}px;
                left: ${20 + i * 30}vw;
                width: clamp(120px, 30vw, 220px);
                height: clamp(60px, 12vw, 110px);
                background: linear-gradient(135deg, #fff 80%, #FFABDF 100%);
                border-radius: 50% 50% 60% 60% / 60% 60% 50% 50%;
                opacity: 0.85;
                box-shadow: 0 8px 32px 0 rgba(255,171,223,0.12), 0 1.5vw 2vw 0 #fff8;
                filter: blur(0.5px) drop-shadow(0 0 16px #fff8);
            `;
            heroCloudAnim.appendChild(cloud);
        }

        // Render hero content
        this.hero.render('splash-content', {
            title: 'BASEDLY',
            subtitle: 'AI-Powered Shopping Discovery Platform',
            description: 'Our AI learns your style and finds hidden gems you\'ll love'
        });

        // Create animation container
        const animationContainer = document.createElement('div');
        animationContainer.id = 'splash-animations';
        animationContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            pointer-events: none;
        `;

        // Render landing weather animations (no rainbow)
        this.landingWeather.render('splash-animations');

        // Add navigation buttons
        const navButtons = document.createElement('div');
        navButtons.id = 'splash-navigation';
        navButtons.style.cssText = `
            margin-top: 40px;
            display: flex;
            gap: 20px;
            justify-content: center;
            flex-wrap: wrap;
        `;

        const pages = [
            { name: 'discovery', label: 'DISCOVER', color: 'var(--lux-hot-pink)' },
            { name: 'deals', label: 'DEALS', color: 'var(--lux-white)' },
            { name: 'messages', label: 'MESSAGES', color: 'var(--lux-hot-pink)' },
            { name: 'social', label: 'SOCIAL', color: 'var(--lux-white)' }
        ];

        pages.forEach(page => {
            const button = document.createElement('button');
            button.textContent = page.label;
            button.setAttribute('data-navigate', page.name);
            button.style.cssText = `
                background: transparent;
                border: 2px solid ${page.color};
                color: ${page.color};
                padding: 12px 24px;
                font-family: 'Space Grotesk', Arial, sans-serif;
                font-weight: 600;
                font-size: 14px;
                letter-spacing: 2px;
                text-transform: uppercase;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 4px;
                min-width: 120px;
            `;

            // Hover effects
            button.addEventListener('mouseenter', () => {
                button.style.background = page.color;
                button.style.color = 'var(--lux-black)';
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = `0 4px 12px rgba(255, 171, 223, 0.3)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.background = 'transparent';
                button.style.color = page.color;
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = 'none';
            });

            navButtons.appendChild(button);
        });

        // Assemble the splash page
        contentWrapper.appendChild(heroCloudAnim);
        contentWrapper.appendChild(navButtons);
        splashContainer.appendChild(animationContainer);
        splashContainer.appendChild(contentWrapper);
        container.appendChild(splashContainer);

        // Initialize animations
        this.initializeAnimations();
    }

    initializeAnimations() {
        if (!this.isAnimationsActive) return;

        // Initialize GSAP animations if available
        if (typeof gsap !== 'undefined') {
            // Animate content entrance
            gsap.from('#splash-content', {
                duration: 1.2,
                y: 50,
                opacity: 0,
                ease: 'power2.out',
                delay: 0.3
            });

            // Animate navigation buttons
            gsap.from('#splash-navigation button', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                stagger: 0.1,
                ease: 'back.out(1.7)',
                delay: 0.8
            });
            // Animate clouds
            if (document.querySelectorAll('.gsap-puffy-cloud').length) {
                document.querySelectorAll('.gsap-puffy-cloud').forEach((el, i) => {
                    gsap.to(el, {
                        x: `+=${gsap.utils.random(-30, 30)}vw`,
                        y: `+=${gsap.utils.random(-10, 10)}px`,
                        opacity: gsap.utils.random(0.7, 1),
                        repeat: -1,
                        yoyo: true,
                        duration: gsap.utils.random(5, 8),
                        ease: 'sine.inOut',
                        delay: i * 0.5
                    });
                });
            }
        }
    }

    // Method to toggle animations
    toggleAnimations() {
        this.isAnimationsActive = !this.isAnimationsActive;
        const animationContainer = document.getElementById('splash-animations');
        if (animationContainer) {
            animationContainer.style.display = this.isAnimationsActive ? 'block' : 'none';
        }
    }

    // Method to stop animations
    stopAnimations() {
        this.isAnimationsActive = false;
        const animationContainer = document.getElementById('splash-animations');
        if (animationContainer) {
            animationContainer.style.display = 'none';
        }
    }

    // Method to start animations
    startAnimations() {
        this.isAnimationsActive = true;
        const animationContainer = document.getElementById('splash-animations');
        if (animationContainer) {
            animationContainer.style.display = 'block';
        }
        this.initializeAnimations();
    }

    destroy() {
        // Clean up animations
        if (typeof gsap !== 'undefined') {
            gsap.killTweensOf('#splash-content');
            gsap.killTweensOf('#splash-navigation button');
            gsap.killTweensOf('.gsap-puffy-cloud'); // Kill clouds
        }
        
        // Destroy child components
        if (this.landingWeather) {
            this.landingWeather.destroy();
        }
        if (this.hero) {
            this.hero.destroy();
        }
    }
} 