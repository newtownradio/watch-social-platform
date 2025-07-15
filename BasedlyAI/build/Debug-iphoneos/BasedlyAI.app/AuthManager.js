// AuthManager.js - Global authentication management
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check for existing session
        const savedUser = localStorage.getItem('basedlyUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.isAuthenticated = true;
            } catch (e) {
                this.logout();
            }
        }
        
        // Update UI based on auth state
        this.updateAuthUI();
    }

    login(email, password) {
        // Simulate authentication
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simple validation
                if (email && password) {
                    this.currentUser = {
                        id: Date.now(),
                        email: email,
                        name: email.split('@')[0],
                        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=FFABDF&color=000`,
                        joinDate: new Date().toISOString(),
                        preferences: {
                            categories: ['luxury_fashion', 'streetwear'],
                            budget: '1000-5000',
                            style: 'modern'
                        }
                    };
                    
                    this.isAuthenticated = true;
                    localStorage.setItem('basedlyUser', JSON.stringify(this.currentUser));
                    this.updateAuthUI();
                    resolve(this.currentUser);
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('basedlyUser');
        this.updateAuthUI();
        
        // Redirect to home page
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') {
            window.location.href = '/';
        }
    }

    getCurrentUser() {
        return this.currentUser;
    }

    isLoggedIn() {
        return this.isAuthenticated;
    }

    updateAuthUI() {
        // Update navigation auth buttons
        const authButtons = document.querySelectorAll('.auth-button');
        const userMenus = document.querySelectorAll('.user-menu');
        const signInButtons = document.querySelectorAll('.sign-in-button');
        const signOutButtons = document.querySelectorAll('.sign-out-button');
        const userAvatars = document.querySelectorAll('.user-avatar');

        if (this.isAuthenticated) {
            // Show user menu and sign out
            authButtons.forEach(btn => {
                btn.style.display = 'none';
            });
            
            userMenus.forEach(menu => {
                menu.style.display = 'flex';
            });
            
            signOutButtons.forEach(btn => {
                btn.style.display = 'block';
            });
            
            signInButtons.forEach(btn => {
                btn.style.display = 'none';
            });
            
            userAvatars.forEach(avatar => {
                avatar.style.display = 'block';
                if (this.currentUser) {
                    avatar.innerHTML = `
                        <img src="${this.currentUser.avatar}" alt="${this.currentUser.name}" 
                             style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid var(--lux-hot-pink);">
                    `;
                }
            });
        } else {
            // Show sign in button
            authButtons.forEach(btn => {
                btn.style.display = 'block';
            });
            
            userMenus.forEach(menu => {
                menu.style.display = 'none';
            });
            
            signOutButtons.forEach(btn => {
                btn.style.display = 'none';
            });
            
            signInButtons.forEach(btn => {
                btn.style.display = 'block';
            });
            
            userAvatars.forEach(avatar => {
                avatar.style.display = 'none';
            });
        }
    }

    // Navigation functions
    navigateToLogin() {
        window.location.href = 'login.html';
    }

    navigateToSignup() {
        window.location.href = 'signup.html';
    }

    navigateToProfile() {
        if (this.isAuthenticated) {
            window.location.href = 'member.html';
        } else {
            this.navigateToLogin();
        }
    }
}

// Global auth instance
window.authManager = new AuthManager();

// Global auth functions for HTML onclick handlers
window.signIn = () => window.authManager.navigateToLogin();
window.signOut = () => window.authManager.logout();
window.navigateToProfile = () => window.authManager.navigateToProfile();
window.navigateToSignup = () => window.authManager.navigateToSignup(); 