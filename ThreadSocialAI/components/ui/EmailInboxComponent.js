class EmailInboxComponent extends ResponsiveBaseComponent {
    constructor(containerId, options = {}) {
        super(containerId, options);
        this.messages = options.messages || [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.render();
        this.addEventListeners();
        this.addResponsiveStyles();
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const stats = this.calculateStats();
        
        container.innerHTML = `
            <div class="email-inbox-container">
                <div class="inbox-header">
                    <div class="inbox-title-section">
                        <h2 class="inbox-title">EMAIL INBOX</h2>
                        <div class="inbox-stats">
                            <div class="stat-item">
                                <span class="stat-number">${stats.total}</span>
                                <span class="stat-label">Total</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${stats.unread}</span>
                                <span class="stat-label">Unread</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${stats.important}</span>
                                <span class="stat-label">Important</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="inbox-controls">
                        <div class="search-container">
                            <input type="text" class="search-input" placeholder="Search messages..." id="email-search">
                            <span class="search-icon">🔍</span>
                        </div>
                        
                        <div class="filter-buttons">
                            <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                            <button class="filter-btn ${this.currentFilter === 'unread' ? 'active' : ''}" data-filter="unread">Unread</button>
                            <button class="filter-btn ${this.currentFilter === 'deals' ? 'active' : ''}" data-filter="deals">Deals</button>
                            <button class="filter-btn ${this.currentFilter === 'community' ? 'active' : ''}" data-filter="community">Community</button>
                        </div>
                    </div>
                </div>
                
                <div class="messages-container" id="messages-list">
                    ${this.renderMessages()}
                </div>
                
                <button class="compose-button" onclick="composeEmail()">
                    <span>✉️</span>
                    COMPOSE
                </button>
            </div>
        `;
    }

    renderMessages() {
        const filteredMessages = this.getFilteredMessages();
        
        if (filteredMessages.length === 0) {
            return `
                <div class="no-messages">
                    <div class="no-messages-icon">📭</div>
                    <h3>No Messages Found</h3>
                    <p>Try adjusting your search or filter criteria.</p>
                </div>
            `;
        }

        return filteredMessages.map(message => `
            <div class="message-item ${message.unread ? 'unread' : ''}" data-id="${message.id}">
                <div class="message-header">
                    <div class="message-sender">${message.sender}</div>
                    <div class="message-time">${message.time}</div>
                </div>
                
                <div class="message-subject">${message.subject}</div>
                <div class="message-preview">${message.preview}</div>
                
                <div class="message-meta">
                    <span class="message-category ${message.category}">${message.category.toUpperCase()}</span>
                    ${message.priority === 'high' ? '<span class="message-priority high">🔥 HIGH PRIORITY</span>' : ''}
                    ${message.unread ? '<span class="unread-indicator">●</span>' : ''}
                </div>
            </div>
        `).join('');
    }

    getFilteredMessages() {
        let filtered = this.messages;

        // Apply search filter
        if (this.searchQuery) {
            const query = this.searchQuery.toLowerCase();
            filtered = filtered.filter(message => 
                message.sender.toLowerCase().includes(query) ||
                message.subject.toLowerCase().includes(query) ||
                message.preview.toLowerCase().includes(query)
            );
        }

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(message => {
                if (this.currentFilter === 'unread') return message.unread;
                if (this.currentFilter === 'deals') return message.category === 'deals';
                if (this.currentFilter === 'community') return message.category === 'community';
                return true;
            });
        }

        return filtered;
    }

    calculateStats() {
        return {
            total: this.messages.length,
            unread: this.messages.filter(m => m.unread).length,
            important: this.messages.filter(m => m.priority === 'high').length
        };
    }

    addEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('email-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.render();
            });
        }

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Message click handlers
        const messagesList = document.getElementById('messages-list');
        if (messagesList) {
            messagesList.addEventListener('click', (e) => {
                const messageItem = e.target.closest('.message-item');
                if (messageItem) {
                    this.openMessage(messageItem.dataset.id);
                }
            });
        }
    }

    openMessage(messageId) {
        const message = this.messages.find(m => m.id == messageId);
        if (!message) return;

        // Mark as read
        message.unread = false;
        this.render();

        // Show message detail modal
        this.showMessageModal(message);
    }

    showMessageModal(message) {
        const modal = document.createElement('div');
        modal.className = 'message-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(10px);
        `;

        modal.innerHTML = `
            <div class="message-modal-content" style="
                background: var(--lux-black);
                border: 2px solid var(--lux-hot-pink);
                border-radius: 12px;
                padding: clamp(24px, 4vw, 32px);
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
            ">
                <button onclick="this.closest('.message-modal').remove()" style="
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    background: none;
                    border: none;
                    color: var(--lux-white);
                    font-size: 24px;
                    cursor: pointer;
                ">×</button>
                
                <div class="message-modal-header" style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <h3 style="color: var(--lux-beige); font-size: 20px; margin: 0;">${message.subject}</h3>
                        <span style="color: var(--lux-white); opacity: 0.7; font-size: 14px;">${message.time}</span>
                    </div>
                    <div style="color: var(--lux-hot-pink); font-weight: 600; margin-bottom: 8px;">From: ${message.sender}</div>
                    <div style="display: flex; gap: 8px;">
                        <span class="message-category ${message.category}" style="
                            background: var(--lux-dark-gray);
                            color: var(--lux-beige);
                            padding: 4px 8px;
                            border-radius: 4px;
                            font-size: 12px;
                            text-transform: uppercase;
                        ">${message.category}</span>
                        ${message.priority === 'high' ? '<span style="background: var(--lux-hot-pink); color: var(--lux-black); padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600;">HIGH PRIORITY</span>' : ''}
                    </div>
                </div>
                
                <div class="message-modal-body" style="
                    color: var(--lux-white);
                    line-height: 1.6;
                    font-size: 16px;
                ">
                    <p style="margin-bottom: 16px;">${message.preview}</p>
                    <p style="margin-bottom: 16px;">This is the full message content. In a real application, this would contain the complete email body with formatting, links, and any attachments.</p>
                    <p style="margin-bottom: 16px;">You can reply to this message, forward it, or take other actions using the buttons below.</p>
                </div>
                
                <div class="message-modal-actions" style="
                    margin-top: 24px;
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                ">
                    <button onclick="replyToMessage(${message.id})" style="
                        background: var(--lux-hot-pink);
                        color: var(--lux-black);
                        border: none;
                        padding: 12px 20px;
                        font-weight: 600;
                        cursor: pointer;
                        border-radius: 6px;
                    ">Reply</button>
                    <button onclick="forwardMessage(${message.id})" style="
                        background: var(--lux-dark-gray);
                        color: var(--lux-white);
                        border: 1px solid var(--lux-beige);
                        padding: 12px 20px;
                        font-weight: 600;
                        cursor: pointer;
                        border-radius: 6px;
                    ">Forward</button>
                    <button onclick="deleteMessage(${message.id})" style="
                        background: transparent;
                        color: var(--lux-hot-pink);
                        border: 1px solid var(--lux-hot-pink);
                        padding: 12px 20px;
                        font-weight: 600;
                        cursor: pointer;
                        border-radius: 6px;
                    ">Delete</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    addResponsiveStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .email-inbox-container {
                background: var(--lux-black);
                border: 1px solid var(--lux-beige);
                border-radius: 12px;
                padding: clamp(24px, 4vw, 32px);
                margin-bottom: clamp(24px, 4vw, 32px);
            }
            
            .inbox-header {
                margin-bottom: clamp(24px, 4vw, 32px);
            }
            
            .inbox-title-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: clamp(16px, 3vw, 20px);
                flex-wrap: wrap;
                gap: 16px;
            }
            
            .inbox-title {
                color: var(--lux-beige);
                font-size: clamp(20px, 4vw, 24px);
                font-weight: 700;
                margin: 0;
                letter-spacing: 2px;
            }
            
            .inbox-stats {
                display: flex;
                gap: clamp(16px, 3vw, 24px);
            }
            
            .stat-item {
                text-align: center;
            }
            
            .stat-number {
                display: block;
                color: var(--lux-hot-pink);
                font-size: clamp(18px, 3vw, 24px);
                font-weight: 700;
            }
            
            .stat-label {
                color: var(--lux-white);
                font-size: clamp(12px, 2vw, 14px);
                opacity: 0.7;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .inbox-controls {
                display: flex;
                gap: clamp(16px, 3vw, 20px);
                flex-wrap: wrap;
                align-items: center;
            }
            
            .search-container {
                position: relative;
                flex: 1;
                min-width: 200px;
            }
            
            .search-input {
                width: 100%;
                padding: clamp(12px, 2.5vw, 16px);
                padding-left: clamp(40px, 4vw, 48px);
                background: var(--lux-dark-gray);
                border: 2px solid var(--lux-beige);
                color: var(--lux-white);
                font-size: clamp(14px, 2.5vw, 16px);
                outline: none;
                border-radius: 6px;
            }
            
            .search-icon {
                position: absolute;
                left: clamp(12px, 2.5vw, 16px);
                top: 50%;
                transform: translateY(-50%);
                color: var(--lux-white);
                opacity: 0.7;
            }
            
            .filter-buttons {
                display: flex;
                gap: clamp(8px, 2vw, 12px);
                flex-wrap: wrap;
            }
            
            .filter-btn {
                background: var(--lux-black);
                color: var(--lux-white);
                border: 2px solid var(--lux-hot-pink);
                padding: clamp(8px, 2vw, 12px) clamp(16px, 3vw, 20px);
                font-size: clamp(12px, 2.5vw, 14px);
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 6px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .filter-btn.active,
            .filter-btn:hover {
                background: var(--lux-hot-pink);
                color: var(--lux-black);
            }
            
            .messages-container {
                display: flex;
                flex-direction: column;
                gap: clamp(12px, 2.5vw, 16px);
                margin-bottom: clamp(24px, 4vw, 32px);
            }
            
            .message-item {
                background: var(--lux-dark-gray);
                border: 1px solid var(--lux-beige);
                border-radius: 8px;
                padding: clamp(16px, 3vw, 20px);
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
            }
            
            .message-item:hover {
                border-color: var(--lux-hot-pink);
                transform: translateY(-2px);
            }
            
            .message-item.unread {
                border-color: var(--lux-hot-pink);
                background: rgba(255, 171, 223, 0.05);
            }
            
            .message-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: clamp(8px, 2vw, 12px);
            }
            
            .message-sender {
                color: var(--lux-hot-pink);
                font-weight: 600;
                font-size: clamp(14px, 2.5vw, 16px);
            }
            
            .message-time {
                color: var(--lux-white);
                opacity: 0.7;
                font-size: clamp(12px, 2vw, 14px);
            }
            
            .message-subject {
                color: var(--lux-white);
                font-weight: 600;
                font-size: clamp(14px, 2.5vw, 16px);
                margin-bottom: clamp(6px, 1.5vw, 8px);
            }
            
            .message-preview {
                color: var(--lux-white);
                opacity: 0.8;
                font-size: clamp(13px, 2.5vw, 14px);
                margin-bottom: clamp(8px, 2vw, 12px);
                line-height: 1.4;
            }
            
            .message-meta {
                display: flex;
                gap: clamp(8px, 2vw, 12px);
                align-items: center;
                flex-wrap: wrap;
            }
            
            .message-category {
                background: var(--lux-black);
                color: var(--lux-beige);
                padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
                border-radius: 4px;
                font-size: clamp(10px, 2vw, 12px);
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
            
            .message-category.deals {
                background: var(--lux-hot-pink);
                color: var(--lux-black);
            }
            
            .message-category.community {
                background: var(--lux-beige);
                color: var(--lux-black);
            }
            
            .message-priority {
                background: var(--lux-hot-pink);
                color: var(--lux-black);
                padding: clamp(4px, 1vw, 6px) clamp(8px, 2vw, 12px);
                border-radius: 4px;
                font-size: clamp(10px, 2vw, 12px);
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }
            
            .unread-indicator {
                color: var(--lux-hot-pink);
                font-size: 16px;
                font-weight: bold;
            }
            
            .compose-button {
                background: var(--lux-hot-pink);
                color: var(--lux-black);
                border: 2px solid var(--lux-hot-pink);
                padding: clamp(12px, 2.5vw, 16px) clamp(24px, 4vw, 32px);
                font-size: clamp(14px, 2.5vw, 16px);
                font-weight: 700;
                letter-spacing: 2px;
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 6px;
                display: flex;
                align-items: center;
                gap: 8px;
                text-transform: uppercase;
            }
            
            .compose-button:hover {
                background: var(--lux-beige);
                border-color: var(--lux-beige);
                transform: translateY(-2px);
            }
            
            .no-messages {
                text-align: center;
                padding: clamp(40px, 6vw, 60px);
                color: var(--lux-white);
                opacity: 0.7;
            }
            
            .no-messages-icon {
                font-size: clamp(48px, 8vw, 64px);
                margin-bottom: clamp(16px, 3vw, 24px);
            }
            
            .no-messages h3 {
                color: var(--lux-beige);
                font-size: clamp(18px, 3vw, 24px);
                margin-bottom: clamp(8px, 2vw, 12px);
            }
            
            .no-messages p {
                font-size: clamp(14px, 2.5vw, 16px);
            }
            
            /* Responsive adjustments */
            @media (max-width: 768px) {
                .inbox-title-section {
                    flex-direction: column;
                    align-items: flex-start;
                }
                
                .inbox-stats {
                    gap: 12px;
                }
                
                .inbox-controls {
                    flex-direction: column;
                    align-items: stretch;
                }
                
                .search-container {
                    min-width: auto;
                }
                
                .filter-buttons {
                    justify-content: center;
                }
                
                .message-header {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 4px;
                }
                
                .message-meta {
                    justify-content: flex-start;
                }
            }
        `;
        
        document.head.appendChild(style);
    }
}

// Global functions for message actions
function composeEmail() {
    console.log('Compose email clicked');
    // Implement compose functionality
    alert('Compose email functionality would be implemented here');
}

function replyToMessage(messageId) {
    console.log('Reply to message:', messageId);
    // Implement reply functionality
    alert('Reply functionality would be implemented here');
}

function forwardMessage(messageId) {
    console.log('Forward message:', messageId);
    // Implement forward functionality
    alert('Forward functionality would be implemented here');
}

function deleteMessage(messageId) {
    console.log('Delete message:', messageId);
    // Implement delete functionality
    if (confirm('Are you sure you want to delete this message?')) {
        alert('Delete functionality would be implemented here');
    }
} 