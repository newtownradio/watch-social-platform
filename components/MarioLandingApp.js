// MarioLandingApp.js - Main application entry point for the Mario-themed Watch app
// Coordinates all MVC components and manages the application lifecycle

class MarioLandingApp {
    constructor() {
        this.landingController = null;
        this.isInitialized = false;
        this.config = {
            debug: true,
            theme: 'mario',
            version: '1.0.0'
        };
    }

    async initialize() {
        try {
            console.log('🎮 Initializing Mario Landing App...');
            
            // Load Google Fonts for Mario theme
            this.loadGoogleFonts();
            
            // Initialize the main landing page controller
            this.landingController = new LandingPageController();
            await this.landingController.init();
            
            // Set up global error handling
            this.setupErrorHandling();
            
            // Set up performance monitoring
            this.setupPerformanceMonitoring();
            
            this.isInitialized = true;
            console.log('✅ Mario Landing App initialized successfully');
            
            // Log app info
            this.logAppInfo();
            
        } catch (error) {
            console.error('❌ Error initializing Mario Landing App:', error);
            this.handleInitializationError(error);
        }
    }

    loadGoogleFonts() {
        // Load Press Start 2P font for Mario theme
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            this.handleError(event.error);
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            this.handleError(event.reason);
        });
    }

    setupPerformanceMonitoring() {
        // Monitor app performance
        if ('performance' in window) {
            window.addEventListener('load', () => {
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                console.log(`🚀 App load time: ${loadTime}ms`);
            });
        }
    }

    handleError(error) {
        console.error('App error:', error);
        
        // In a production app, you might want to send this to an error tracking service
        if (this.config.debug) {
            console.error('Error details:', error);
        }
    }

    handleInitializationError(error) {
        console.error('Failed to initialize app:', error);
        
        // Show fallback content
        this.showFallbackContent();
    }

    showFallbackContent() {
        const fallbackHTML = `
            <div style="
                text-align: center;
                padding: 50px 20px;
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #87CEEB 0%, #98FB98 50%, #FFB6C1 100%);
                min-height: 100vh;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            ">
                <h1 style="color: #FF4500; margin-bottom: 20px;">🎮 Watch</h1>
                <p style="color: #2C3E50; margin-bottom: 30px;">Level Up Socially!</p>
                <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
                    <a href="discovery.html" style="
                        padding: 12px 20px;
                        background: #FF4500;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        border: 3px solid #000;
                        box-shadow: 3px 3px 0px #000;
                    ">🔍 Watch</a>
                    <a href="buysell.html" style="
                        padding: 12px 20px;
                        background: #4169E1;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        border: 3px solid #000;
                        box-shadow: 3px 3px 0px #000;
                    ">💰 Buy/Sell</a>
                    <a href="messages.html" style="
                        padding: 12px 20px;
                        background: #32CD32;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        border: 3px solid #000;
                        box-shadow: 3px 3px 0px #000;
                    ">💬 Messages</a>
                    <a href="account.html" style="
                        padding: 12px 20px;
                        background: #FF69B4;
                        color: white;
                        text-decoration: none;
                        border-radius: 8px;
                        border: 3px solid #000;
                        box-shadow: 3px 3px 0px #000;
                    ">👤 Account</a>
                </div>
                <div style="margin-top: 30px; font-size: 1.5rem;">🍄 ⭐ 🎯 🏆</div>
                <div style="margin-top: 20px; font-size: 0.8rem; color: #2C3E50;">© 2025 Watch</div>
            </div>
        `;
        
        document.body.innerHTML = fallbackHTML;
    }

    logAppInfo() {
        console.log(`
🎮 Watch App Info:
├── Version: ${this.config.version}
├── Theme: ${this.config.theme}
├── Debug: ${this.config.debug}
├── Initialized: ${this.isInitialized}
└── Controller: ${this.landingController ? 'Active' : 'Inactive'}
        `);
    }

    // Public API methods
    getController() {
        return this.landingController;
    }

    getConfig() {
        return { ...this.config };
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        console.log('⚙️ App config updated:', this.config);
    }

    // Utility methods
    isReady() {
        return this.isInitialized && this.landingController && this.landingController.isInitialized;
    }

    getAppState() {
        return {
            initialized: this.isInitialized,
            controller: this.landingController ? this.landingController.getState() : null,
            config: this.config
        };
    }

    destroy() {
        console.log('🗑️ Destroying Mario Landing App...');
        
        if (this.landingController) {
            this.landingController.destroy();
            this.landingController = null;
        }
        
        this.isInitialized = false;
        console.log('✅ Mario Landing App destroyed');
    }
}

// Global app instance
window.marioLandingApp = null;

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎮 DOM ready, initializing Mario Landing App...');
    
    try {
        window.marioLandingApp = new MarioLandingApp();
        await window.marioLandingApp.initialize();
        
        console.log('🎉 Mario Landing App ready!');
        
    } catch (error) {
        console.error('❌ Failed to initialize Mario Landing App:', error);
    }
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MarioLandingApp;
} 