// SocialIconsComponent.js - OOP responsive social icons
class SocialIconsComponent extends ResponsiveBaseComponent {
    constructor(containerId, data = {}) {
        super('SocialIcons', null);
        this.containerId = containerId;
        this.data = {
            platforms: [
                { name: 'instagram', url: '#', color: '#E4405F' },
                { name: 'twitter', url: '#', color: '#1DA1F2' },
                { name: 'facebook', url: '#', color: '#4267B2' },
                { name: 'linkedin', url: '#', color: '#0077B5' },
                { name: 'youtube', url: '#', color: '#FF0000' },
                { name: 'tiktok', url: '#', color: '#000000' }
            ],
            size: 'medium',
            showLabels: false,
            ...data
        };
        this.init();
    }

    init() {
        this.addSocialIconsStyles();
        this.render();
    }

    addSocialIconsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Social Icons Responsive Styles */
            .social-icons-container {
                display: flex;
                gap: clamp(8px, 2vw, 16px);
                margin-top: clamp(16px, 3vw, 20px);
                flex-wrap: wrap;
                justify-content: center;
            }
            
            .social-icon {
                width: clamp(32px, 8vw, 40px);
                height: clamp(32px, 8vw, 40px);
                border-radius: 50%;
                background: var(--lux-dark-gray);
                border: 2px solid var(--lux-beige);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                cursor: pointer;
                text-decoration: none;
                position: relative;
                overflow: hidden;
            }
            
            .social-icon::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: currentColor;
                opacity: 0;
                transition: opacity 0.3s ease;
                border-radius: 50%;
            }
            
            .social-icon:hover::before {
                opacity: 0.1;
            }
            
            .social-icon:hover {
                transform: translateY(-2px) scale(1.05);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
            
            .social-icon svg {
                width: clamp(16px, 4vw, 20px);
                height: clamp(16px, 4vw, 20px);
                fill: var(--lux-beige);
                transition: all 0.3s ease;
                position: relative;
                z-index: 1;
            }
            
            .social-icon:hover svg {
                fill: var(--lux-white);
                transform: scale(1.1);
            }
            
            .social-icon-label {
                position: absolute;
                bottom: -30px;
                left: 50%;
                transform: translateX(-50%);
                background: var(--lux-black);
                color: var(--lux-white);
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                transition: opacity 0.3s ease;
                pointer-events: none;
                border: 1px solid var(--lux-beige);
            }
            
            .social-icon:hover .social-icon-label {
                opacity: 1;
            }
            
            /* Platform-specific colors */
            .social-icon.instagram:hover {
                border-color: #E4405F;
                box-shadow: 0 8px 20px rgba(228, 64, 95, 0.3);
            }
            
            .social-icon.twitter:hover {
                border-color: #1DA1F2;
                box-shadow: 0 8px 20px rgba(29, 161, 242, 0.3);
            }
            
            .social-icon.facebook:hover {
                border-color: #4267B2;
                box-shadow: 0 8px 20px rgba(66, 103, 178, 0.3);
            }
            
            .social-icon.linkedin:hover {
                border-color: #0077B5;
                box-shadow: 0 8px 20px rgba(0, 119, 181, 0.3);
            }
            
            .social-icon.youtube:hover {
                border-color: #FF0000;
                box-shadow: 0 8px 20px rgba(255, 0, 0, 0.3);
            }
            
            .social-icon.tiktok:hover {
                border-color: #000000;
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
            
            /* Responsive adjustments */
            @media (max-width: 480px) {
                .social-icons-container {
                    gap: 12px;
                }
                
                .social-icon {
                    width: 36px;
                    height: 36px;
                }
                
                .social-icon svg {
                    width: 18px;
                    height: 18px;
                }
            }
            
            @media (min-width: 768px) {
                .social-icons-container {
                    gap: 20px;
                }
                
                .social-icon {
                    width: 44px;
                    height: 44px;
                }
                
                .social-icon svg {
                    width: 22px;
                    height: 22px;
                }
            }
            
            @media (min-width: 1024px) {
                .social-icons-container {
                    gap: 24px;
                }
                
                .social-icon {
                    width: 48px;
                    height: 48px;
                }
                
                .social-icon svg {
                    width: 24px;
                    height: 24px;
                }
            }
            
            /* Touch device optimizations */
            .touch-device .social-icon {
                min-height: 44px;
                min-width: 44px;
            }
            
            .touch-device .social-icon:hover {
                transform: none;
            }
            
            .touch-device .social-icon:active {
                transform: scale(0.95);
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container ${this.containerId} not found`);
            return;
        }

        const socialIconsContainer = document.createElement('div');
        socialIconsContainer.className = 'social-icons-container';

        this.data.platforms.forEach(platform => {
            const iconElement = this.createSocialIcon(platform);
            socialIconsContainer.appendChild(iconElement);
        });

        container.appendChild(socialIconsContainer);
        this.element = socialIconsContainer;
        
        if (this.resizeObserver) {
            this.resizeObserver.observe(socialIconsContainer);
        }
    }

    createSocialIcon(platform) {
        const iconLink = document.createElement('a');
        iconLink.href = platform.url;
        iconLink.className = `social-icon ${platform.name}`;
        iconLink.title = platform.name.charAt(0).toUpperCase() + platform.name.slice(1);
        iconLink.style.setProperty('--platform-color', platform.color);

        const svg = this.getSocialIconSVG(platform.name);
        iconLink.innerHTML = svg;

        if (this.data.showLabels) {
            const label = document.createElement('span');
            label.className = 'social-icon-label';
            label.textContent = platform.name.charAt(0).toUpperCase() + platform.name.slice(1);
            iconLink.appendChild(label);
        }

        iconLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.handleSocialClick(platform);
        });

        return iconLink;
    }

    getSocialIconSVG(platform) {
        const icons = {
            instagram: `<svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
            twitter: `<svg viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>`,
            facebook: `<svg viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`,
            linkedin: `<svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
            youtube: `<svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
            tiktok: `<svg viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
        };
        return icons[platform] || '';
    }

    handleSocialClick(platform) {
        console.log(`Social icon clicked: ${platform.name}`);
        if (platform.url !== '#') {
            window.open(platform.url, '_blank', 'noopener,noreferrer');
        }
    }

    updatePlatforms(newPlatforms) {
        this.data.platforms = newPlatforms;
        if (this.element) {
            this.element.remove();
            this.render();
        }
    }

    setShowLabels(show) {
        this.data.showLabels = show;
        if (this.element) {
            this.element.remove();
            this.render();
        }
    }
} 