// LandingWeatherComponent.js - Weather animations for landing page (no rainbow)
class LandingWeatherComponent extends BaseComponent {
    constructor(dataManager) {
        super('LandingWeather', dataManager);
        this.clouds = [];
        this.lightning = [];
        this.mirrors = [];
        this.reflections = [];
        this.isAnimating = false;
    }

    createElement(data = {}) {
        const container = document.createElement('div');
        container.id = 'landing-weather-container';
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

        // Create weather elements (no rainbow)
        this.createClouds(container);
        this.createLightning(container);
        this.createMirrors(container);
        this.createReflections(container);

        // Initialize GSAP animations
        this.initAnimations();

        return container;
    }

    createClouds(container) {
        const cloudCount = 6;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'landing-cloud';
            cloud.style.cssText = `
                position: absolute;
                width: ${80 + Math.random() * 120}px;
                height: ${50 + Math.random() * 40}px;
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.9) 0%,
                    rgba(200, 200, 200, 0.7) 50%,
                    rgba(150, 150, 150, 0.5) 100%);
                border-radius: 60px;
                filter: blur(3px);
                opacity: 0.7;
                top: ${Math.random() * 70}%;
                left: ${Math.random() * 100}%;
                transform: scale(${0.8 + Math.random() * 0.4});
            `;

            // Add cloud details
            const cloudDetail1 = document.createElement('div');
            cloudDetail1.style.cssText = `
                position: absolute;
                width: 70%;
                height: 70%;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                top: -25%;
                left: 25%;
                filter: blur(2px);
            `;

            const cloudDetail2 = document.createElement('div');
            cloudDetail2.style.cssText = `
                position: absolute;
                width: 60%;
                height: 60%;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: 15%;
                right: 15%;
                filter: blur(2px);
            `;

            const cloudDetail3 = document.createElement('div');
            cloudDetail3.style.cssText = `
                position: absolute;
                width: 50%;
                height: 50%;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                bottom: -20%;
                left: 15%;
                filter: blur(2px);
            `;

            cloud.appendChild(cloudDetail1);
            cloud.appendChild(cloudDetail2);
            cloud.appendChild(cloudDetail3);
            container.appendChild(cloud);
            this.clouds.push(cloud);
        }
    }

    createLightning(container) {
        const lightningCount = 4;
        
        for (let i = 0; i < lightningCount; i++) {
            const lightning = document.createElement('div');
            lightning.className = 'landing-lightning';
            lightning.style.cssText = `
                position: absolute;
                width: 4px;
                height: 120px;
                background: linear-gradient(to bottom,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 1) 20%,
                    rgba(255, 255, 255, 1) 80%,
                    rgba(255, 255, 255, 0) 100%);
                opacity: 0;
                top: 0;
                left: ${15 + i * 25}%;
                transform: rotate(${Math.random() * 30 - 15}deg);
                filter: blur(1px) drop-shadow(0 0 15px rgba(255, 255, 255, 0.9));
                z-index: 10;
            `;
            
            container.appendChild(lightning);
            this.lightning.push(lightning);
        }
    }

    createMirrors(container) {
        const mirrorCount = 5;
        
        for (let i = 0; i < mirrorCount; i++) {
            const mirror = document.createElement('div');
            mirror.className = 'landing-mirror';
            mirror.style.cssText = `
                position: absolute;
                width: ${100 + Math.random() * 150}px;
                height: ${80 + Math.random() * 100}px;
                background: linear-gradient(135deg,
                    rgba(255, 255, 255, 0.95) 0%,
                    rgba(220, 220, 220, 0.85) 30%,
                    rgba(180, 180, 180, 0.7) 70%,
                    rgba(120, 120, 120, 0.5) 100%);
                border-radius: 12px;
                box-shadow: 
                    inset 0 0 25px rgba(255, 255, 255, 0.4),
                    0 0 40px rgba(255, 255, 255, 0.3),
                    0 0 80px rgba(255, 255, 255, 0.2);
                opacity: 0.8;
                top: ${15 + i * 18}%;
                left: ${8 + i * 22}%;
                transform: rotate(${Math.random() * 25 - 12}deg) scale(${0.7 + Math.random() * 0.5});
                filter: blur(0.5px);
                z-index: 8;
            `;

            // Add mirror frame
            const frame = document.createElement('div');
            frame.style.cssText = `
                position: absolute;
                top: -6px;
                left: -6px;
                right: -6px;
                bottom: -6px;
                border: 3px solid rgba(255, 255, 255, 0.7);
                border-radius: 18px;
                background: linear-gradient(45deg,
                    rgba(255, 255, 255, 0.15) 0%,
                    rgba(220, 220, 220, 0.08) 50%,
                    rgba(255, 255, 255, 0.15) 100%);
                z-index: -1;
            `;

            // Add mirror reflection
            const reflection = document.createElement('div');
            reflection.style.cssText = `
                position: absolute;
                top: 10%;
                left: 10%;
                right: 10%;
                bottom: 10%;
                background: linear-gradient(135deg,
                    rgba(255, 255, 255, 0.3) 0%,
                    rgba(200, 200, 200, 0.2) 50%,
                    rgba(150, 150, 150, 0.1) 100%);
                border-radius: 8px;
                opacity: 0.6;
            `;

            mirror.appendChild(frame);
            mirror.appendChild(reflection);
            container.appendChild(mirror);
            this.mirrors.push(mirror);
        }
    }

    createReflections(container) {
        const reflectionCount = 8;
        
        for (let i = 0; i < reflectionCount; i++) {
            const reflection = document.createElement('div');
            reflection.className = 'landing-reflection';
            reflection.style.cssText = `
                position: absolute;
                width: ${20 + Math.random() * 40}px;
                height: ${30 + Math.random() * 50}px;
                background: linear-gradient(to bottom,
                    rgba(255, 255, 255, 0.8) 0%,
                    rgba(255, 255, 255, 0.4) 50%,
                    rgba(255, 255, 255, 0.1) 100%);
                border-radius: 50%;
                opacity: 0;
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 100}%;
                filter: blur(2px);
                z-index: 9;
            `;
            
            container.appendChild(reflection);
            this.reflections.push(reflection);
        }
    }

    initAnimations() {
        if (typeof gsap === 'undefined') {
            this.initCSSAnimations();
            return;
        }

        this.initCloudAnimations();
        this.initLightningAnimations();
        this.initMirrorAnimations();
        this.initReflectionAnimations();
    }

    initCloudAnimations() {
        this.clouds.forEach((cloud, index) => {
            const duration = 8 + Math.random() * 4;
            const delay = index * 0.5;
            
            gsap.to(cloud, {
                x: '+=100',
                y: '-=30',
                rotation: Math.random() * 10 - 5,
                duration: duration,
                delay: delay,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });

            gsap.to(cloud, {
                opacity: 0.3 + Math.random() * 0.4,
                scale: 0.9 + Math.random() * 0.2,
                duration: 3 + Math.random() * 2,
                delay: delay,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    initLightningAnimations() {
        this.lightning.forEach((lightning, index) => {
            const strikeInterval = 3 + Math.random() * 4;
            const delay = index * 0.8;
            
            gsap.to(lightning, {
                opacity: 1,
                scaleY: 1.2,
                duration: 0.1,
                delay: delay,
                ease: 'power2.out',
                repeat: -1,
                repeatDelay: strikeInterval,
                onRepeat: () => {
                    gsap.to(lightning, {
                        opacity: 0,
                        scaleY: 1,
                        duration: 0.2,
                        delay: 0.1
                    });
                }
            });
        });
    }

    initMirrorAnimations() {
        this.mirrors.forEach((mirror, index) => {
            const duration = 6 + Math.random() * 4;
            const delay = index * 0.3;
            
            gsap.to(mirror, {
                x: '+=50',
                y: '-=20',
                rotation: Math.random() * 15 - 7,
                duration: duration,
                delay: delay,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });

            gsap.to(mirror, {
                opacity: 0.6 + Math.random() * 0.3,
                scale: 0.8 + Math.random() * 0.3,
                duration: 4 + Math.random() * 2,
                delay: delay,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    initReflectionAnimations() {
        this.reflections.forEach((reflection, index) => {
            const duration = 2 + Math.random() * 3;
            const delay = index * 0.2;
            
            gsap.to(reflection, {
                opacity: 0.8,
                scale: 1.2,
                duration: 0.5,
                delay: delay,
                ease: 'power2.out',
                repeat: -1,
                repeatDelay: duration,
                onRepeat: () => {
                    gsap.to(reflection, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3
                    });
                }
            });

            gsap.to(reflection, {
                x: '+=30',
                y: '-=20',
                duration: duration + 1,
                delay: delay,
                ease: 'power2.inOut',
                repeat: -1,
                yoyo: true
            });
        });
    }

    initCSSAnimations() {
        // Fallback CSS animations if GSAP is not available
        this.clouds.forEach((cloud, index) => {
            cloud.style.animation = `float ${6 + index}s ease-in-out infinite`;
        });

        this.lightning.forEach((lightning, index) => {
            lightning.style.animation = `lightning ${4 + index}s ease-in-out infinite`;
        });

        this.mirrors.forEach((mirror, index) => {
            mirror.style.animation = `mirrorFloat ${8 + index}s ease-in-out infinite`;
        });
    }

    destroy() {
        // Clean up GSAP animations
        if (typeof gsap !== 'undefined') {
            this.clouds.forEach(cloud => gsap.killTweensOf(cloud));
            this.lightning.forEach(lightning => gsap.killTweensOf(lightning));
            this.mirrors.forEach(mirror => gsap.killTweensOf(mirror));
            this.reflections.forEach(reflection => gsap.killTweensOf(reflection));
        }
        
        // Clear arrays
        this.clouds = [];
        this.lightning = [];
        this.mirrors = [];
        this.reflections = [];
    }
} 