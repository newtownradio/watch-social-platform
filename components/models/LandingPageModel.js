// LandingPageModel.js - Model for the Mario-themed Watch landing page
// Manages data, state, and business logic

class LandingPageModel {
    constructor() {
        this.currentTab = 'discovery';
        this.pageData = {
            appName: 'Watch',
            tagline: 'Level Up Socially!',
            theme: 'mario',
            tabs: [
                {
                    id: 'discovery',
                    name: 'Watch',
                    icon: '🔍',
                    color: '#FF4500',
                    description: 'Discover amazing content',
                    url: 'discovery.html'
                },
                {
                    id: 'buysell',
                    name: 'Buy/Sell',
                    icon: '💰',
                    color: '#4169E1',
                    description: 'Trade and earn coins',
                    url: 'buysell.html'
                },
                {
                    id: 'messages',
                    name: 'Messages',
                    icon: '💬',
                    color: '#32CD32',
                    description: 'Connect with friends',
                    url: 'messages.html'
                },
                {
                    id: 'account',
                    name: 'Account',
                    icon: '👤',
                    color: '#FF69B4',
                    description: 'Manage your profile',
                    url: 'account.html'
                }
            ],
            marioElements: {
                character: '🎮',
                powerUps: ['🍄', '⭐', '🎯', '🏆'],
                coins: '🪙',
                blocks: '🧱',
                clouds: '☁️'
            },
            animations: {
                enabled: true,
                speed: 'normal',
                effects: ['bounce', 'float', 'slide', 'jump']
            },
            responsive: {
                breakpoints: {
                    mobile: 480,
                    tablet: 768,
                    desktop: 1024
                }
            }
        };
        this.userPreferences = {
            soundEnabled: false,
            animationsEnabled: true,
            theme: 'mario'
        };
    }

    async initialize() {
        console.log('🎮 Initializing Landing Page Model...');
        
        // Load user preferences from localStorage
        this.loadUserPreferences();
        
        // Set up default state
        this.setCurrentTab('discovery');
        
        console.log('✅ Landing Page Model initialized');
    }

    loadUserPreferences() {
        try {
            const saved = localStorage.getItem('watch-user-preferences');
            if (saved) {
                this.userPreferences = { ...this.userPreferences, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Could not load user preferences:', error);
        }
    }

    saveUserPreferences() {
        try {
            localStorage.setItem('watch-user-preferences', JSON.stringify(this.userPreferences));
        } catch (error) {
            console.warn('Could not save user preferences:', error);
        }
    }

    getPageData() {
        return {
            ...this.pageData,
            currentTab: this.currentTab,
            userPreferences: this.userPreferences
        };
    }

    setCurrentTab(tabId) {
        this.currentTab = tabId;
        this.saveUserPreferences();
    }

    getCurrentTab() {
        return this.currentTab;
    }

    getTabData(tabId) {
        return this.pageData.tabs.find(tab => tab.id === tabId);
    }

    getAllTabs() {
        return this.pageData.tabs;
    }

    getMarioElements() {
        return this.pageData.marioElements;
    }

    getAnimations() {
        return this.pageData.animations;
    }

    updateUserPreferences(newPreferences) {
        this.userPreferences = { ...this.userPreferences, ...newPreferences };
        this.saveUserPreferences();
    }

    toggleSound() {
        this.userPreferences.soundEnabled = !this.userPreferences.soundEnabled;
        this.saveUserPreferences();
        return this.userPreferences.soundEnabled;
    }

    toggleAnimations() {
        this.userPreferences.animationsEnabled = !this.userPreferences.animationsEnabled;
        this.saveUserPreferences();
        return this.userPreferences.animationsEnabled;
    }

    getResponsiveBreakpoint() {
        const width = window.innerWidth;
        const breakpoints = this.pageData.responsive.breakpoints;
        
        if (width <= breakpoints.mobile) return 'mobile';
        if (width <= breakpoints.tablet) return 'tablet';
        return 'desktop';
    }

    destroy() {
        this.saveUserPreferences();
        console.log('🗑️ Landing Page Model destroyed');
    }
} 