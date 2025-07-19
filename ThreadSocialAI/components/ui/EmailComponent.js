/**
 * Email Component - Handles all email functionality
 */
class EmailComponent {
    constructor() {
        this.messages = [];
        this.currentFilter = 'all';
        this.searchQuery = '';
        this.selectedMessages = new Set();
    }

    init() {
        this.loadMessages();
        this.render();
        this.setupEventListeners();
    }

    loadMessages() {
        // Sample email data
        this.messages = [
            {
                id: 1,
                sender: 'WATCH AI',
                subject: 'New Chanel Deal Alert! 👜',
                preview: 'Exclusive 20% off Classic Flap Collection. Limited time offer for VIP members only.',
                time: '2 min ago',
                unread: true,
                category: 'deals',
                priority: 'high',
                avatar: '🤖'
            },
            {
                id: 2,
                sender: 'SHOPPING BUDDY',
                subject: 'Shopping Trip This Weekend? 🛍️',
                preview: 'Hey! I found some amazing deals on Nike Air Jordans. Want to plan a shopping trip together?',
                time: '15 min ago',
                unread: true,
                category: 'community',
                priority: 'medium',
                avatar: '👥'
            },
            {
                id: 3,
                sender: 'LUXURY INSIDER',
                subject: 'VIP Access: Cartier Love Collection',
                preview: 'As a premium member, you have early access to the new Cartier Love Collection.',
                time: '1 hour ago',
                unread: false,
                category: 'deals',
                priority: 'high',
                avatar: '💎'
            },
            {
                id: 4,
                sender: 'STYLE CURATOR',
                subject: 'Your Style Profile Updated ✨',
                preview: 'Based on your recent activity, we\'ve updated your style preferences.',
                time: '3 hours ago',
                unread: false,
                category: 'community',
                priority: 'low',
                avatar: '🎨'
            },
            {
                id: 5,
                sender: 'COMMUNITY MODERATOR',
                subject: 'Welcome to WATCH! 🎉',
                preview: 'Welcome to the WATCH community! We\'re excited to help you discover amazing deals.',
                time: '1 day ago',
                unread: false,
                category: 'community',
                priority: 'low',
                avatar: '👋'
            }
        ];
    }

