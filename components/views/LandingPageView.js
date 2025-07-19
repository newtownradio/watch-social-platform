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
                /* Mobile touch improvements */
                -webkit-tap-highlight-color: transparent;
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                touch-action: manipulation;
                min-height: 44px; /* iOS minimum touch target */
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

            .cta-button.mario-primary { 
                background: linear-gradient(45deg, #FF4500, #FF6347);
                color: white;
                font-size: clamp(1rem, 3vw, 1.3rem);
                padding: clamp(16px, 4vw, 24px) clamp(32px, 6vw, 48px);
                border: 4px solid #000;
                box-shadow: 6px 6px 0px #000;
                text-shadow: 2px 2px 0px #000;
                position: relative;
                overflow: hidden;

            }
            

            
            .cta-button.mario-primary::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: left 0.8s;
            }
            
            .cta-button.mario-primary:hover::before {
                left: 100%;
            }
            
            .cta-button.mario-primary:hover {
                transform: translateY(-4px) scale(1.02);
                box-shadow: 8px 8px 0px #000;
            }
            
            .cta-button.mario-primary:active {
                transform: translateY(-2px) scale(0.98);
                box-shadow: 4px 4px 0px #000;
            }

            .cta-button:hover {
                transform: translateY(-3px);
                box-shadow: 5px 5px 0px #000;
            }

            .cta-button:active {
                transform: translateY(-1px);
                box-shadow: 2px 2px 0px #000;
            }
            
            .login-form {
                display: flex;
                flex-direction: column;
                gap: 15px;
                max-width: 300px;
                margin: 0 auto;
            }
            
            .mario-input {
                width: 100%;
                padding: 12px;
                border: 3px solid #000;
                border-radius: 8px;
                font-family: 'Press Start 2P', cursive;
                font-size: 0.8rem;
                background: white;
                box-shadow: 3px 3px 0px #000;
                color: #2C3E50;
            }
            
            .mario-input:focus {
                outline: none;
                border-color: #FF4500;
                box-shadow: 3px 3px 0px #FF4500;
            }
            
            .mario-input::placeholder {
                color: #95A5A6;
            }
            
            .error-message {
                color: #E74C3C;
                font-size: 0.7rem;
                text-align: center;
                margin-top: 10px;
                padding: 8px;
                background: rgba(231, 76, 60, 0.1);
                border-radius: 4px;
                border: 1px solid #E74C3C;
                display: none;
            }
            
            .success-message {
                color: #27AE60;
                font-size: 0.7rem;
                text-align: center;
                margin-top: 10px;
                padding: 8px;
                background: rgba(39, 174, 96, 0.1);
                border-radius: 4px;
                border: 1px solid #27AE60;
                display: none;
            }
            
            .reset-password-link {
                color: #3498DB;
                font-size: 0.6rem;
                text-decoration: underline;
                cursor: pointer;
                margin-top: 5px;
                display: block;
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

            /* Comprehensive Responsive Design for All Devices */
            
            /* iPhone SE, iPhone 6/7/8, iPhone X/XS/11 Pro */
            @media screen and (max-width: 375px) {
                .hero { 
                    padding: 40px 10px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(1.8rem, 8vw, 2.2rem); 
                    margin-bottom: 20px;
                }
                .hero p { 
                    font-size: clamp(0.9rem, 3vw, 1rem); 
                    margin-bottom: 30px;
                }
                .mario-character { 
                    font-size: clamp(2.5rem, 10vw, 3rem); 
                    margin: 15px 0;
                }
                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                    margin-top: 30px;
                }
                .cta-button.mario-primary {
                    width: 100%;
                    max-width: 300px;
                    text-align: center;
                    padding: 18px 32px;
                    font-size: 1.1rem;
                }
                .mario-elements {
                    font-size: clamp(1.2rem, 4vw, 1.5rem);
                    bottom: 15px;
                }
                .footer {
                    font-size: 0.6rem;
                    bottom: 5px;
                }
            }

            /* iPhone 6/7/8 Plus, iPhone XR/11, iPhone 12/13/14 */
            @media screen and (min-width: 376px) and (max-width: 428px) {
                .hero { 
                    padding: 50px 15px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(2rem, 8vw, 2.5rem); 
                    margin-bottom: 25px;
                }
                .hero p { 
                    font-size: clamp(1rem, 3vw, 1.1rem); 
                    margin-bottom: 35px;
                }
                .mario-character { 
                    font-size: clamp(3rem, 10vw, 3.5rem); 
                    margin: 20px 0;
                }
                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                    margin-top: 35px;
                }
                .cta-button.mario-primary {
                    width: 100%;
                    max-width: 320px;
                    text-align: center;
                    padding: 20px 36px;
                    font-size: 1.2rem;
                }
                .mario-elements {
                    font-size: clamp(1.5rem, 4vw, 1.8rem);
                    bottom: 20px;
                }
            }

            /* iPhone 12/13/14 Pro Max, iPhone 15 Plus */
            @media screen and (min-width: 429px) and (max-width: 480px) {
                .hero { 
                    padding: 60px 20px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(2.2rem, 8vw, 2.8rem); 
                    margin-bottom: 30px;
                }
                .hero p { 
                    font-size: clamp(1.1rem, 3vw, 1.2rem); 
                    margin-bottom: 40px;
                }
                .mario-character { 
                    font-size: clamp(3.5rem, 10vw, 4rem); 
                    margin: 25px 0;
                }
                .cta-buttons {
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    margin-top: 40px;
                }
                .cta-button {
                    width: 100%;
                    max-width: 300px;
                    text-align: center;
                    padding: 18px 28px;
                    font-size: 1.1rem;
                }
            }

            /* iPad Mini, Small Tablets */
            @media screen and (min-width: 481px) and (max-width: 768px) {
                .hero { 
                    padding: 80px 30px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(2.5rem, 8vw, 3.2rem); 
                    margin-bottom: 35px;
                }
                .hero p { 
                    font-size: clamp(1.2rem, 3vw, 1.4rem); 
                    margin-bottom: 45px;
                }
                .mario-character { 
                    font-size: clamp(4rem, 10vw, 4.5rem); 
                    margin: 30px 0;
                }
                .cta-buttons {
                    flex-direction: row;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 20px;
                    margin-top: 45px;
                }
                .cta-button {
                    min-width: 140px;
                    padding: 18px 24px;
                    font-size: 1rem;
                }
            }

            /* iPad, iPad Air, iPad Pro 11" */
            @media screen and (min-width: 769px) and (max-width: 1024px) {
                .hero { 
                    padding: 120px 50px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(3rem, 8vw, 3.8rem); 
                    margin-bottom: 40px;
                }
                .hero p { 
                    font-size: clamp(1.4rem, 3vw, 1.6rem); 
                    margin-bottom: 50px;
                }
                .mario-character { 
                    font-size: clamp(4.5rem, 10vw, 5rem); 
                    margin: 35px 0;
                }
                .cta-buttons {
                    gap: 25px;
                    margin-top: 50px;
                }
                .cta-button {
                    min-width: 160px;
                    padding: 20px 30px;
                    font-size: 1.1rem;
                }
            }

            /* iPad Pro 12.9", Small Laptops */
            @media screen and (min-width: 1025px) and (max-width: 1366px) {
                .hero { 
                    padding: 150px 80px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(3.5rem, 8vw, 4.2rem); 
                    margin-bottom: 45px;
                }
                .hero p { 
                    font-size: clamp(1.6rem, 3vw, 1.8rem); 
                    margin-bottom: 55px;
                }
                .mario-character { 
                    font-size: clamp(5rem, 10vw, 5.5rem); 
                    margin: 40px 0;
                }
                .cta-buttons {
                    gap: 30px;
                    margin-top: 55px;
                }
                .cta-button {
                    min-width: 180px;
                    padding: 22px 35px;
                    font-size: 1.2rem;
                }
            }

            /* Desktop, Large Laptops */
            @media screen and (min-width: 1367px) and (max-width: 1920px) {
                .hero { 
                    padding: 180px 120px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(4rem, 8vw, 4.8rem); 
                    margin-bottom: 50px;
                }
                .hero p { 
                    font-size: clamp(1.8rem, 3vw, 2rem); 
                    margin-bottom: 60px;
                }
                .mario-character { 
                    font-size: clamp(5.5rem, 10vw, 6rem); 
                    margin: 45px 0;
                }
                .cta-buttons {
                    gap: 35px;
                    margin-top: 60px;
                }
                .cta-button {
                    min-width: 200px;
                    padding: 25px 40px;
                    font-size: 1.3rem;
                }
            }

            /* 4K, Ultra-wide, Large Displays */
            @media screen and (min-width: 1921px) {
                .hero { 
                    padding: 220px 160px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(4.5rem, 8vw, 5.5rem); 
                    margin-bottom: 60px;
                }
                .hero p { 
                    font-size: clamp(2rem, 3vw, 2.4rem); 
                    margin-bottom: 70px;
                }
                .mario-character { 
                    font-size: clamp(6rem, 10vw, 7rem); 
                    margin: 50px 0;
                }
                .cta-buttons {
                    gap: 40px;
                    margin-top: 70px;
                }
                .cta-button {
                    min-width: 220px;
                    padding: 28px 45px;
                    font-size: 1.4rem;
                }
            }

            /* Vision Pro and AR/VR Devices */
            @media screen and (min-width: 2000px) and (min-height: 2000px) {
                .hero { 
                    padding: 300px 200px; 
                    min-height: 100vh;
                }
                .hero h1 { 
                    font-size: clamp(5rem, 8vw, 6rem); 
                    margin-bottom: 70px;
                }
                .hero p { 
                    font-size: clamp(2.2rem, 3vw, 2.6rem); 
                    margin-bottom: 80px;
                }
                .mario-character { 
                    font-size: clamp(7rem, 10vw, 8rem); 
                    margin: 60px 0;
                }
                .cta-buttons {
                    gap: 45px;
                    margin-top: 80px;
                }
                .cta-button {
                    min-width: 250px;
                    padding: 32px 50px;
                    font-size: 1.6rem;
                    border-width: 4px;
                    box-shadow: 4px 4px 0px #000;
                }
                .cta-button:hover {
                    transform: translateY(-4px);
                    box-shadow: 6px 6px 0px #000;
                }
            }

            /* Landscape orientation adjustments for mobile */
            @media screen and (orientation: landscape) and (max-height: 500px) {
                .hero { 
                    padding: 30px 20px; 
                    min-height: 100vh;
                }
                .mario-character { 
                    font-size: clamp(2rem, 6vw, 2.5rem); 
                    margin: 10px 0;
                }
                .hero h1 { 
                    font-size: clamp(1.5rem, 6vw, 2rem); 
                    margin-bottom: 15px;
                }
                .hero p { 
                    font-size: clamp(0.9rem, 3vw, 1rem); 
                    margin-bottom: 20px;
                }
                .cta-buttons {
                    flex-direction: row;
                    flex-wrap: wrap;
                    gap: 10px;
                    margin-top: 20px;
                }
                .cta-button {
                    min-width: 120px;
                    padding: 12px 18px;
                    font-size: 0.9rem;
                }
                .mario-elements {
                    font-size: clamp(1rem, 3vw, 1.2rem);
                    bottom: 10px;
                }
                .footer {
                    font-size: 0.6rem;
                    bottom: 5px;
                }
            }

            /* Touch device optimizations */
            @media (hover: none) and (pointer: coarse) {
                .cta-button:hover { 
                    transform: none; 
                }
                .cta-button:active {
                    transform: translateY(-2px);
                    box-shadow: 3px 3px 0px #000;
                }
                .cta-button {
                    -webkit-tap-highlight-color: transparent;
                    touch-action: manipulation;
                }
            }

            /* High DPI displays */
            @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                .cta-button {
                    border-width: 2px;
                }
                .hero h1 {
                    text-shadow: 2px 2px 0px #FFD700, 4px 4px 0px #FF6347;
                }
            }

            /* Reduced motion preferences */
            @media (prefers-reduced-motion: reduce) {
                .mario-character,
                .hero h1,
                .clouds,
                .mario-elements {
                    animation: none;
                }
                .cta-button {
                    transition: none;
                }
            }

            /* Dark mode support */
            @media (prefers-color-scheme: dark) {
                .mario-world {
                    background: 
                        radial-gradient(circle at 20% 80%, #FFD700 0%, transparent 50%),
                        radial-gradient(circle at 80% 20%, #FF69B4 0%, transparent 50%),
                        linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #8E44AD 100%);
                }
                .hero p {
                    color: #ECF0F1;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
                }
                .footer {
                    color: #ECF0F1;
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
        
        // Add direct event listeners to buttons
        this.setupButtonEventListeners();
        
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
                
                
                <div class="cta-buttons">
                    <div class="login-form">
                        <input type="email" class="mario-input" id="email" placeholder="Email">
                        <input type="password" class="mario-input" id="password" placeholder="Password">
                        <button class="cta-button mario-primary" id="login-btn" data-cta-action="login">
                            🎮 LOGIN
                        </button>
                        <div class="error-message" id="error-message"></div>
                        <div class="success-message" id="success-message"></div>
                        <span class="reset-password-link" id="reset-password-link">Forgot password? Reset it here</span>
                    </div>
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
        const height = window.innerHeight;
        
        // Vision Pro and AR/VR Devices
        if (width >= 2000 && height >= 2000) return 'vision-pro';
        
        // 4K and Ultra-wide displays
        if (width >= 1921) return '4k';
        
        // Desktop and Large Laptops
        if (width >= 1367) return 'desktop';
        
        // iPad Pro 12.9" and Small Laptops
        if (width >= 1025) return 'ipad-pro';
        
        // iPad, iPad Air, iPad Pro 11"
        if (width >= 769) return 'ipad';
        
        // iPad Mini and Small Tablets
        if (width >= 481) return 'tablet';
        
        // iPhone 12/13/14 Pro Max, iPhone 15 Plus
        if (width >= 429) return 'iphone-plus';
        
        // iPhone 6/7/8 Plus, iPhone XR/11, iPhone 12/13/14
        if (width >= 376) return 'iphone';
        
        // iPhone SE, iPhone 6/7/8, iPhone X/XS/11 Pro
        return 'iphone-se';
    }

    updateResponsiveLayout() {
        // Update layout based on breakpoint
        if (this.elements.hero) {
            const hero = this.elements.hero;
            const breakpoint = this.currentBreakpoint;
            
            switch (breakpoint) {
                case 'iphone-se':
                    hero.style.padding = '40px 10px';
                    break;
                case 'iphone':
                    hero.style.padding = '50px 15px';
                    break;
                case 'iphone-plus':
                    hero.style.padding = '60px 20px';
                    break;
                case 'tablet':
                    hero.style.padding = '80px 30px';
                    break;
                case 'ipad':
                    hero.style.padding = '120px 50px';
                    break;
                case 'ipad-pro':
                    hero.style.padding = '150px 80px';
                    break;
                case 'desktop':
                    hero.style.padding = '180px 120px';
                    break;
                case '4k':
                    hero.style.padding = '220px 160px';
                    break;
                case 'vision-pro':
                    hero.style.padding = '300px 200px';
                    break;
                default:
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

    setupButtonEventListeners() {
        // Add click event listeners to all CTA buttons
        this.elements.ctaButtons.forEach(button => {
            // Click event
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleButtonClick(button);
            });
            
            // Special handling for login button
            if (button.id === 'login-btn') {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleLogin();
                });
            }
            
            // Touch events for mobile - improved for iPhone
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                e.stopPropagation();
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '4px 4px 0px #000';
                button.style.opacity = '0.8';
            }, { passive: false });
            
            button.addEventListener('touchmove', (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, { passive: false });
            
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                e.stopPropagation();
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '3px 3px 0px #000';
                button.style.opacity = '1';
                this.handleButtonClick(button);
            }, { passive: false });
            
            // Keyboard accessibility
            button.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleButtonClick(button);
                }
            });
            
            // Mouse events for desktop
            button.addEventListener('mousedown', (e) => {
                e.preventDefault();
                button.style.transform = 'translateY(-1px)';
                button.style.boxShadow = '2px 2px 0px #000';
            });
            
            button.addEventListener('mouseup', (e) => {
                e.preventDefault();
                button.style.transform = '';
                button.style.boxShadow = '';
            });
            
            button.addEventListener('mouseleave', (e) => {
                e.preventDefault();
                button.style.transform = '';
                button.style.boxShadow = '';
                button.style.opacity = '1';
            });
        });
        
        console.log('✅ Button event listeners set up for mobile and desktop');
    }
    
    handleButtonClick(button) {
        const action = button.getAttribute('data-cta-action');
        const tabNavigation = button.getAttribute('data-tab-navigation');
        
        console.log(`🎮 Button clicked: ${action} -> ${tabNavigation}`);
        
        // Add visual feedback
        button.style.transform = 'translateY(-1px)';
        button.style.boxShadow = '2px 2px 0px #000';
        
        // Reset after animation
        setTimeout(() => {
            button.style.transform = '';
            button.style.boxShadow = '';
        }, 150);
        
        // Navigate to the appropriate page with multiple fallbacks
        if (tabNavigation) {
            // Small delay to show the button press effect
            setTimeout(() => {
                try {
                    // Try MVC navigation first
                    if (window.marioLandingApp && window.marioLandingApp.getController()) {
                        const controller = window.marioLandingApp.getController();
                        if (controller && controller.navigateToTab) {
                            controller.navigateToTab(tabNavigation);
                            return;
                        }
                    }
                    
                    // Fallback to direct navigation
                    console.log(`🌐 Navigating to: ${tabNavigation}.html`);
                    window.location.href = `${tabNavigation}.html`;
                    
                } catch (error) {
                    console.error('Navigation error:', error);
                    
                    // Final fallback
                    try {
                        window.location = `${tabNavigation}.html`;
                    } catch (finalError) {
                        console.error('Final navigation fallback failed:', finalError);
                        // Show error message
                        alert(`Navigation failed. Please try clicking the ${tabNavigation} button again.`);
                    }
                }
            }, 100);
        }
    }
    
    handleLogin() {
        const email = document.getElementById('email')?.value;
        const password = document.getElementById('password')?.value;
        const errorMessage = document.getElementById('error-message');
        const successMessage = document.getElementById('success-message');
        
        // Hide previous messages
        if (errorMessage) errorMessage.style.display = 'none';
        if (successMessage) successMessage.style.display = 'none';
        
        // Validate inputs
        if (!email || !password) {
            this.showError('Please enter both email and password');
            return;
        }
        
        if (!email.includes('@')) {
            this.showError('Please enter a valid email address');
            return;
        }
        
        // Simple authentication (demo purposes)
        // In a real app, this would call an API
        if (email === 'demo@watch.com' && password === 'password123') {
            this.showSuccess('Login successful! Redirecting...');
            setTimeout(() => {
                window.location.href = 'discovery.html';
            }, 1500);
        } else {
            this.showError('Invalid email or password. Please try again or reset your password.');
        }
    }
    
    showError(message) {
        const errorMessage = document.getElementById('error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }
    }
    
    showSuccess(message) {
        const successMessage = document.getElementById('success-message');
        if (successMessage) {
            successMessage.textContent = message;
            successMessage.style.display = 'block';
        }
    }

    destroy() {
        this.clearContainer();
        console.log('🗑️ Landing Page View destroyed');
    }
} 