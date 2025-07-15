// SocialPageComponent.js - Social features and community page
class SocialPageComponent extends BaseComponent {
    constructor(dataManager) {
        super(dataManager);
        this.pageName = 'social';
    }

    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="social-page">
                <div class="social-header">
                    <h1 class="social-title">Social</h1>
                    <p class="social-subtitle">Connect with other shoppers and share your finds</p>
                </div>

                <div class="social-content">
                    <div class="social-section">
                        <h2>Create Shopping Trip</h2>
                        <p>Plan your next shopping adventure with friends</p>
                        <button class="btn-primary" data-create-trip>Create Trip</button>
                    </div>

                    <div class="social-section">
                        <h2>Events</h2>
                        <p>Discover shopping events and meetups</p>
                        <button class="btn-secondary" data-view-events>View Events</button>
                    </div>

                    <div class="social-section">
                        <h2>Community</h2>
                        <p>Join the Basedly community</p>
                        <div class="community-stats">
                            <div class="stat">
                                <span class="stat-number">1,234</span>
                                <span class="stat-label">Members</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">567</span>
                                <span class="stat-label">Trips</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">890</span>
                                <span class="stat-label">Deals Shared</span>
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
        const styleId = 'social-page-styles';
        if (document.getElementById(styleId)) return;

        const styles = `
            .social-page {
                padding: 20px;
                max-width: 800px;
                margin: 0 auto;
            }

            .social-header {
                text-align: center;
                margin-bottom: 40px;
            }

            .social-title {
                font-size: clamp(2rem, 6vw, 3rem);
                font-weight: 900;
                background: linear-gradient(135deg, #ffffff 0%, #ffc0cb 50%, #ffffff 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 10px;
            }

            .social-subtitle {
                color: var(--lux-white);
                font-size: 18px;
                opacity: 0.8;
            }

            .social-content {
                display: grid;
                gap: 30px;
            }

            .social-section {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 30px;
                text-align: center;
            }

            .social-section h2 {
                color: var(--lux-hot-pink);
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 10px;
            }

            .social-section p {
                color: var(--lux-white);
                font-size: 16px;
                margin-bottom: 20px;
                opacity: 0.8;
            }

            .btn-primary, .btn-secondary {
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
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

            .btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(255, 20, 147, 0.4);
            }

            .btn-secondary:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-2px);
            }

            .community-stats {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 20px;
                margin-top: 20px;
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
                .social-page {
                    padding: 15px;
                }

                .social-section {
                    padding: 20px;
                }

                .community-stats {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                }
            }
        `;

        this.injectStyles(styles, styleId);
    }

    setupEventListeners() {
        const createTripBtn = document.querySelector('[data-create-trip]');
        if (createTripBtn) {
            createTripBtn.addEventListener('click', () => {
                this.createShoppingTrip();
            });
        }

        const viewEventsBtn = document.querySelector('[data-view-events]');
        if (viewEventsBtn) {
            viewEventsBtn.addEventListener('click', () => {
                this.viewAllEvents();
            });
        }
    }

    createShoppingTrip() {
        console.log('Creating shopping trip...');
        // Implementation for creating shopping trip
        alert('Shopping trip creation feature coming soon!');
    }

    viewAllEvents() {
        console.log('Viewing all events...');
        // Implementation for viewing events
        alert('Events feature coming soon!');
    }
} 