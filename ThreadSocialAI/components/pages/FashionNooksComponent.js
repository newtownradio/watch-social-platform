class FashionNooksComponent extends BaseComponent {
    constructor() {
        super('FashionNooks');
        this.nooks = [];
        this.currentCategory = 'all';
        this.currentView = 'grid'; // 'grid' or 'masonry'
        this.isUploading = false;
        this.userCollections = [];
    }

    async initialize() {
        await this.loadFashionNooks();
        this.setupEventListeners();
        this.render();
    }

    async loadFashionNooks() {
        // Simulate loading fashion nooks from a data source
        this.nooks = [
            {
                id: 1,
                userId: 'fashionista1',
                username: 'StyleQueen',
                imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop',
                title: 'Vintage Chanel Vibes',
                description: 'Found this stunning vintage Chanel bag at the Basedly pop-up! The craftsmanship is incredible. #vintage #chanel #luxury',
                category: 'accessories',
                tags: ['vintage', 'chanel', 'luxury', 'handbag'],
                likes: 124,
                saves: 89,
                comments: 23,
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                price: '$2,800',
                location: 'Soho, NYC'
            },
            {
                id: 2,
                userId: 'fashionista2',
                username: 'TrendSetter',
                imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=600&fit=crop',
                description: 'These designer sneakers are everything! Perfect blend of comfort and style. #sneakers #designer #streetstyle',
                category: 'footwear',
                tags: ['sneakers', 'designer', 'streetstyle', 'comfort'],
                likes: 98,
                saves: 156,
                comments: 45,
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
                price: '$450',
                location: 'Beverly Hills'
            },
            {
                id: 3,
                userId: 'fashionista3',
                username: 'GlamourGirl',
                imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=600&fit=crop',
                title: 'Gala Night Elegance',
                description: 'Basedly AI recommended this stunning dress for the charity gala. Got so many compliments! #gala #elegance #ai-style',
                category: 'dresses',
                tags: ['gala', 'elegance', 'dress', 'ai-recommendation'],
                likes: 231,
                saves: 203,
                comments: 67,
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
                price: '$1,200',
                location: 'Rodeo Drive'
            },
            {
                id: 4,
                userId: 'fashionista4',
                username: 'StyleSquad',
                imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop',
                title: 'Shopping Spree Success',
                description: 'Epic shopping day with the squad! Basedly made it so easy to find the perfect pieces. #squadgoals #shopping #fashion',
                category: 'outfits',
                tags: ['squadgoals', 'shopping', 'fashion', 'friends'],
                likes: 342,
                saves: 278,
                comments: 89,
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
                price: '$850',
                location: 'Miami Beach'
            },
            {
                id: 5,
                userId: 'fashionista5',
                username: 'LuxuryLover',
                imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=600&fit=crop',
                title: 'Exclusive Collection Access',
                description: 'VIP access to the new collection thanks to Basedly! This piece is absolutely stunning. #exclusive #vip #newcollection',
                category: 'luxury',
                tags: ['exclusive', 'vip', 'newcollection', 'luxury'],
                likes: 567,
                saves: 445,
                comments: 123,
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
                price: '$3,500',
                location: 'Paris, France'
            },
            {
                id: 6,
                userId: 'fashionista6',
                username: 'MinimalistMaven',
                imageUrl: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop',
                title: 'Minimalist Chic',
                description: 'Less is more! This minimalist outfit is perfect for everyday elegance. #minimalist #chic #everyday',
                category: 'minimalist',
                tags: ['minimalist', 'chic', 'everyday', 'elegance'],
                likes: 189,
                saves: 234,
                comments: 56,
                timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
                price: '$320',
                location: 'Downtown LA'
            }
        ];
    }

    setupEventListeners() {
        // Category filter buttons
        const categoryButtons = document.querySelectorAll('.category-filter-btn');
        categoryButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentCategory = e.target.dataset.category;
                this.updateCategoryUI();
                this.renderNooks();
            });
        });

        // View toggle buttons
        const viewButtons = document.querySelectorAll('.view-toggle-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentView = e.target.dataset.view;
                this.updateViewUI();
                this.renderNooks();
            });
        });

        // Upload button
        const uploadBtn = document.getElementById('upload-nook-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.showUploadModal());
        }

        // Close modal
        const closeModal = document.getElementById('close-upload-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.hideUploadModal());
        }

        // File input
        const fileInput = document.getElementById('nook-image-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }

        // Submit form
        const submitForm = document.getElementById('upload-nook-form');
        if (submitForm) {
            submitForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    render() {
        const container = document.getElementById('fashion-nooks-container');
        if (!container) return;

        container.innerHTML = `
            <div class="fashion-nooks-page">
                <!-- Header -->
                <div class="fashion-nooks-header">
                    <h1>🛍️ Fashion Nooks</h1>
                    <p>Discover and share your fashion inspiration, like Pinterest but for style</p>
                </div>

                <!-- View Toggle -->
                <div class="view-toggle">
                    <button class="view-toggle-btn lux-button-secondary active" data-view="grid">
                        📐 Grid View
                    </button>
                    <button class="view-toggle-btn lux-button-secondary" data-view="masonry">
                        🧱 Masonry View
                    </button>
                </div>

                <!-- Upload Section -->
                <div class="upload-section">
                    <button id="upload-nook-btn" class="lux-button">
                        📌 Pin Your Style
                    </button>
                </div>

                <!-- Category Filters -->
                <div class="category-filters">
                    <button class="category-filter-btn lux-button-secondary active" data-category="all">
                        🌟 All Styles
                    </button>
                    <button class="category-filter-btn lux-button-secondary" data-category="accessories">
                        👜 Accessories
                    </button>
                    <button class="category-filter-btn lux-button-secondary" data-category="footwear">
                        👟 Footwear
                    </button>
                    <button class="category-filter-btn lux-button-secondary" data-category="dresses">
                        👗 Dresses
                    </button>
                    <button class="category-filter-btn lux-button-secondary" data-category="outfits">
                        👔 Outfits
                    </button>
                    <button class="category-filter-btn lux-button-secondary" data-category="luxury">
                        💎 Luxury
                    </button>
                    <button class="category-filter-btn lux-button-secondary" data-category="minimalist">
                        ✨ Minimalist
                    </button>
                </div>

                <!-- Content Area -->
                <div class="content-area">
                    <div class="fashion-nooks-grid ${this.currentView === 'masonry' ? 'masonry-layout' : ''}" id="fashion-nooks-grid">
                        ${this.renderNooks()}
                    </div>
                </div>

                <!-- Upload Modal -->
                <div id="upload-modal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>📌 Pin Your Style</h2>
                            <button id="close-upload-modal" class="close-btn">&times;</button>
                        </div>
                        <form id="upload-nook-form">
                            <div class="upload-area" id="upload-area">
                                <input type="file" id="nook-image-input" accept="image/*" style="display: none;">
                                <div class="upload-placeholder">
                                    <div class="upload-icon">📌</div>
                                    <p>Tap to add your fashion inspiration</p>
                                    <p class="upload-hint">Share your style with the community!</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="nook-title">Title (optional)</label>
                                <input type="text" id="nook-title" placeholder="Give your style a name...">
                            </div>
                            <div class="form-group">
                                <label for="nook-description">Description</label>
                                <textarea id="nook-description" placeholder="Tell us about your style inspiration..." maxlength="300"></textarea>
                                <div class="char-count">0/300</div>
                            </div>
                            <div class="form-group">
                                <label for="nook-category">Category</label>
                                <select id="nook-category">
                                    <option value="accessories">👜 Accessories</option>
                                    <option value="footwear">👟 Footwear</option>
                                    <option value="dresses">👗 Dresses</option>
                                    <option value="outfits">👔 Outfits</option>
                                    <option value="luxury">💎 Luxury</option>
                                    <option value="minimalist">✨ Minimalist</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="nook-price">Price (optional)</label>
                                <input type="text" id="nook-price" placeholder="e.g., $150">
                            </div>
                            <div class="form-group">
                                <label for="nook-location">Location (optional)</label>
                                <input type="text" id="nook-location" placeholder="Where did you find this?">
                            </div>
                            <div class="form-group">
                                <label for="nook-tags">Tags (optional)</label>
                                <input type="text" id="nook-tags" placeholder="Add tags separated by commas">
                            </div>
                            <button type="submit" class="lux-button" id="submit-nook-btn">
                                ${this.isUploading ? '📤 Pinning...' : '📌 Pin Style'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.setupUploadArea();
    }

    renderNooks() {
        const filteredNooks = this.getFilteredNooks();
        
        return filteredNooks.map(nook => `
            <div class="fashion-nook-card" data-id="${nook.id}">
                <div class="nook-image-container">
                    <img src="${nook.imageUrl}" alt="${nook.title || 'Fashion inspiration'}" loading="lazy">
                    <div class="nook-overlay">
                        <button class="save-btn" onclick="fashionNooksComponent.toggleSave(${nook.id})">
                            ${nook.saved ? '📌' : '📌'} Save
                        </button>
                        <button class="like-btn ${nook.liked ? 'liked' : ''}" onclick="fashionNooksComponent.toggleLike(${nook.id})">
                            ❤️ ${nook.likes}
                        </button>
                    </div>
                </div>
                <div class="nook-content">
                    ${nook.title ? `<h3 class="nook-title">${nook.title}</h3>` : ''}
                    <p class="nook-description">${nook.description}</p>
                    <div class="nook-meta">
                        <div class="nook-user">
                            <span class="username">@${nook.username}</span>
                            <span class="timestamp">${this.formatTimestamp(nook.timestamp)}</span>
                        </div>
                        <div class="nook-details">
                            ${nook.price ? `<span class="price">${nook.price}</span>` : ''}
                            ${nook.location ? `<span class="location">📍 ${nook.location}</span>` : ''}
                        </div>
                    </div>
                    <div class="nook-tags">
                        ${nook.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                    <div class="nook-actions">
                        <button class="comment-btn" onclick="fashionNooksComponent.showComments(${nook.id})">
                            💬 ${nook.comments}
                        </button>
                        <button class="share-btn" onclick="fashionNooksComponent.shareNook(${nook.id})">
                            📤 Share
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getFilteredNooks() {
        if (this.currentCategory === 'all') {
            return this.nooks;
        }
        return this.nooks.filter(nook => nook.category === this.currentCategory);
    }

    updateCategoryUI() {
        const categoryButtons = document.querySelectorAll('.category-filter-btn');
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.category === this.currentCategory) {
                btn.classList.add('active');
            }
        });
    }

    updateViewUI() {
        const viewButtons = document.querySelectorAll('.view-toggle-btn');
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.view === this.currentView) {
                btn.classList.add('active');
            }
        });
    }

    renderNooks() {
        const grid = document.getElementById('fashion-nooks-grid');
        if (grid) {
            grid.innerHTML = this.renderNooks();
        }
    }

    showUploadModal() {
        const modal = document.getElementById('upload-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    hideUploadModal() {
        const modal = document.getElementById('upload-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    setupUploadArea() {
        const uploadArea = document.getElementById('upload-area');
        if (uploadArea) {
            uploadArea.addEventListener('click', () => {
                document.getElementById('nook-image-input').click();
            });
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const uploadArea = document.getElementById('upload-area');
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 300px; object-fit: cover;">
                `;
            };
            reader.readAsDataURL(file);
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.isUploading = true;
        this.updateSubmitButton();

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Add new nook to the list
        const newNook = {
            id: this.nooks.length + 1,
            userId: 'currentUser',
            username: 'You',
            imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop', // Placeholder
            title: document.getElementById('nook-title').value,
            description: document.getElementById('nook-description').value,
            category: document.getElementById('nook-category').value,
            tags: document.getElementById('nook-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag),
            likes: 0,
            saves: 0,
            comments: 0,
            timestamp: new Date(),
            price: document.getElementById('nook-price').value,
            location: document.getElementById('nook-location').value
        };

        this.nooks.unshift(newNook);
        this.hideUploadModal();
        this.renderNooks();
        this.isUploading = false;
        this.updateSubmitButton();
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('submit-nook-btn');
        if (submitBtn) {
            submitBtn.textContent = this.isUploading ? '📤 Pinning...' : '📌 Pin Style';
            submitBtn.disabled = this.isUploading;
        }
    }

    toggleLike(nookId) {
        const nook = this.nooks.find(n => n.id === nookId);
        if (nook) {
            nook.liked = !nook.liked;
            nook.likes += nook.liked ? 1 : -1;
            this.renderNooks();
        }
    }

    toggleSave(nookId) {
        const nook = this.nooks.find(n => n.id === nookId);
        if (nook) {
            nook.saved = !nook.saved;
            nook.saves += nook.saved ? 1 : -1;
            this.renderNooks();
        }
    }

    showComments(nookId) {
        alert(`Comments for nook ${nookId} - Coming soon!`);
    }

    shareNook(nookId) {
        const nook = this.nooks.find(n => n.id === nookId);
        if (nook) {
            const shareText = `Check out this amazing fashion inspiration: ${nook.title || 'Fashion Nook'} #BasedlyFashion`;
            if (navigator.share) {
                navigator.share({
                    title: nook.title || 'Fashion Nook',
                    text: shareText,
                    url: window.location.href
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                navigator.clipboard.writeText(shareText);
                alert('Link copied to clipboard!');
            }
        }
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FashionNooksComponent;
} 