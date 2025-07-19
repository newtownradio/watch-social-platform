// LandingPageView.js - View component for the Mario-themed Watch landing page
// Handles all visual rendering and UI interactions

class LandingPageView {
    constructor() {
        this.container = null;
        this.elements = {};
        this.isRendered = false;
        this.currentBreakpoint = 'desktop';
    }

    initialize() {
        console.log('🎮 Initializing Landing Page View...');
        this.setupStyles();
        console.log('✅ Landing Page View initialized');
    }

    setupStyles() {
        // Add Mario-themed CSS if not already present
        if (!document.getElementById('mario-theme-styles')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'mario-theme-styles';
            styleSheet.textContent = this.getMarioStyles();
            document.head.appendChild(styleSheet);
        }
    }

    getMarioStyles() {
        return `
            .mario-world {
                min-height: 100vh;
                position: relative;
                background: 
                    radial-gradient(circle at 20% 80%, #FFD700 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, #FF69B4 0%, transparent 50%),
                    linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #FFB6C1 100%);
                font-family: 'Press Start 2P', cursive;
                margin: 0;
                color: #8B4513;
                overflow-x: hidden;
            }

            .clouds {
                position: absolute;
                top: 20px;
                left: 0;
                width: 100%;
                height: 100px;
                background: 
                    radial-gradient(circle at 20% 50%, rgba(255,255,255,0.8) 0%, transparent 50%),
                    radial-gradient(circle at 80% 30%, rgba(255,255,255,0.6) 0%, transparent 50%),
                    radial-gradient(circle at 50% 70%, rgba(255,255,255,0.7) 0%, transparent 50%);
                animation: float 6s ease-in-out infinite;
            }

            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }

            .hero {
                text-align: center;
                padding: 100px 20px;
                position: relative;
                z-index: 2;
            }

            .hero h1 {
                font-size: clamp(2rem, 8vw, 4rem);
                margin-bottom: 30px;
                color: #FF4500;
                text-shadow: 3px 3px 0px #FFD700, 6px 6px 0px #FF6347;
                animation: bounce 2s ease-in-out infinite;
            }

            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }

            .hero p {
                font-size: clamp(1rem, 3vw, 1.2rem);
                margin-bottom: 40px;
                font-family: Arial, sans-serif;
                color: #2C3E50;
                text-shadow: 1px 1px 2px rgba(255,255,255,0.8);
            }

            .mario-character {
                font-size: clamp(3rem, 10vw, 4rem);
                margin: 20px 0;
                animation: jump 3s ease-in-out infinite;
            }

            @keyframes jump {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-20px) rotate(5deg); }
                50% { transform: translateY(-40px) rotate(0deg); }
                75% { transform: translateY(-20px) rotate(-5deg); }
            }

            .cta-buttons {
                display: flex;
                gap: clamp(10px, 2vw, 20px);
                justify-content: center;
                flex-wrap: wrap;
                margin-top: 40px;
                padding: 0 10px;
            }

            .cta-button {
                padding: clamp(12px, 3vw, 18px) clamp(20px, 4vw, 30px);
                font-size: clamp(0.8rem, 2.5vw, 1rem);
                text-decoration: none;
                border-radius: 8px;
                font-weight: bold;
                transition: all 0.3s ease;
                border: 3px solid #000;
                box-shadow: 3px 3px 0px #000;
                position: relative;
                overflow: hidden;
                white-space: nowrap;
                min-width: fit-content;
                cursor: pointer;
            }

            .cta-button::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: left 0.5s;
            }

            .cta-button:hover::before {
                left: 100%;
            }

            .cta-button.primary { background: #FF4500; color: white; }
            .cta-button.secondary { background: #4169E1; color: white; }
            .cta-button.tertiary { background: #32CD32; color: white; }
            .cta-button.quaternary { background: #FF69B4; color: white; }

            .cta-button:hover {
                transform: translateY(-3px);
                box-shadow: 5px 5px 0px #000;
            }

            .cta-button:active {
                transform: translateY(-1px);
                box-shadow: 2px 2px 0px #000;
            }

            .mario-elements {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                font-size: clamp(1.5rem, 4vw, 2rem);
                animation: slide 4s ease-in-out infinite;
            }

            @keyframes slide {
                0%, 100% { transform: translateX(-50%) translateY(0); }
                50% { transform: translateX(-50%) translateY(-10px); }
            }

            .footer {
                position: absolute;
                bottom: 10px;
                left: 0;
                width: 100%;
                text-align: center;
                font-size: clamp(0.7rem, 2vw, 0.9rem);
                color: #2C3E50;
                font-family: Arial, sans-serif;
            }

            /* Mobile First Responsive Design */
            @media screen and (max-width: 480px) {
                .hero { padding: 60px 15px; }
                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                }
                .cta-button {
                    width: 100%;
                    max-width: 280px;
                    text-align: center;
                }
            }

            @media screen and (max-width: 768px) {
                .hero { padding: 80px 20px; }
                .cta-buttons { gap: 15px; }
            }

            @media screen and (min-width: 769px) and (max-width: 1024px) {
                .hero { padding: 120px 40px; }
                .cta-buttons { gap: 25px; }
            }

            @media screen and (min-width: 1025px) {
                .hero { padding: 150px 60px; }
                .cta-buttons { gap: 30px; }
            }

            /* Landscape orientation adjustments */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                .hero { padding: 40px 20px; }
                .mario-character { font-size: clamp(2rem, 6vw, 3rem); }
                .hero h1 { font-size: clamp(1.5rem, 6vw, 2.5rem); }
            }

            /* Touch device optimizations */
            @media (hover: none) and (pointer: coarse) {
                .cta-button:hover { transform: none; }
                .cta-button:active {
                    transform: translateY(-2px);
                    box-shadow: 3px 3px 0px #000;
                }
            }
        `;
    }

