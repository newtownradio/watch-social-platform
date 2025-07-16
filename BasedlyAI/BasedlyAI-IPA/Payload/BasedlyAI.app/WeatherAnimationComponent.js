// WeatherAnimationComponent.js - GSAP-powered weather animations
class WeatherAnimationComponent extends BaseComponent {
    constructor(dataManager) {
        super('WeatherAnimation', dataManager);
        this.clouds = [];
        this.lightning = [];
        this.mirrors = [];
        this.reflections = [];
        this.isAnimating = false;
    }

    createElement(data = {}) {
        const container = document.createElement('div');
        container.id = 'weather-animation-container';
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

        // Create weather elements
        this.createClouds(container);
        this.createLightning(container);
        this.createRainbow(container);
        this.createMirrors(container);
        this.createReflections(container);

        // Initialize GSAP animations
        this.initAnimations();

        return container;
    }

    createClouds(container) {
        const cloudCount = 8;
        
        for (let i = 0; i < cloudCount; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'weather-cloud';
            cloud.style.cssText = `
                position: absolute;
                width: ${60 + Math.random() * 80}px;
                height: ${40 + Math.random() * 30}px;
                background: linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.9) 0%,
                    rgba(200, 200, 200, 0.7) 50%,
                    rgba(150, 150, 150, 0.5) 100%);
                border-radius: 50px;
                filter: blur(2px);
                opacity: 0.6;
                top: ${Math.random() * 60}%;
                left: ${Math.random() * 100}%;
                transform: scale(${0.8 + Math.random() * 0.4});
            `;

            // Add cloud details
            const cloudDetail1 = document.createElement('div');
            cloudDetail1.style.cssText = `
                position: absolute;
                width: 60%;
                height: 60%;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                top: -20%;
                left: 20%;
                filter: blur(1px);
            `;

            const cloudDetail2 = document.createElement('div');
            cloudDetail2.style.cssText = `
                position: absolute;
                width: 50%;
                height: 50%;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                top: 10%;
                right: 10%;
                filter: blur(1px);
            `;

            cloud.appendChild(cloudDetail1);
            cloud.appendChild(cloudDetail2);
            container.appendChild(cloud);
            this.clouds.push(cloud);
        }
    }

    createLightning(container) {
        const lightningCount = 3;
        
        for (let i = 0; i < lightningCount; i++) {
            const lightning = document.createElement('div');
            lightning.className = 'weather-lightning';
            lightning.style.cssText = `
                position: absolute;
                width: 3px;
                height: 100px;
                background: linear-gradient(to bottom,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 1) 20%,
                    rgba(255, 255, 255, 1) 80%,
                    rgba(255, 255, 255, 0) 100%);
                opacity: 0;
                top: 0;
                left: ${20 + i * 30}%;
                transform: rotate(${Math.random() * 20 - 10}deg);
                filter: blur(1px) drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
                z-index: 10;
            `;
            
            container.appendChild(lightning);
            this.lightning.push(lightning);
        }
    }

