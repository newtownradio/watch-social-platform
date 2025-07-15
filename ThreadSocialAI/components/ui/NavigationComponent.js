// NavigationComponent.js - Navigation bar component
class NavigationComponent extends BaseComponent {
    constructor() {
        super('navigation');
    }

    render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <nav class="navbar">
                <div class="nav-container">
                    <div class="nav-logo">
                        <div class="logo-container">
                            <svg class="basedly-logo" width="40" height="40" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <!-- Blue gradient -->
                                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#4A90E2;stop-opacity:1" />
                                        <stop offset="30%" style="stop-color:#357ABD;stop-opacity:1" />
                                        <stop offset="70%" style="stop-color:#2E5F8A;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#1E3A5F;stop-opacity:1" />
                                    </linearGradient>
                                    
                                    <!-- White gradient -->
                                    <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:1" />
                                        <stop offset="50%" style="stop-color:#F8F9FA;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#E9ECEF;stop-opacity:1" />
                                    </linearGradient>
                                    
                                    <!-- Blue accent gradient -->
                                    <linearGradient id="blueAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#5BA0F2;stop-opacity:1" />
                                        <stop offset="100%" style="stop-color:#4A90E2;stop-opacity:1" />
                                    </linearGradient>
                                    
                                    <!-- Drop shadow -->
                                    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
                                        <feDropShadow dx="3" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.4"/>
                                    </filter>
                                    
                                    <!-- Inner glow -->
                                    <filter id="innerGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                        <feMerge> 
                                            <feMergeNode in="coloredBlur"/>
                                            <feMergeNode in="SourceGraphic"/>
                                        </feMerge>
                                    </filter>
                                    
                                    <!-- Shine effect -->
                                    <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#FFFFFF;stop-opacity:0.8" />
                                        <stop offset="50%" style="stop-color:#FFFFFF;stop-opacity:0.3" />
                                        <stop offset="100%" style="stop-color:#FFFFFF;stop-opacity:0" />
                                    </linearGradient>
                                    
                                    <!-- Wave animation -->
                                    <filter id="waveEffect">
                                        <feTurbulence type="fractalNoise" baseFrequency="0.01 0.01" numOctaves="2" seed="1">
                                            <animate attributeName="baseFrequency" 
                                                     dur="3s" 
                                                     values="0.01 0.01;0.02 0.02;0.01 0.01" 
                                                     repeatCount="indefinite"/>
                                        </feTurbulence>
                                        <feDisplacementMap in="SourceGraphic" scale="5"/>
                                    </filter>
                                </defs>
                                
                                <!-- Background circle with blue gradient -->
                                <circle cx="90" cy="90" r="85" fill="url(#blueGradient)" filter="url(#dropShadow)"/>
                                
                                <!-- Inner white circle -->
                                <circle cx="90" cy="90" r="70" fill="url(#whiteGradient)" filter="url(#innerGlow)"/>
                                
                                <!-- Shine overlay -->
                                <circle cx="90" cy="90" r="70" fill="url(#shine)" opacity="0.6"/>
                                
                                <!-- Letter "B" in blue with wave effect -->
                                <g transform="translate(90, 90)" filter="url(#waveEffect)">
                                    <!-- Main B shape - top curve -->
                                    <path d="M -25 -35 L -25 -15 L -5 -15 L -5 -25 L 15 -25 L 25 -35 L 15 -35 L 15 -25 L -5 -25 L -5 -35 L -25 -35 Z" 
                                          fill="url(#blueAccent)" opacity="0.95"/>
                                    
                                    <!-- Main B shape - bottom curve -->
                                    <path d="M -25 15 L -25 35 L -5 35 L -5 25 L 15 25 L 25 35 L 15 35 L 15 25 L -5 25 L -5 35 L -25 35 Z" 
                                          fill="url(#blueAccent)" opacity="0.95"/>
                                    
                                    <!-- B vertical line -->
                                    <rect x="-25" y="-35" width="8" height="70" fill="url(#blueAccent)" opacity="0.95"/>
                                    
                                    <!-- B crossbar -->
                                    <rect x="-25" y="-8" width="50" height="16" fill="url(#blueAccent)" opacity="0.95" rx="2"/>
                                </g>
                                
                                <!-- Decorative elements -->
                                <circle cx="25" cy="25" r="10" fill="#FFFFFF" opacity="0.4"/>
                                <circle cx="155" cy="25" r="8" fill="#FFFFFF" opacity="0.3"/>
                                <circle cx="25" cy="155" r="8" fill="#FFFFFF" opacity="0.3"/>
                                <circle cx="155" cy="155" r="10" fill="#FFFFFF" opacity="0.4"/>
                                
                                <!-- Subtle border -->
                                <circle cx="90" cy="90" r="88" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.15"/>
                                
                                <!-- Highlight dots -->
                                <circle cx="45" cy="45" r="3" fill="#4A90E2" opacity="0.6"/>
                                <circle cx="135" cy="45" r="2" fill="#4A90E2" opacity="0.5"/>
                                <circle cx="45" cy="135" r="2" fill="#4A90E2" opacity="0.5"/>
                                <circle cx="135" cy="135" r="3" fill="#4A90E2" opacity="0.6"/>
                            </svg>
                            <span class="logo-text">Basedly</span>
                        </div>
                    </div>
                    
