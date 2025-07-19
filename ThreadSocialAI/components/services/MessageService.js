// MessageService.js - OOP service for message management
class MessageService {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.messages = [];
        this.sentMessages = [];
        this.emailFolders = {
            inbox: { name: 'Inbox', icon: '📥', count: 0 },
            sent: { name: 'Sent', icon: '📤', count: 0 },
            drafts: { name: 'Drafts', icon: '📝', count: 0 },
            trash: { name: 'Trash', icon: '🗑️', count: 0 },
            spam: { name: 'Spam', icon: '🚫', count: 0 },
            archive: { name: 'Archive', icon: '📁', count: 0 }
        };
        this.emailLabels = [
            { id: 'important', name: 'Important', color: '#ff4444' },
            { id: 'work', name: 'Work', color: '#4CAF50' },
            { id: 'personal', name: 'Personal', color: '#2196F3' },
            { id: 'shopping', name: 'Shopping', color: '#FF9800' },
            { id: 'deals', name: 'Deals', color: '#9C27B0' }
        ];
        this.currentFilter = 'all';
        this.selectedMessageIds = [];
        this.initializeData();
    }

    initializeData() {
        this.messages = [
            {
                id: 1,
                sender: "WATCH AI",
                recipient: "You",
                subject: "Welcome to Watch! 🎉",
                body: "Welcome to the Watch community! We're excited to help you discover amazing deals and connect with fellow luxury shoppers. You can now send messages, share deals, and plan shopping trips with friends.",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
                isRead: false,
                category: "system",
                attachments: [],
                folder: "inbox",
                labels: ["important"]
            },
            {
                id: 2,
                sender: "SHOPPING BUDDY",
                recipient: "You",
                subject: "Shopping Trip This Weekend? 🛍️",
                body: "Hey! I found some amazing deals on Nike Air Jordans. Want to plan a shopping trip together? I can share my exclusive access codes. Let me know if you're interested!",
                timestamp: new Date(Date.now() - 15 * 60 * 1000),
                isRead: false,
                category: "community",
                attachments: [],
                folder: "inbox",
                labels: ["shopping"]
            },
            {
                id: 3,
                sender: "LUXURY INSIDER",
                recipient: "You",
                subject: "VIP Access: Cartier Love Collection",
                body: "As a premium member, you have early access to the new Cartier Love Collection. Pre-order now before the public release. This exclusive collection features limited edition pieces that won't be available to the general public.",
                timestamp: new Date(Date.now() - 60 * 60 * 1000),
                isRead: true,
                category: "deals",
                attachments: [],
                folder: "inbox",
                labels: ["deals", "important"]
            },
            {
                id: 4,
                sender: "STYLE CURATOR",
                recipient: "You",
                subject: "Your Style Profile Updated ✨",
                body: "Based on your recent activity, we've updated your style preferences. Check out your new personalized recommendations! We've noticed you're interested in luxury bags and designer shoes.",
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
                isRead: true,
                category: "system",
                attachments: [],
                folder: "inbox",
                labels: ["personal"]
            },
            {
                id: 5,
                sender: "COMMUNITY MODERATOR",
                recipient: "You",
                subject: "Welcome to Basedly! 🎉",
                body: "Welcome to the Basedly community! We're excited to help you discover amazing deals and connect with fellow luxury shoppers. Feel free to reach out if you have any questions.",
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
                isRead: true,
                category: "community",
                attachments: [],
                folder: "inbox",
                labels: ["important"]
            }
        ];

        this.updateFolderCounts();
        this.loadFromStorage();
    }

    // Send a new message
    sendMessage(messageData) {
        const message = {
            id: Date.now(),
            sender: "You",
            recipient: messageData.recipient,
            subject: messageData.subject,
            body: messageData.body,
            timestamp: new Date(),
            isRead: true,
            category: "sent",
            attachments: messageData.attachments || [],
            folder: "sent",
            labels: messageData.labels || [],
            cc: messageData.cc || null
        };

        this.sentMessages.unshift(message);
        this.updateFolderCounts();
        this.saveToStorage();
        this.notifyMessageSent(message);
        
        return message;
    }

    // Get messages by folder
    getMessagesByFolder(folder = 'inbox') {
        if (folder === 'sent') {
            return this.sentMessages;
        }
        return this.messages.filter(message => message.folder === folder);
    }

    // Get message by ID
    getMessageById(messageId) {
        const message = this.messages.find(m => m.id === messageId);
        if (message) return message;
        
        return this.sentMessages.find(m => m.id === messageId);
    }

    // Mark message as read/unread
    toggleMessageRead(messageId) {
        const message = this.getMessageById(messageId);
        if (message) {
            message.isRead = !message.isRead;
            this.saveToStorage();
            this.updateFolderCounts();
            return message;
        }
        return null;
    }

    // Delete message
    deleteMessage(messageId) {
        let message = this.messages.find(m => m.id === messageId);
        let isSentMessage = false;
        
        if (!message) {
            message = this.sentMessages.find(m => m.id === messageId);
            isSentMessage = true;
        }

        if (message) {
            if (isSentMessage) {
                const index = this.sentMessages.findIndex(m => m.id === messageId);
                this.sentMessages.splice(index, 1);
            } else {
                const index = this.messages.findIndex(m => m.id === messageId);
                this.messages.splice(index, 1);
            }
            
            this.saveToStorage();
            this.updateFolderCounts();
            this.notifyMessageDeleted(message);
            return message;
        }
        return null;
    }

    // Move message to folder
    moveMessageToFolder(messageId, folder) {
        const message = this.getMessageById(messageId);
        if (message) {
            message.folder = folder;
            this.saveToStorage();
            this.updateFolderCounts();
            this.notifyMessageMoved(message, folder);
            return message;
        }
        return null;
    }

    // Add/remove labels
    toggleMessageLabel(messageId, labelId) {
        const message = this.getMessageById(messageId);
        if (message) {
            if (!message.labels) message.labels = [];
            
            const labelIndex = message.labels.indexOf(labelId);
            if (labelIndex > -1) {
                message.labels.splice(labelIndex, 1);
            } else {
                message.labels.push(labelId);
            }
            
            this.saveToStorage();
            return message;
        }
        return null;
    }

    // Search messages
    searchMessages(query) {
        const allMessages = [...this.messages, ...this.sentMessages];
        const searchTerm = query.toLowerCase();
        
        return allMessages.filter(message => 
            message.subject.toLowerCase().includes(searchTerm) ||
            message.body.toLowerCase().includes(searchTerm) ||
            message.sender.toLowerCase().includes(searchTerm) ||
            message.recipient.toLowerCase().includes(searchTerm)
        );
    }

    // Filter messages
    filterMessages(filter) {
        this.currentFilter = filter;
        
        switch (filter) {
            case 'unread':
                return this.messages.filter(message => !message.isRead);
            case 'deals':
                return this.messages.filter(message => message.category === 'deals');
            case 'community':
                return this.messages.filter(message => message.category === 'community');
            case 'sent':
                return this.sentMessages;
            case 'all':
            default:
                return this.messages;
        }
    }

    // Bulk actions
    selectMessage(messageId) {
        const index = this.selectedMessageIds.indexOf(messageId);
        if (index > -1) {
            this.selectedMessageIds.splice(index, 1);
        } else {
            this.selectedMessageIds.push(messageId);
        }
        return this.selectedMessageIds;
    }

    selectAllMessages() {
        const currentMessages = this.getCurrentFilteredMessages();
        this.selectedMessageIds = currentMessages.map(m => m.id);
        return this.selectedMessageIds;
    }

    clearSelection() {
        this.selectedMessageIds = [];
        return this.selectedMessageIds;
    }

    // Bulk mark as read/unread
    bulkMarkAsRead(read = true) {
        this.selectedMessageIds.forEach(messageId => {
            const message = this.getMessageById(messageId);
            if (message) {
                message.isRead = read;
            }
        });
        this.saveToStorage();
        this.updateFolderCounts();
        this.clearSelection();
        this.notifyBulkAction(`Marked ${this.selectedMessageIds.length} messages as ${read ? 'read' : 'unread'}`);
    }

    // Bulk move to folder
    bulkMoveToFolder(folder) {
        this.selectedMessageIds.forEach(messageId => {
            this.moveMessageToFolder(messageId, folder);
        });
        this.clearSelection();
        this.notifyBulkAction(`Moved ${this.selectedMessageIds.length} messages to ${folder}`);
    }

    // Bulk delete
    bulkDelete() {
        const count = this.selectedMessageIds.length;
        this.selectedMessageIds.forEach(messageId => {
            this.deleteMessage(messageId);
        });
        this.clearSelection();
        this.notifyBulkAction(`Deleted ${count} messages`);
    }

    // Get current filtered messages
    getCurrentFilteredMessages() {
        return this.filterMessages(this.currentFilter);
    }

    // Update folder counts
    updateFolderCounts() {
        this.emailFolders.inbox.count = this.messages.filter(m => m.folder === 'inbox').length;
        this.emailFolders.sent.count = this.sentMessages.length;
        this.emailFolders.drafts.count = this.messages.filter(m => m.folder === 'drafts').length;
        this.emailFolders.trash.count = this.messages.filter(m => m.folder === 'trash').length;
        this.emailFolders.spam.count = this.messages.filter(m => m.folder === 'spam').length;
        this.emailFolders.archive.count = this.messages.filter(m => m.folder === 'archive').length;
    }

    // Storage methods
    saveToStorage() {
        try {
            localStorage.setItem('basedlyMessages', JSON.stringify(this.messages));
            localStorage.setItem('basedlySentMessages', JSON.stringify(this.sentMessages));
        } catch (error) {
            console.error('Error saving messages to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const savedMessages = localStorage.getItem('basedlyMessages');
            const savedSentMessages = localStorage.getItem('basedlySentMessages');
            
            if (savedMessages) {
                this.messages = JSON.parse(savedMessages);
            }
            if (savedSentMessages) {
                this.sentMessages = JSON.parse(savedSentMessages);
            }
            
            this.updateFolderCounts();
        } catch (error) {
            console.error('Error loading messages from storage:', error);
        }
    }

    // Notification methods
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'var(--lux-hot-pink)' : type === 'success' ? '#4CAF50' : 'var(--lux-beige)'};
            color: var(--lux-white);
            padding: 16px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            z-index: 10000;
            max-width: 300px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Event notification methods
    notifyMessageSent(message) {
        this.showNotification(`Message sent to ${message.recipient}! ✨`, 'success');
    }

    notifyMessageDeleted(message) {
        this.showNotification(`Message "${message.subject}" deleted! ✨`, 'success');
    }

    notifyMessageMoved(message, folder) {
        this.showNotification(`Message moved to ${folder}! ✨`, 'success');
    }

    notifyBulkAction(message) {
        this.showNotification(message, 'success');
    }

    // Utility methods
    static formatTimestamp(timestamp) {
        const now = new Date();
        const messageDate = new Date(timestamp);
        const diffInHours = (now - messageDate) / (1000 * 60 * 60);
        
        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else if (diffInHours < 168) { // 7 days
            return `${Math.floor(diffInHours / 24)}d ago`;
        } else {
            return messageDate.toLocaleDateString();
        }
    }

    static validateMessageData(messageData) {
        const errors = [];
        
        if (!messageData.recipient || messageData.recipient.trim().length === 0) {
            errors.push('Recipient is required');
        }
        
        if (!messageData.subject || messageData.subject.trim().length === 0) {
            errors.push('Subject is required');
        }
        
        if (!messageData.body || messageData.body.trim().length === 0) {
            errors.push('Message body is required');
        }
        
        return errors;
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MessageService;
} else {
    window.MessageService = MessageService;
} 