    createRainbow(container) {
        const rainbow = document.createElement('div');
        rainbow.className = 'weather-rainbow';
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
                rgba(255, 0, 0, 0.6) 0%,
                rgba(255, 128, 0, 0.6) 16.66%,
                rgba(255, 255, 0, 0.6) 33.33%,
                rgba(0, 255, 0, 0.6) 50%,
                rgba(0, 128, 255, 0.6) 66.66%,
                rgba(128, 0, 255, 0.6) 83.33%,
                rgba(255, 0, 128, 0.6) 100%
            );
            opacity: 0;
            filter: blur(2px);
            z-index: 5;
        `;
        
        container.appendChild(rainbow);
        this.rainbow = rainbow;
    }

    createMirrors(container) {
        const mirrorCount = 4;
        
        for (let i = 0; i < mirrorCount; i++) {
            const mirror = document.createElement('div');
            mirror.className = 'weather-mirror';
            mirror.style.cssText = `
                position: absolute;
                width: ${80 + Math.random() * 120}px;
                height: ${60 + Math.random() * 80}px;
                background: linear-gradient(135deg,
                    rgba(255, 255, 255, 0.9) 0%,
                    rgba(200, 200, 200, 0.8) 30%,
                    rgba(150, 150, 150, 0.6) 70%,
                    rgba(100, 100, 100, 0.4) 100%);
                border-radius: 8px;
                box-shadow: 
                    inset 0 0 20px rgba(255, 255, 255, 0.3),
                    0 0 30px rgba(255, 255, 255, 0.2),
                    0 0 60px rgba(255, 255, 255, 0.1);
                opacity: 0.7;
                top: ${20 + i * 20}%;
                left: ${10 + i * 25}%;
                transform: rotate(${Math.random() * 20 - 10}deg) scale(${0.8 + Math.random() * 0.4});
                filter: blur(0.5px);
                z-index: 8;
            `;

            // Add mirror frame
            const frame = document.createElement('div');
            frame.style.cssText = `
                position: absolute;
                top: -4px;
                left: -4px;
                right: -4px;
                bottom: -4px;
                border: 2px solid rgba(255, 255, 255, 0.6);
                border-radius: 12px;
                background: linear-gradient(45deg,
                    rgba(255, 255, 255, 0.1) 0%,
                    rgba(200, 200, 200, 0.05) 50%,
                    rgba(255, 255, 255, 0.1) 100%);
                z-index: -1;
            `;

            mirror.appendChild(frame);
            container.appendChild(mirror);
            this.mirrors.push(mirror);
        }
    }

    createReflections(container) {
        const reflectionCount = 6;
        
        for (let i = 0; i < reflectionCount; i++) {
            const reflection = document.createElement('div');
            reflection.className = 'weather-reflection';
            reflection.style.cssText = `
                position: absolute;
                width: ${40 + Math.random() * 60}px;
                height: ${30 + Math.random() * 40}px;
                background: radial-gradient(ellipse at center,
                    rgba(255, 255, 255, 0.8) 0%,
                    rgba(255, 255, 255, 0.4) 50%,
                    transparent 100%);
                border-radius: 50%;
                opacity: 0;
                top: ${Math.random() * 80}%;
                left: ${Math.random() * 80}%;
                transform: scale(0.5);
                filter: blur(2px);
                z-index: 9;
                pointer-events: none;
            `;
            
            container.appendChild(reflection);
            this.reflections.push(reflection);
        }
    }

    initAnimations() {
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, falling back to CSS animations');
            this.initCSSAnimations();
            return;
        }

        // Cloud animations
        this.clouds.forEach((cloud, index) => {
            const duration = 15 + Math.random() * 10;
            const delay = Math.random() * 5;
            
            gsap.set(cloud, {
                x: -100,
                y: Math.random() * 100
            });

            gsap.to(cloud, {
                x: window.innerWidth + 100,
                duration: duration,
                delay: delay,
                ease: "none",
                repeat: -1,
                onRepeat: () => {
                    gsap.set(cloud, {
                        x: -100,
                        y: Math.random() * 100
                    });
                }
            });

            // Floating animation
            gsap.to(cloud, {
                y: "+=20",
                duration: 3 + Math.random() * 2,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: delay
            });
        });

        // Lightning animations with mirror reflections
        this.lightning.forEach((lightning, index) => {
            const timeline = gsap.timeline({
                repeat: -1,
                delay: Math.random() * 10
            });

            timeline.to(lightning, {
                opacity: 1,
                duration: 0.1,
                ease: "power2.out",
                onComplete: () => this.triggerMirrorReflections()
            })
            .to(lightning, {
                opacity: 0,
                duration: 0.1,
                ease: "power2.in"
            })
            .to(lightning, {
                opacity: 1,
                duration: 0.05,
                ease: "power2.out",
                onComplete: () => this.triggerMirrorReflections()
            })
            .to(lightning, {
                opacity: 0,
                duration: 0.05,
                ease: "power2.in"
            })
            .to(lightning, {
                opacity: 0,
                duration: 5 + Math.random() * 10,
                ease: "none"
            });
        });

        // Rainbow animation
        gsap.to(this.rainbow, {
            opacity: 0.8,
            duration: 2,
            delay: 1,
            ease: "power2.out"
        });

        gsap.to(this.rainbow, {
            scale: 1.1,
            duration: 4,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1
        });

        // Add mirror animations
        this.initMirrorAnimations();
        
        // Add reflection animations
        this.initReflectionAnimations();
        
        // Add some dramatic effects
        this.addDramaticEffects();
    }

    initMirrorAnimations() {
        if (typeof gsap === 'undefined') return;

        this.mirrors.forEach((mirror, index) => {
            const duration = 8 + Math.random() * 6;
            const delay = Math.random() * 3;
            
            // Floating animation
            gsap.to(mirror, {
                y: "+=30",
                rotation: "+=5",
                duration: duration,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: delay
            });

            // Shine effect
            gsap.to(mirror, {
                opacity: 0.9,
                duration: 2,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1,
                delay: delay + 1
            });

            // Scale animation
            gsap.to(mirror, {
                scale: 1.1,
                duration: 4,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: delay + 2
            });
        });
    }

    initReflectionAnimations() {
        if (typeof gsap === 'undefined') return;

        this.reflections.forEach((reflection, index) => {
            const timeline = gsap.timeline({
                repeat: -1,
                delay: Math.random() * 5
            });

            // Fade in and scale
            timeline.to(reflection, {
                opacity: 0.8,
                scale: 1.2,
                duration: 1,
                ease: "power2.out"
            })
            .to(reflection, {
                opacity: 0,
                scale: 0.5,
                duration: 1,
                ease: "power2.in"
            })
            .to(reflection, {
                opacity: 0,
                duration: 3 + Math.random() * 5,
                ease: "none"
            });

            // Position animation
            gsap.to(reflection, {
                x: "+=100",
                y: "-=50",
                duration: 8 + Math.random() * 4,
                ease: "power1.inOut",
                yoyo: true,
                repeat: -1,
                delay: Math.random() * 3
            });
        });
    }

    triggerMirrorReflections() {
        if (typeof gsap === 'undefined') return;

        // Trigger reflections on random mirrors
        this.mirrors.forEach((mirror, index) => {
            if (Math.random() > 0.5) {
                gsap.to(mirror, {
                    opacity: 1,
                    scale: 1.2,
                    duration: 0.2,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });

                // Create a reflection burst
                const reflection = this.reflections[Math.floor(Math.random() * this.reflections.length)];
                if (reflection) {
                    gsap.to(reflection, {
                        opacity: 1,
                        scale: 1.5,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            gsap.to(reflection, {
                                opacity: 0,
                                scale: 0.5,
                                duration: 0.5,
                                ease: "power2.in"
                            });
                        }
                    });
                }
            }
        });
    }

    addDramaticEffects() {
        // Screen flash effect when lightning strikes
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
            pointer-events: none;
            z-index: 100;
            opacity: 0;
        `;
        document.body.appendChild(flash);

