// Base class for all pages
class BasePage {
    constructor(pageName) {
        this.pageName = pageName;
        this.isInitialized = false;
        this.authManager = null;
        this.dataManager = null;
        this.uiManager = null;
        
        this.init();
    }
    
    init() {
        this.setupAuthManager();
        this.setupDataManager();
        this.setupUIManager();
        this.setupEventListeners();
        this.onPageLoad();
        this.isInitialized = true;
    }
    
    setupAuthManager() {
        if (window.authManager) {
            this.authManager = window.authManager;
            this.authManager.updateAuthUI();
        }
    }
    
    setupDataManager() {
        this.dataManager = new DataManager();
    }
    
    setupUIManager() {
        this.uiManager = new UIManager();
    }
    
    setupEventListeners() {
        this.setupNavigationListeners();
        this.setupMobileMenuListeners();
    }
    
    setupNavigationListeners() {
        document.querySelectorAll('[onclick*="navigateTo"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    window.location.href = href;
                }
            });
        });
    }
    
    setupMobileMenuListeners() {
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const mobileMenu = document.querySelector('.mobile-menu');
        
        if (hamburgerBtn && mobileMenu) {
            hamburgerBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
            });
        }
    }
    
    onPageLoad() {
        console.log(`${this.pageName} page loaded`);
    }
    
    showNotification(message, type = 'info') {
        this.uiManager.showNotification(message, type);
    }
    
    navigateTo(page) {
        window.location.href = `${page}.html`;
    }
}

// Data management class
class DataManager {
    constructor() {
        this.cache = new Map();
        this.storage = window.localStorage;
    }
    
    get(key) {
        const cached = this.cache.get(key);
        if (cached !== undefined) return cached;
        
        const stored = this.storage.getItem(key);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch (e) {
                return stored;
            }
        }
        return null;
    }
    
    set(key, value) {
        this.cache.set(key, value);
        this.storage.setItem(key, JSON.stringify(value));
    }
    
    remove(key) {
        this.cache.delete(key);
        this.storage.removeItem(key);
    }
    
    clear() {
        this.cache.clear();
        this.storage.clear();
    }
}

// UI management class
class UIManager {
    constructor() {
        this.notifications = [];
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: var(--lux-black); border: 2px solid var(--lux-hot-pink); color: var(--lux-white); padding: 16px; z-index: 10000; max-width: 300px; border-radius: 8px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 18px;">${this.getIcon(type)}</span>
                    <span>${message}</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    getIcon(type) {
        switch (type) {
            case 'success': return '✅';
            case 'error': return '❌';
            case 'warning': return '⚠️';
            default: return 'ℹ️';
        }
    }
    
    showLoading(show = true) {
        const loader = document.getElementById('loading-overlay');
        if (loader) {
            loader.style.display = show ? 'flex' : 'none';
        }
    }
    
    updateButtonState(button, loading = false, disabled = false) {
        if (loading) {
            button.disabled = true;
            button.innerHTML = '⌚ Loading...';
        } else if (disabled) {
            button.disabled = true;
        } else {
            button.disabled = false;
        }
    }
} 