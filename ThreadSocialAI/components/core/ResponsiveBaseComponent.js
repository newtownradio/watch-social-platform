// ResponsiveBaseComponent.js - Enhanced base class with responsive features
class ResponsiveBaseComponent extends BaseComponent {
    constructor(name, dataManager = null) {
        super(name, dataManager);
        this.breakpoints = {
            mobile: 480,
            tablet: 768,
            desktop: 1024,
            large: 1200
        };
        this.currentBreakpoint = this.getCurrentBreakpoint();
        this.resizeObserver = null;
        this.initResponsive();
    }

    initResponsive() {
        this.addResponsiveStyles();
        this.setupResizeObserver();
        this.addTouchSupport();
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < this.breakpoints.mobile) return 'mobile';
        if (width < this.breakpoints.tablet) return 'tablet';
        if (width < this.breakpoints.desktop) return 'desktop';
        return 'large';
    }

    setupResizeObserver() {
        this.resizeObserver = new ResizeObserver(entries => {
            const newBreakpoint = this.getCurrentBreakpoint();
            if (newBreakpoint !== this.currentBreakpoint) {
                this.currentBreakpoint = newBreakpoint;
                this.onBreakpointChange(newBreakpoint);
            }
        });
        
        if (this.element) {
            this.resizeObserver.observe(this.element);
        }
    }

    onBreakpointChange(newBreakpoint) {
        console.log(`${this.name} breakpoint changed to: ${newBreakpoint}`);
    }

    addTouchSupport() {
        if ('ontouchstart' in window) {
            document.documentElement.classList.add('touch-device');
        }
    }

    addResponsiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Responsive Base Styles */
            .responsive-container {
                width: 100%;
                max-width: 100%;
                box-sizing: border-box;
            }
            
            /* Mobile First Approach */
            .mobile-hidden { display: none; }
            .tablet-hidden { display: none; }
            .desktop-hidden { display: none; }
            
            /* Responsive Grid System */
            .responsive-grid {
                display: grid;
                gap: 16px;
                grid-template-columns: 1fr;
            }
            
            /* Touch Device Optimizations */
            .touch-device .clickable {
                min-height: 44px;
                min-width: 44px;
            }
            
            /* Responsive Typography */
            .responsive-text {
                font-size: clamp(14px, 4vw, 18px);
                line-height: 1.4;
            }
            
            .responsive-title {
                font-size: clamp(24px, 6vw, 48px);
                line-height: 1.2;
            }
            
            /* Responsive Spacing */
            .responsive-padding {
                padding: clamp(16px, 4vw, 32px);
            }
            
            .responsive-margin {
                margin: clamp(16px, 4vw, 32px);
            }
            
            /* Tablet Styles */
            @media (min-width: 768px) {
                .mobile-hidden { display: block; }
                .responsive-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 24px;
                }
            }
            
            /* Desktop Styles */
            @media (min-width: 1024px) {
                .tablet-hidden { display: block; }
                .responsive-grid {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 32px;
                }
            }
            
            /* Large Desktop Styles */
            @media (min-width: 1200px) {
                .desktop-hidden { display: block; }
                .responsive-grid {
                    grid-template-columns: repeat(4, 1fr);
                    gap: 40px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    destroy() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        super.destroy();
    }
} 