        // Flash animation
        gsap.to(flash, {
            opacity: 0.3,
            duration: 0.1,
            ease: "power2.out",
            repeat: -1,
            repeatDelay: 8 + Math.random() * 15,
            onRepeat: () => {
                gsap.to(flash, {
                    opacity: 0,
                    duration: 0.2,
                    ease: "power2.in"
                });
            }
        });

        // Thunder sound effect (visual representation)
        const thunder = document.createElement('div');
        thunder.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 200px;
            height: 200px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 99;
            opacity: 0;
        `;
        document.body.appendChild(thunder);

        gsap.to(thunder, {
            scale: 3,
            opacity: 0,
            duration: 2,
            ease: "power2.out",
            repeat: -1,
            repeatDelay: 10 + Math.random() * 20
        });
    }

    initCSSAnimations() {
        // Fallback CSS animations if GSAP is not available
        const style = document.createElement('style');
        style.textContent = `
            .weather-cloud {
                animation: cloudFloat 20s linear infinite;
            }
            
            @keyframes cloudFloat {
                0% { transform: translateX(-100px) scale(1); }
                100% { transform: translateX(calc(100vw + 100px)) scale(1); }
            }
            
            .weather-lightning {
                animation: lightningFlash 8s ease-in-out infinite;
            }
            
            @keyframes lightningFlash {
                0%, 90%, 100% { opacity: 0; }
                5%, 15% { opacity: 1; }
                10%, 20% { opacity: 0; }
            }
            
            .weather-rainbow {
                animation: rainbowGlow 4s ease-in-out infinite;
            }
            
            @keyframes rainbowGlow {
                0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
                50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
            }
            
            .weather-mirror {
                animation: mirrorFloat 12s ease-in-out infinite;
            }
            
            @keyframes mirrorFloat {
                0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); opacity: 0.7; }
                25% { transform: translateY(-15px) rotate(2deg) scale(1.05); opacity: 0.8; }
                50% { transform: translateY(-10px) rotate(-1deg) scale(1.1); opacity: 0.9; }
                75% { transform: translateY(-20px) rotate(1deg) scale(1.05); opacity: 0.8; }
            }
            
            .weather-reflection {
                animation: reflectionPulse 6s ease-in-out infinite;
            }
            
            @keyframes reflectionPulse {
                0%, 100% { opacity: 0; transform: scale(0.5); }
                50% { opacity: 0.8; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);
    }

    getIOSEquivalent() {
        return {
            type: 'UIView',
            backgroundColor: 'transparent',
            layer: {
                cornerRadius: 0,
                masksToBounds: false
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherAnimationComponent;
} 