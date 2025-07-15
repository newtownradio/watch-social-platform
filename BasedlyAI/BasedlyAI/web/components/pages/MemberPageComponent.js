// MemberPageComponent.js - Member profile and settings page
class MemberPageComponent extends BaseComponent {
    constructor(dataManager) {
        super(dataManager);
        this.pageName = 'member';
    }

    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="member-page">
                <div class="member-header">
                    <h1 class="member-title">Profile</h1>
                    <p class="member-subtitle">Manage your account and preferences</p>
                </div>

                <div class="member-content">
                    <div class="profile-section">
                        <h2>Profile Information</h2>
                        <form class="profile-form" data-profile-form>
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" name="username" value="basedly_user" required>
                            </div>
                            <div class="form-group">
                                <label for="email">Email</label>
                                <input type="email" id="email" name="email" value="user@basedly.com" required>
                            </div>
                            <div class="form-group">
                                <label for="location">Location</label>
                                <input type="text" id="location" name="location" value="New York, NY">
                            </div>
                            <button type="submit" class="btn-primary">Update Profile</button>
                        </form>
                    </div>

                    <div class="preferences-section">
                        <h2>Preferences</h2>
                        <div class="preference-item">
                            <label class="toggle-label">
                                <input type="checkbox" id="notifications" checked>
                                <span class="toggle-slider"></span>
                                Email Notifications
                            </label>
                        </div>
                        <div class="preference-item">
                            <label class="toggle-label">
                                <input type="checkbox" id="push-notifications" checked>
                                <span class="toggle-slider"></span>
                                Push Notifications
                            </label>
                        </div>
                        <div class="preference-item">
                            <label class="toggle-label">
                                <input type="checkbox" id="location-sharing">
                                <span class="toggle-slider"></span>
                                Location Sharing
                            </label>
                        </div>
                    </div>

                    <div class="account-section">
                        <h2>Account</h2>
                        <div class="account-actions">
                            <button class="btn-secondary" data-export-data>Export Data</button>
                            <button class="btn-secondary" data-change-password>Change Password</button>
                            <button class="btn-danger" data-delete-account>Delete Account</button>
                        </div>
                    </div>

                    <div class="stats-section">
                        <h2>Your Activity</h2>
                        <div class="activity-stats">
                            <div class="stat">
                                <span class="stat-number">42</span>
                                <span class="stat-label">Deals Found</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">15</span>
                                <span class="stat-label">Trips Created</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">8</span>
                                <span class="stat-label">Friends</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.addStyles();
        this.setupEventListeners();
    }

    addStyles() {
        const styleId = 'member-page-styles';
        if (document.getElementById(styleId)) return;

        const styles = `
            .member-page {
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
            }

            .member-header {
                text-align: center;
                margin-bottom: 40px;
            }

            .member-title {
                font-size: clamp(2rem, 6vw, 3rem);
                font-weight: 900;
                background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 50%, #ffffff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 10px;
            }

            .member-subtitle {
                color: var(--lux-white);
                font-size: 18px;
                opacity: 0.8;
            }

            .member-content {
                display: grid;
                gap: 30px;
            }

            .profile-section, .preferences-section, .account-section, .stats-section {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 30px;
            }

            .profile-section h2, .preferences-section h2, .account-section h2, .stats-section h2 {
                color: var(--lux-hot-pink);
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 20px;
            }

            .form-group {
                margin-bottom: 20px;
            }

            .form-group label {
                display: block;
                color: var(--lux-white);
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
            }

            .form-group input {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.05);
                color: var(--lux-white);
                font-size: 16px;
                transition: all 0.3s ease;
            }

            .form-group input:focus {
                outline: none;
                border-color: var(--lux-hot-pink);
                box-shadow: 0 0 0 3px rgba(255, 20, 147, 0.1);
            }

            .btn-primary, .btn-secondary, .btn-danger {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-right: 10px;
                margin-bottom: 10px;
            }

            .btn-primary {
                background: linear-gradient(135deg, var(--lux-hot-pink) 0%, #ff69b4 100%);
                color: var(--lux-white);
            }

            .btn-secondary {
                background: rgba(255, 255, 255, 0.1);
                color: var(--lux-white);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }

            .btn-danger {
                background: linear-gradient(135deg, #ff4757 0%, #ff3742 100%);
                color: var(--lux-white);
            }

            .btn-primary:hover, .btn-secondary:hover, .btn-danger:hover {
                transform: translateY(-2px);
            }

            .btn-primary:hover {
                box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.2);
            }

            .btn-danger:hover {
                box-shadow: 0 8px 25px rgba(255, 71, 87, 0.4);
            }

            .preference-item {
                margin-bottom: 15px;
            }

            .toggle-label {
                display: flex;
                align-items: center;
                cursor: pointer;
                color: var(--lux-white);
                font-size: 16px;
            }

            .toggle-label input[type="checkbox"] {
                display: none;
            }

            .toggle-slider {
                width: 50px;
                height: 24px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 12px;
                position: relative;
                margin-right: 12px;
                transition: all 0.3s ease;
            }

            .toggle-slider:before {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                background: var(--lux-white);
                border-radius: 50%;
                top: 2px;
                left: 2px;
                transition: all 0.3s ease;
            }

            .toggle-label input[type="checkbox"]:checked + .toggle-slider {
                background: var(--lux-hot-pink);
            }

            .toggle-label input[type="checkbox"]:checked + .toggle-slider:before {
                transform: translateX(26px);
            }

            .account-actions {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
            }

            .activity-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 20px;
            }

            .stat {
                text-align: center;
            }

            .stat-number {
                display: block;
                font-size: 32px;
                font-weight: 900;
                color: var(--lux-hot-pink);
            }

            .stat-label {
                display: block;
                font-size: 14px;
                color: var(--lux-white);
                opacity: 0.7;
                margin-top: 5px;
            }

            @media (max-width: 768px) {
                .member-page {
                    padding: 15px;
                }

                .profile-section, .preferences-section, .account-section, .stats-section {
                    padding: 20px;
                }

                .account-actions {
                    flex-direction: column;
                }

                .btn-primary, .btn-secondary, .btn-danger {
                    width: 100%;
                    margin-right: 0;
                }

                .activity-stats {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }
            }
        `;

        this.injectStyles(styles, styleId);
    }

    setupEventListeners() {
        const profileForm = document.querySelector('[data-profile-form]');
        if (profileForm) {
            profileForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile(new FormData(profileForm));
            });
        }

        const exportBtn = document.querySelector('[data-export-data]');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportUserData();
            });
        }

        const changePasswordBtn = document.querySelector('[data-change-password]');
        if (changePasswordBtn) {
            changePasswordBtn.addEventListener('click', () => {
                this.changePassword();
            });
        }

        const deleteAccountBtn = document.querySelector('[data-delete-account]');
        if (deleteAccountBtn) {
            deleteAccountBtn.addEventListener('click', () => {
                this.deleteAccount();
            });
        }
    }

    updateProfile(formData) {
        console.log('Updating profile...', Object.fromEntries(formData));
        alert('Profile updated successfully!');
    }

    exportUserData() {
        console.log('Exporting user data...');
        alert('Data export feature coming soon!');
    }

    changePassword() {
        console.log('Changing password...');
        alert('Password change feature coming soon!');
    }

    deleteAccount() {
        if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            console.log('Deleting account...');
            alert('Account deletion feature coming soon!');
        }
    }
} 