    render(pageData) {
        console.log('🎨 Rendering Mario-themed landing page...');
        
        // Clear existing content
        this.clearContainer();
        
        // Create main container
        this.container = this.createMarioWorld();
        
        // Add to body
        document.body.appendChild(this.container);
        
        // Store references to elements
        this.elements = {
            container: this.container,
            hero: this.container.querySelector('.hero'),
            ctaButtons: this.container.querySelectorAll('.cta-button'),
            marioCharacter: this.container.querySelector('.mario-character'),
            marioElements: this.container.querySelector('.mario-elements')
        };
        
        this.isRendered = true;
        console.log('✅ Landing page rendered successfully');
    }

    createMarioWorld() {
        const marioWorld = document.createElement('div');
        marioWorld.className = 'mario-world';
        
        marioWorld.innerHTML = `
            <div class="clouds"></div>
            
            <div class="hero">
                <div class="mario-character">🎮</div>
                <h1>Watch</h1>
                <p>Level Up Socially!</p>
                
                <div class="cta-buttons">
                    <button class="cta-button primary" data-cta-action="watch" data-tab-navigation="discovery">
                        🔍 Watch
                    </button>
                    <button class="cta-button secondary" data-cta-action="buysell" data-tab-navigation="buysell">
                        💰 Buy/Sell
                    </button>
                    <button class="cta-button tertiary" data-cta-action="messages" data-tab-navigation="messages">
                        💬 Messages
                    </button>
                    <button class="cta-button quaternary" data-cta-action="account" data-tab-navigation="account">
                        👤 Account
                    </button>
                </div>
                
                <div class="mario-elements">
                    🍄 ⭐ 🎯 🏆
                </div>
            </div>
            
            <div class="footer">
                © 2025 Watch
            </div>
        `;
        
        return marioWorld;
    }

    update(pageData) {
        if (!this.isRendered) {
            this.render(pageData);
            return;
        }
        
        // Update dynamic content
        this.updateActiveTab(pageData.currentTab);
    }

    updateActiveTab(tabId) {
        // Remove active class from all buttons
        this.elements.ctaButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Add active class to current tab button
        const activeButton = Array.from(this.elements.ctaButtons)
            .find(button => button.getAttribute('data-tab-navigation') === tabId);
        
        if (activeButton) {
            activeButton.classList.add('active');
        }
    }

    handleResize() {
        const newBreakpoint = this.getBreakpoint();
        if (newBreakpoint !== this.currentBreakpoint) {
            this.currentBreakpoint = newBreakpoint;
            this.updateResponsiveLayout();
        }
    }

    getBreakpoint() {
        const width = window.innerWidth;
        if (width <= 480) return 'mobile';
        if (width <= 768) return 'tablet';
        return 'desktop';
    }

    updateResponsiveLayout() {
        // Update layout based on breakpoint
        if (this.elements.hero) {
            const hero = this.elements.hero;
            
            if (this.currentBreakpoint === 'mobile') {
                hero.style.padding = '60px 15px';
            } else if (this.currentBreakpoint === 'tablet') {
                hero.style.padding = '80px 20px';
            } else {
                hero.style.padding = '150px 60px';
            }
        }
    }

    clearContainer() {
        if (this.container) {
            this.container.remove();
            this.container = null;
        }
        this.elements = {};
        this.isRendered = false;
    }

    destroy() {
        this.clearContainer();
        console.log('🗑️ Landing Page View destroyed');
    }
} 