    render() {
        const container = document.querySelector('.main-content');
        if (!container) return;

        container.innerHTML = `
            <div class="content-container">
                <div class="page-header">
                    <h1 class="page-title">MESSAGES</h1>
                    <p class="page-description">Stay connected with your shopping community</p>
                </div>
                
                <div class="email-dashboard">
                    <div class="email-sidebar">
                        <div class="email-stats">
                            <div class="stat-item">
                                <span class="stat-number">${this.getUnreadCount()}</span>
                                <span class="stat-label">Unread</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${this.messages.length}</span>
                                <span class="stat-label">Total</span>
                            </div>
                        </div>
                        
                        <div class="email-filters">
                            <button class="filter-btn active" data-filter="all">All Messages</button>
                            <button class="filter-btn" data-filter="deals">Deals</button>
                            <button class="filter-btn" data-filter="community">Community</button>
                            <button class="filter-btn" data-filter="unread">Unread</button>
                        </div>
                    </div>
                    
                    <div class="email-main">
                        <div class="email-header">
                            <div class="email-search">
                                <input type="text" placeholder="Search messages..." id="emailSearch">
                                <button class="search-btn">🔍</button>
                            </div>
                            <button class="compose-btn" onclick="emailComponent.composeMessage()">✏️ Compose</button>
                        </div>
                        
                        <div class="email-list" id="emailList">
                            ${this.renderEmailList()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    renderEmailList() {
        const filteredMessages = this.getFilteredMessages();
        
        return filteredMessages.map(message => `
            <div class="email-item ${message.unread ? 'unread' : ''}" data-id="${message.id}">
                <div class="email-avatar">${message.avatar}</div>
                <div class="email-content">
                    <div class="email-header">
                        <span class="email-sender">${message.sender}</span>
                        <span class="email-time">${message.time}</span>
                    </div>
                    <div class="email-subject">${message.subject}</div>
                    <div class="email-preview">${message.preview}</div>
                    <div class="email-meta">
                        <span class="email-category">${message.category}</span>
                        <span class="email-priority ${message.priority}">${message.priority}</span>
                    </div>
                </div>
                <div class="email-actions">
                    <button class="action-btn" onclick="emailComponent.toggleRead(${message.id})">
                        ${message.unread ? '📬' : '📭'}
                    </button>
                    <button class="action-btn" onclick="emailComponent.deleteMessage(${message.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('emailSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value;
                this.renderEmailList();
            });
        }

        // Filter buttons
        document.addEventListener('click', (e) => {
            if (e.target.matches('.filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.getAttribute('data-filter');
                this.renderEmailList();
            }
        });

        // Email item clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.email-item')) {
                const emailItem = e.target.closest('.email-item');
                const messageId = emailItem.getAttribute('data-id');
                this.openMessage(messageId);
            }
        });
    }

    getFilteredMessages() {
        let filtered = this.messages;

        // Apply search filter
        if (this.searchQuery) {
            filtered = filtered.filter(message => 
                message.sender.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                message.subject.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                message.preview.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        }

        // Apply category filter
        if (this.currentFilter !== 'all') {
            filtered = filtered.filter(message => {
                if (this.currentFilter === 'unread') {
                    return message.unread;
                }
                return message.category === this.currentFilter;
            });
        }

        return filtered;
    }

    getUnreadCount() {
        return this.messages.filter(message => message.unread).length;
    }

    toggleRead(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            message.unread = !message.unread;
            this.renderEmailList();
        }
    }

    deleteMessage(messageId) {
        this.messages = this.messages.filter(m => m.id !== messageId);
        this.renderEmailList();
    }

    openMessage(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) {
            this.showMessageModal(message);
        }
    }

    showMessageModal(message) {
        const modal = document.createElement('div');
        modal.className = 'message-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${message.subject}</h3>
                    <button onclick="this.closest('.message-modal').remove()">✕</button>
                </div>
                <div class="modal-body">
                    <div class="message-details">
                        <p><strong>From:</strong> ${message.sender}</p>
                        <p><strong>Time:</strong> ${message.time}</p>
                        <p><strong>Category:</strong> ${message.category}</p>
                    </div>
                    <div class="message-content">
                        <p>${message.preview}</p>
                        <p>This is the full message content. In a real application, this would contain the complete email body.</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button onclick="emailComponent.replyToMessage(${message.id})">Reply</button>
                    <button onclick="emailComponent.forwardMessage(${message.id})">Forward</button>
                    <button onclick="this.closest('.message-modal').remove()">Close</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    composeMessage() {
        const modal = document.createElement('div');
        modal.className = 'compose-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Compose Message</h3>
                    <button onclick="this.closest('.compose-modal').remove()">✕</button>
                </div>
                <div class="modal-body">
                    <form id="composeForm">
                        <div class="form-group">
                            <label>To:</label>
                            <input type="email" placeholder="recipient@example.com" required>
                        </div>
                        <div class="form-group">
                            <label>Subject:</label>
                            <input type="text" placeholder="Message subject" required>
                        </div>
                        <div class="form-group">
                            <label>Message:</label>
                            <textarea placeholder="Type your message here..." rows="10" required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button onclick="emailComponent.sendMessage()">Send</button>
                    <button onclick="this.closest('.compose-modal').remove()">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    sendMessage() {
        const form = document.getElementById('composeForm');
        if (form) {
            // Handle message sending
            console.log('Sending message...');
            document.querySelector('.compose-modal').remove();
        }
    }

    replyToMessage(messageId) {
        console.log('Replying to message:', messageId);
        // Implement reply functionality
    }

    forwardMessage(messageId) {
        console.log('Forwarding message:', messageId);
        // Implement forward functionality
    }
}

// Global email component instance
window.emailComponent = new EmailComponent(); 