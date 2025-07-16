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
                        <div class="basedly-logo-container">
                            <h1 class="basedly-logo">BASEDLY</h1>
                        </div>
                    </div>
                    
                    <div class="nav-menu">
                        <a href="#" class="nav-link" data-navigate="home">HOME</a>
                        <a href="#" class="nav-link" data-navigate="discovery">DISCOVERY</a>
                        <a href="#" class="nav-link" data-navigate="deals">DEALS</a>
                        <a href="#" class="nav-link" data-navigate="messages">MESSAGES</a>
                        <a href="#" class="nav-link" data-navigate="social">SOCIAL</a>
                        <a href="#" class="nav-link" data-navigate="photos">📸 PHOTOS</a>
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

            .nav-logo .basedly-logo-container {
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .nav-logo .basedly-logo-container:hover {
                transform: scale(1.05);
            }

            .nav-logo .basedly-logo {
                font-size: 1.8rem !important;
                margin: 0 !important;
                padding: 5px 10px !important;
                background-color: rgba(0,0,0,0.1) !important;
                backdrop-filter: blur(5px) !important;
                border-radius: 8px !important;
            }

            .nav-logo .basedly-logo-container:hover .basedly-logo {
                filter: 
                    drop-shadow(0 8px 16px rgba(255,255,255,0.7)) 
                    drop-shadow(0 0 40px rgba(255,192,203,0.9))
                    drop-shadow(0 0 70px rgba(255,255,255,0.6))
                    brightness(1.3)
                    contrast(1.4) !important;
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
                
                .nav-logo .basedly-logo {
                    font-size: 1.2rem !important;
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
            if (e.target.closest('.basedly-logo-container')) {
                this.navigateToPage('home');
            }
        });
    }

    initializeAnimations() {
        // The global logo animations are already applied via CSS classes
        // Additional GSAP animations can be added here if needed
        if (typeof gsap !== 'undefined') {
            const logo = document.querySelector('.nav-logo .basedly-logo');
            if (logo) {
                // Enhanced hover animation
                logo.addEventListener('mouseenter', () => {
                    gsap.to(logo, {
                        scale: 1.05,
                        duration: 0.3,
                        ease: "back.out(1.7)"
                    });
                });

                logo.addEventListener('mouseleave', () => {
                    gsap.to(logo, {
                        scale: 1,
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