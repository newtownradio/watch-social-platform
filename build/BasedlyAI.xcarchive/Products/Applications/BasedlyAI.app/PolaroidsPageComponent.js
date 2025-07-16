class PolaroidsPageComponent extends BaseComponent {
    constructor() {
        super();
        this.polaroids = [];
        this.currentFilter = 'all';
        this.isUploading = false;
        this.waiverSigned = false;
        this.currentView = 'polaroids'; // 'polaroids' or 'photowall'
    }

    async initialize() {
        await this.loadPolaroids();
        this.setupEventListeners();
        this.checkWaiverStatus();
        this.render();
    }

    checkWaiverStatus() {
        this.waiverSigned = localStorage.getItem('polaroidWaiverSigned') === 'true';
    }

    showWaiverModal() {
        const modal = document.getElementById('waiver-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    hideWaiverModal() {
        const modal = document.getElementById('waiver-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    acceptWaiver() {
        this.waiverSigned = true;
        localStorage.setItem('polaroidWaiverSigned', 'true');
        this.hideWaiverModal();
        this.render();
    }

    declineWaiver() {
        this.hideWaiverModal();
        // Redirect to home page or show message
        window.location.href = 'index.html';
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

    async loadPolaroids() {
        // Simulate loading polaroids from a data source
        this.polaroids = [
            {
                id: 1,
                userId: 'user1',
                username: 'Sarah',
                imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop',
                caption: 'Found the perfect vintage Chanel bag at the Basedly pop-up! 👜✨',
                location: 'Soho, NYC',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
                likes: 24,
                comments: 8,
                tags: ['vintage', 'chanel', 'soho', 'luxury']
            },
            {
                id: 2,
                userId: 'user2',
                username: 'Mike',
                imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
                caption: 'Amazing deals on designer shoes today! 👟🔥',
                location: 'Beverly Hills',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
                likes: 18,
                comments: 5,
                tags: ['shoes', 'designer', 'beverly-hills']
            },
            {
                id: 3,
                userId: 'user3',
                username: 'Emma',
                imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop',
                caption: 'Basedly AI recommended this stunning dress - perfect for the gala! 👗💫',
                location: 'Rodeo Drive',
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
                likes: 31,
                comments: 12,
                tags: ['dress', 'gala', 'rodeo-drive', 'ai-recommendation']
            },
            {
                id: 4,
                userId: 'user4',
                username: 'Alex',
                imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop',
                caption: 'Shopping spree with the squad! Basedly made it so easy 🛍️👯‍♀️',
                location: 'Miami Beach',
                timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
                likes: 42,
                comments: 15,
                tags: ['shopping-spree', 'miami', 'squad-goals']
            },
            {
                id: 5,
                userId: 'user5',
                username: 'David',
                imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
                caption: 'Exclusive access to the new collection thanks to Basedly VIP! 🎉',
                location: 'Paris, France',
                timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
                likes: 67,
                comments: 23,
                tags: ['exclusive', 'vip', 'paris', 'new-collection']
            }
        ];
    }

    setupEventListeners() {
        // Upload button
        const uploadBtn = document.getElementById('upload-polaroid-btn');
        if (uploadBtn) {
            uploadBtn.addEventListener('click', () => this.showUploadModal());
        }

        // View toggle buttons
        const viewButtons = document.querySelectorAll('.view-toggle-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentView = e.target.dataset.view;
                this.updateViewUI();
                this.render();
            });
        });

        // Filter buttons
        const filterButtons = document.querySelectorAll('.polaroid-filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.filter;
                this.updateFilterUI();
                this.renderPolaroids();
            });
        });

        // Waiver modal
        const waiverModal = document.getElementById('waiver-modal');
        if (waiverModal) {
            const acceptWaiver = document.getElementById('accept-waiver');
            const declineWaiver = document.getElementById('decline-waiver');
            
            if (acceptWaiver) {
                acceptWaiver.addEventListener('click', () => this.acceptWaiver());
            }
            if (declineWaiver) {
                declineWaiver.addEventListener('click', () => this.declineWaiver());
            }
        }

        // Close modal
        const closeModal = document.getElementById('close-upload-modal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.hideUploadModal());
        }

        // File input
        const fileInput = document.getElementById('polaroid-image-input');
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleImageUpload(e));
        }

        // Submit form
        const submitForm = document.getElementById('upload-polaroid-form');
        if (submitForm) {
            submitForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    render() {
        const container = document.getElementById('polaroids-container');
        if (!container) return;

        // Check waiver status first
        if (!this.waiverSigned) {
            this.showWaiverModal();
            return;
        }

        container.innerHTML = `
            <div class="polaroids-page">
                <!-- Header -->
                <div class="polaroids-header">
                    <h1>📸 Polaroids</h1>
                    <p>Share your Basedly shopping experiences with the community</p>
                </div>

                <!-- View Toggle -->
                <div class="view-toggle">
                    <button class="view-toggle-btn lux-button-secondary active" data-view="polaroids">
                        📸 Polaroids
                    </button>
                    <button class="view-toggle-btn lux-button-secondary" data-view="photowall">
                        🖼️ PhotoWall
                    </button>
                </div>

                <!-- Upload Section -->
                <div class="upload-section">
                    <button id="upload-polaroid-btn" class="lux-button">
                        📷 Share Your Experience
                    </button>
                </div>

                <!-- Filters -->
                <div class="polaroid-filters">
                    <button class="polaroid-filter-btn lux-button-secondary active" data-filter="all">
                        🌟 All
                    </button>
                    <button class="polaroid-filter-btn lux-button-secondary" data-filter="recent">
                        ⏰ Recent
                    </button>
                    <button class="polaroid-filter-btn lux-button-secondary" data-filter="popular">
                        🔥 Popular
                    </button>
                    <button class="polaroid-filter-btn lux-button-secondary" data-filter="nearby">
                        📍 Nearby
                    </button>
                </div>

                <!-- Content Area -->
                <div class="content-area">
                    ${this.currentView === 'polaroids' ? 
                        `<div class="polaroids-grid" id="polaroids-grid">${this.renderPolaroids()}</div>` :
                        `<div class="photowall-grid" id="photowall-grid">${this.renderPhotoWall()}</div>`
                    }
                </div>

                <!-- Upload Modal -->
                <div id="upload-modal" class="modal" style="display: none;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>📸 Share Your Experience</h2>
                            <button id="close-upload-modal" class="close-btn">&times;</button>
                        </div>
                        <form id="upload-polaroid-form">
                            <div class="upload-area" id="upload-area">
                                <input type="file" id="polaroid-image-input" accept="image/*" style="display: none;">
                                <div class="upload-placeholder">
                                    <div class="upload-icon">📷</div>
                                    <p>Tap to add a photo</p>
                                    <p class="upload-hint">Share your Basedly shopping moment!</p>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="polaroid-caption">Caption</label>
                                <textarea id="polaroid-caption" placeholder="Tell us about your experience..." maxlength="200"></textarea>
                                <div class="char-count">0/200</div>
                            </div>
                            <div class="form-group">
                                <label for="polaroid-location">Location</label>
                                <input type="text" id="polaroid-location" placeholder="Where was this taken?">
                            </div>
                            <div class="form-group">
                                <label for="polaroid-tags">Tags (optional)</label>
                                <input type="text" id="polaroid-tags" placeholder="Add tags separated by commas">
                            </div>
                            <button type="submit" class="lux-button" id="submit-polaroid-btn">
                                ${this.isUploading ? '📤 Uploading...' : '📤 Share Polaroid'}
                            </button>
                        </form>
                    </div>
                </div>

                <!-- Waiver Modal -->
                <div id="waiver-modal" class="modal" style="display: none;">
                    <div class="modal-content waiver-content">
                        <div class="modal-header">
                            <h2>⚠️ Legal Waiver Required</h2>
                        </div>
                        <div class="waiver-text">
                            <h3>Polaroids & PhotoWall Usage Agreement</h3>
                            <p><strong>By using the Polaroids and PhotoWall features, you agree to the following terms:</strong></p>
                            
                            <div class="waiver-section">
                                <h4>📸 Content Guidelines</h4>
                                <ul>
                                    <li>You may only upload photos you own or have permission to share</li>
                                    <li>Content must be appropriate and not violate community guidelines</li>
                                    <li>No copyrighted material without proper authorization</li>
                                    <li>Respect privacy - don't share photos of others without consent</li>
                                </ul>
                            </div>

                            <div class="waiver-section">
                                <h4>🔒 Privacy & Data</h4>
                                <ul>
                                    <li>Photos may be stored and displayed publicly on the platform</li>
                                    <li>Location data may be shared with other users</li>
                                    <li>Content may be used for platform promotion and marketing</li>
                                    <li>You retain ownership of your content but grant Basedly usage rights</li>
                                </ul>
                            </div>

                            <div class="waiver-section">
                                <h4>⚖️ Legal Responsibility</h4>
                                <ul>
                                    <li>You are responsible for all content you upload</li>
                                    <li>Basedly is not liable for user-generated content</li>
                                    <li>Violation of terms may result in content removal and account suspension</li>
                                    <li>You agree to indemnify Basedly against any claims related to your content</li>
                                </ul>
                            </div>

                            <div class="waiver-section">
                                <h4>📋 Additional Terms</h4>
                                <ul>
                                    <li>This waiver is part of Basedly's Terms of Service</li>
                                    <li>Basedly reserves the right to modify these terms</li>
                                    <li>Continued use constitutes acceptance of updated terms</li>
                                    <li>For questions, contact legal@basedly.com</li>
                                </ul>
                            </div>
                        </div>
                        <div class="waiver-actions">
                            <button id="accept-waiver" class="lux-button">✅ I Accept & Agree</button>
                            <button id="decline-waiver" class="lux-button-secondary">❌ Decline</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupEventListeners();
        this.setupUploadArea();
    }

    renderPolaroids() {
        const filteredPolaroids = this.getFilteredPolaroids();
        
        return filteredPolaroids.map(polaroid => `
            <div class="polaroid-card" data-id="${polaroid.id}">
                <div class="corner-top-left"></div>
                <div class="corner-bottom-right"></div>
                <div class="corner-accent top-right"></div>
                <div class="corner-accent bottom-left"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="particle"></div>
                <div class="polaroid-image">
                    <img src="${polaroid.imageUrl}" alt="Polaroid" loading="lazy">
                    <div class="polaroid-overlay">
                        <button class="like-btn ${polaroid.liked ? 'liked' : ''}" onclick="polaroidsPage.toggleLike(${polaroid.id})">
                            ❤️ ${polaroid.likes}
                        </button>
                        <button class="comment-btn" onclick="polaroidsPage.showComments(${polaroid.id})">
                            💬 ${polaroid.comments}
                        </button>
                    </div>
                </div>
                <div class="polaroid-content">
                    <div class="polaroid-header">
                        <span class="username">@${polaroid.username}</span>
                        <span class="timestamp">${this.formatTimestamp(polaroid.timestamp)}</span>
                    </div>
                    <p class="caption">${polaroid.caption}</p>
                    <div class="location">
                        📍 ${polaroid.location}
                    </div>
                    <div class="tags">
                        ${polaroid.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    getFilteredPolaroids() {
        let filtered = [...this.polaroids];
        
        switch (this.currentFilter) {
            case 'recent':
                filtered.sort((a, b) => b.timestamp - a.timestamp);
                break;
            case 'popular':
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case 'nearby':
                // Simulate nearby filter - in real app would use geolocation
                filtered = filtered.filter(p => p.location.includes('NYC') || p.location.includes('LA'));
                break;
        }
        
        return filtered;
    }

    updateFilterUI() {
        const filterButtons = document.querySelectorAll('.polaroid-filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === this.currentFilter) {
                btn.classList.add('active');
            }
        });
    }

    renderPolaroids() {
        const grid = document.getElementById('polaroids-grid');
        if (grid) {
            grid.innerHTML = this.renderPolaroids();
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
        const fileInput = document.getElementById('polaroid-image-input');
        
        if (uploadArea && fileInput) {
            uploadArea.addEventListener('click', () => fileInput.click());
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('drag-over');
            });
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('drag-over');
            });
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('drag-over');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    fileInput.files = files;
                    this.handleImageUpload({ target: fileInput });
                }
            });
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const uploadArea = document.getElementById('upload-area');
            if (uploadArea) {
                uploadArea.innerHTML = `
                    <img src="${e.target.result}" alt="Preview" style="max-width: 100%; max-height: 300px; object-fit: cover; border-radius: 8px;">
                `;
            }
        };
        reader.readAsDataURL(file);
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        this.isUploading = true;
        this.updateSubmitButton();
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Add new polaroid to the list
        const newPolaroid = {
            id: Date.now(),
            userId: 'current-user',
            username: 'You',
            imageUrl: document.querySelector('#upload-area img')?.src || 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=400&fit=crop',
            caption: document.getElementById('polaroid-caption').value,
            location: document.getElementById('polaroid-location').value,
            timestamp: new Date(),
            likes: 0,
            comments: 0,
            tags: document.getElementById('polaroid-tags').value.split(',').map(tag => tag.trim()).filter(tag => tag)
        };
        
        this.polaroids.unshift(newPolaroid);
        this.renderPolaroids();
        
        this.hideUploadModal();
        this.isUploading = false;
        this.updateSubmitButton();
        
        // Reset form
        event.target.reset();
        const uploadArea = document.getElementById('upload-area');
        if (uploadArea) {
            uploadArea.innerHTML = `
                <input type="file" id="polaroid-image-input" accept="image/*" style="display: none;">
                <div class="upload-placeholder">
                    <div class="upload-icon">📷</div>
                    <p>Tap to add a photo</p>
                    <p class="upload-hint">Share your Basedly shopping moment!</p>
                </div>
            `;
        }
    }

    updateSubmitButton() {
        const submitBtn = document.getElementById('submit-polaroid-btn');
        if (submitBtn) {
            submitBtn.innerHTML = this.isUploading ? '📤 Uploading...' : '📤 Share Polaroid';
            submitBtn.disabled = this.isUploading;
        }
    }

    toggleLike(polaroidId) {
        const polaroid = this.polaroids.find(p => p.id === polaroidId);
        if (polaroid) {
            polaroid.liked = !polaroid.liked;
            polaroid.likes += polaroid.liked ? 1 : -1;
            this.renderPolaroids();
        }
    }

    showComments(polaroidId) {
        // In a real app, this would show a comments modal
        alert('Comments feature coming soon! 💬');
    }

    renderPhotoWall() {
        const filteredPolaroids = this.getFilteredPolaroids();
        
        return `
            <div class="photowall-container">
                <div class="photowall-header">
                    <h3>🖼️ Community PhotoWall</h3>
                    <p>A beautiful mosaic of Basedly shopping experiences</p>
                </div>
                <div class="photowall-mosaic">
                    ${filteredPolaroids.map((polaroid, index) => `
                        <div class="photowall-item" style="animation-delay: ${index * 0.1}s;">
                            <div class="photowall-image">
                                <img src="${polaroid.imageUrl}" alt="PhotoWall" loading="lazy">
                                <div class="photowall-overlay">
                                    <div class="photowall-info">
                                        <span class="username">@${polaroid.username}</span>
                                        <span class="likes">❤️ ${polaroid.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    formatTimestamp(timestamp) {
        const now = new Date();
        const diff = now - timestamp;
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    }
}

// Initialize the component
window.polaroidsPage = new PolaroidsPageComponent(); 