                    <div class="nav-menu">
                        <a href="#" class="nav-link" data-navigate="home">HOME</a>
                        <a href="#" class="nav-link" data-navigate="discovery">DISCOVERY</a>
                        <a href="#" class="nav-link" data-navigate="deals">DEALS</a>
                        <a href="#" class="nav-link" data-navigate="messages">MESSAGES</a>
                        <a href="#" class="nav-link" data-navigate="social">SOCIAL</a>
                        <a href="#" class="nav-link" data-navigate="plan">PLAN</a>
                    </div>
                    
                    <div class="nav-actions">
                        <button class="search-btn" onclick="toggleSearch()">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                        </button>
                        <button class="profile-btn">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>
        `;

        this.addStyles();
        this.addEventListeners();
        this.initializeAnimations();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .navbar {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(20px);
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                z-index: 1000;
                padding: 0.5rem 0;
            }

            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2rem;
            }

            .nav-logo {
                display: flex;
                align-items: center;
            }

            .logo-container {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .logo-container:hover {
                transform: scale(1.02);
            }

            .basedly-logo {
                filter: drop-shadow(0 4px 8px rgba(74, 144, 226, 0.3));
                transition: all 0.3s ease;
            }

            .logo-container:hover .basedly-logo {
                filter: drop-shadow(0 6px 12px rgba(74, 144, 226, 0.5));
                transform: rotate(5deg);
            }

            .logo-text {
                font-family: 'Fredoka One', cursive;
                font-weight: 400;
                font-size: 1.8rem;
                background: linear-gradient(135deg, #FFABDF, #FF1493);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                letter-spacing: 1px;
                text-shadow: 
                    0 0 10px rgba(255, 171, 223, 0.5),
                    0 0 20px rgba(255, 171, 223, 0.3),
                    0 0 30px rgba(255, 171, 223, 0.2);
                animation: logoTextFloat 3s ease-in-out infinite;
                position: relative;
            }

            @keyframes logoTextFloat {
                0%, 100% { 
                    transform: translateY(0px) rotate(0deg); 
                    filter: brightness(1) contrast(1);
                }
                25% { 
                    transform: translateY(-2px) rotate(0.5deg); 
                    filter: brightness(1.1) contrast(1.1);
                }
                50% { 
                    transform: translateY(-1px) rotate(-0.3deg); 
                    filter: brightness(1.05) contrast(1.05);
                }
                75% { 
                    transform: translateY(-3px) rotate(0.2deg); 
                    filter: brightness(1.15) contrast(1.15);
                }
            }

            .logo-container:hover .logo-text {
                animation: logoTextBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                filter: 
                    brightness(1.2) 
                    contrast(1.2)
                    drop-shadow(0 0 15px rgba(255, 171, 223, 0.8))
                    drop-shadow(0 0 25px rgba(255, 171, 223, 0.6));
            }

            @keyframes logoTextBounce {
                0%, 100% { 
                    transform: scale(1) rotate(0deg); 
                }
                25% { 
                    transform: scale(1.1) rotate(-1deg); 
                }
                50% { 
                    transform: scale(1.15) rotate(1deg); 
                }
                75% { 
                    transform: scale(1.2) rotate(-0.5deg); 
                }
            }

            .nav-menu {
                display: flex;
                gap: 2rem;
                align-items: center;
            }

            .nav-link {
                text-decoration: none;
                color: #333;
                font-weight: 500;
                font-size: 0.9rem;
                letter-spacing: 1px;
                padding: 0.5rem 1rem;
                border-radius: 8px;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
            }

            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(74, 144, 226, 0.2), transparent);
                transition: left 0.5s ease;
            }

            .nav-link:hover::before {
                left: 100%;
            }

            .nav-link:hover {
                color: #4A90E2;
                background: rgba(74, 144, 226, 0.1);
                transform: translateY(-2px);
            }

            .nav-link.active {
                color: #4A90E2;
                background: rgba(74, 144, 226, 0.15);
                font-weight: 600;
            }

            .nav-actions {
                display: flex;
                gap: 1rem;
                align-items: center;
            }

            .search-btn, .profile-btn {
                background: none;
                border: none;
                padding: 0.5rem;
                border-radius: 8px;
                cursor: pointer;
                color: #666;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .search-btn:hover, .profile-btn:hover {
                background: rgba(74, 144, 226, 0.1);
                color: #4A90E2;
                transform: scale(1.1);
            }

            @media (max-width: 768px) {
                .nav-menu {
                    display: none;
                }
                
                .nav-container {
                    padding: 0 1rem;
                }
                
                .logo-text {
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    addEventListeners() {
        // Navigation event listeners
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-navigate');
                if (page) {
                    this.navigateToPage(page);
                }
            }
        });

        // Logo click event
        document.addEventListener('click', (e) => {
            if (e.target.closest('.logo-container')) {
                this.navigateToPage('home');
            }
        });
    }

    initializeAnimations() {
        // Add GSAP animations for logo wave effect
        if (typeof gsap !== 'undefined') {
            const logo = document.querySelector('.basedly-logo');
            if (logo) {
                // Continuous wave animation
                gsap.to(logo, {
                    rotation: 360,
                    duration: 20,
                    ease: "none",
                    repeat: -1
                });

                // Hover animation
                logo.addEventListener('mouseenter', () => {
                    gsap.to(logo, {
                        scale: 1.1,
                        rotation: "+=10",
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });

                logo.addEventListener('mouseleave', () => {
                    gsap.to(logo, {
                        scale: 1,
                        rotation: "-=10",
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });
            }
        }
    }

    navigateToPage(page) {
        // Update active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-navigate="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Trigger navigation event
        const event = new CustomEvent('navigate', { detail: { page } });
        document.dispatchEvent(event);
    }

    updateActivePage(page) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-navigate="${page}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NavigationComponent;
} 