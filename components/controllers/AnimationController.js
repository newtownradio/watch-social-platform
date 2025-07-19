// AnimationController.js - Handles Mario-themed animations and visual effects
// Manages all animations, transitions, and interactive effects

class AnimationController {
    constructor() {
        this.animations = new Map();
        this.isInitialized = false;
        this.animationSpeed = 1;
        this.enabled = true;
    }

    initialize() {
        console.log('🎬 Initializing Animation Controller...');
        this.setupAnimationStyles();
        this.isInitialized = true;
        console.log('✅ Animation Controller initialized');
    }

    setupAnimationStyles() {
        // Add additional animation styles if not present
        if (!document.getElementById('mario-animation-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'mario-animation-styles';
            styleSheet.textContent = this.getAnimationStyles();
            document.head.appendChild(styleSheet);
        }
    }

    getAnimationStyles() {
        return `
            /* Mario-themed animation enhancements */
            .cta-button.active {
                transform: scale(1.1);
                box-shadow: 6px 6px 0px #000;
                animation: activePulse 0.5s ease-in-out;
            }

            @keyframes activePulse {
                0%, 100% { transform: scale(1.1); }
                50% { transform: scale(1.15); }
            }

            .coin-sparkle {
                position: absolute;
                font-size: 1.5rem;
                pointer-events: none;
                animation: sparkle 1s ease-out forwards;
            }

            @keyframes sparkle {
                0% {
                    opacity: 1;
                    transform: scale(0) rotate(0deg);
                }
                50% {
                    opacity: 1;
                    transform: scale(1.2) rotate(180deg);
                }
                100% {
                    opacity: 0;
                    transform: scale(0) rotate(360deg);
                }
            }



            .mario-jump {
                animation: marioJump 0.6s ease-out;
            }

            @keyframes marioJump {
                0% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-20px) scale(1.1); }
                100% { transform: translateY(0) scale(1); }
            }

            .button-press {
                animation: buttonPress 0.2s ease-out;
            }

            @keyframes buttonPress {
                0% { transform: translateY(0) scale(1); }
                50% { transform: translateY(2px) scale(0.95); }
                100% { transform: translateY(0) scale(1); }
            }




        `;
    }

    startAnimations() {
        if (!this.enabled) return;
        
        console.log('🎬 Starting Mario animations...');
        
        // Start cloud animations
        this.startCloudAnimations();
        
        // Start power-up animations
        this.startPowerUpAnimations();
        
        // Start character animations
        this.startCharacterAnimations();
    }

    startCloudAnimations() {
        // Cloud animations disabled
    }

    startPowerUpAnimations() {
        // Power-up animations disabled
    }

    startCharacterAnimations() {
        const character = document.querySelector('.mario-character');
        if (character) {
            character.classList.add('mario-jump');
        }
    }

    triggerTabTransition(tabName) {
        if (!this.enabled) return;
        
        console.log(`🎬 Triggering transition to ${tabName}`);
        
        // Add transition effect to buttons
        const buttons = document.querySelectorAll('.cta-button');
        buttons.forEach(button => {
            button.classList.remove('active');
        });
        
        const activeButton = document.querySelector(`[data-tab-navigation="${tabName}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
            
            // Add coin sparkle effect
            this.createCoinSparkle(activeButton);
        }
    }

    createCoinSparkle(element) {
        const sparkle = document.createElement('div');
        sparkle.className = 'coin-sparkle';
        sparkle.textContent = '🪙';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = `${rect.left + rect.width / 2}px`;
        sparkle.style.top = `${rect.top}px`;
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }

    handleButtonPress(button) {
        if (!this.enabled) return;
        
        button.classList.add('button-press');
        
        // Remove class after animation
        setTimeout(() => {
            button.classList.remove('button-press');
        }, 200);
    }

    handleTouchStart(e) {
        if (!this.enabled) return;
        
        const button = e.target.closest('.cta-button');
        if (button) {
            this.handleButtonPress(button);
        }
    }

    handleTouchEnd(e) {
        // Touch end handling if needed
    }

    handleResize() {
        // Adjust animations for different screen sizes
        const width = window.innerWidth;
        
        if (width <= 480) {
            this.animationSpeed = 0.8; // Slower on mobile
        } else if (width <= 768) {
            this.animationSpeed = 0.9; // Slightly slower on tablet
        } else {
            this.animationSpeed = 1; // Normal speed on desktop
        }
        
        this.updateAnimationSpeed();
    }

    updateAnimationSpeed() {
        const animatedElements = document.querySelectorAll('[class*="animation"]');
        animatedElements.forEach(element => {
            element.style.animationDuration = `${this.getAnimationDuration(element)}s`;
        });
    }

    getAnimationDuration(element) {
        const baseDuration = parseFloat(getComputedStyle(element).animationDuration) || 1;
        return baseDuration / this.animationSpeed;
    }

    enableAnimations() {
        this.enabled = true;
        console.log('🎬 Animations enabled');
    }

    disableAnimations() {
        this.enabled = false;
        console.log('🎬 Animations disabled');
    }

    setAnimationSpeed(speed) {
        this.animationSpeed = Math.max(0.1, Math.min(2, speed));
        this.updateAnimationSpeed();
        console.log(`🎬 Animation speed set to ${this.animationSpeed}`);
    }

    // Special Mario effects
    triggerPowerUpEffect() {
        if (!this.enabled) return;
        
        const powerUp = document.createElement('div');
        powerUp.className = 'power-up-effect';
        powerUp.textContent = '⭐';
        powerUp.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 4rem;
            z-index: 1000;
            pointer-events: none;
            animation: powerUpEffect 2s ease-out forwards;
        `;
        
        document.body.appendChild(powerUp);
        
        setTimeout(() => {
            powerUp.remove();
        }, 2000);
    }

    triggerCoinCollect() {
        if (!this.enabled) return;
        
        // Create multiple coin sparkles
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createCoinSparkle(document.body);
            }, i * 100);
        }
    }

    destroy() {
        // Stop all animations
        this.enabled = false;
        
        // Remove animation classes
        const animatedElements = document.querySelectorAll('[class*="animation"]');
        animatedElements.forEach(element => {
            element.style.animation = 'none';
        });
        
        console.log('🗑️ Animation Controller destroyed');
    }
} 