// MessagesPageComponent.js - Messages page component
class MessagesPageComponent extends BaseComponent {
    constructor(dataManager) {
        super('MessagesPage', dataManager);
    }

    createElement(data = {}) {
        const container = document.createElement('div');
        container.style.cssText = `
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        `;

        // Page title
        const title = this.createStyledElement('h2', `
            color: var(--lux-hot-pink);
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, 'MESSAGES');

        // Subtitle
        const subtitle = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `, 'Stay connected with your shopping community');

        // Broadcast section
        const broadcastSection = this.createBroadcastSection();
        
        // Message filters
        const messageFilters = this.createMessageFilters();
        
        // Messages container
        const messagesContainer = document.createElement('div');
        messagesContainer.id = 'messages-container';
        messagesContainer.style.cssText = `
            margin-top: 20px;
        `;

        container.appendChild(title);
        container.appendChild(subtitle);
        container.appendChild(broadcastSection);
        container.appendChild(messageFilters);
        container.appendChild(messagesContainer);
        
        return container;
    }

    createBroadcastSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: var(--lux-dark-gray);
            border: 2px solid var(--lux-hot-pink);
            padding: 20px;
            margin-bottom: 20px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-hot-pink);
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 12px;
        `, 'BROADCAST MESSAGE');

        const input = document.createElement('textarea');
        input.placeholder = 'Share your shopping trip or find...';
        input.style.cssText = `
            width: 100%;
            min-height: 80px;
            padding: 12px;
            background: var(--lux-black);
            border: 1px solid var(--lux-hot-pink);
            color: var(--lux-white);
            font-size: 14px;
            resize: vertical;
            margin-bottom: 12px;
        `;

        const button = this.createStyledElement('button', `
            padding: 8px 16px;
            background: var(--lux-hot-pink);
            color: var(--lux-black);
            border: none;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
        `, 'BROADCAST');

        this.addEventListeners(button, {
            'click': () => this.handleBroadcast(input.value),
            'mouseenter': () => {
                button.style.background = '#FF69B4';
                button.style.transform = 'translateY(-1px)';
            },
            'mouseleave': () => {
                button.style.background = 'var(--lux-hot-pink)';
                button.style.transform = 'translateY(0)';
            }
        });

        section.appendChild(title);
        section.appendChild(input);
        section.appendChild(button);
        
        return section;
    }

    createMessageFilters() {
        const container = document.createElement('div');
        container.style.cssText = `
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
        `;

        const filters = ['All', 'Broadcasts', 'Direct', 'Group'];
        
        filters.forEach(filter => {
            const button = this.createStyledElement('button', `
                padding: 6px 12px;
                background: var(--lux-dark-gray);
                border: 1px solid var(--lux-hot-pink);
                color: var(--lux-white);
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 1px;
                cursor: pointer;
                transition: all 0.3s ease;
            `, filter);

            this.addEventListeners(button, {
                'click': () => this.handleMessageFilter(filter),
                'mouseenter': () => {
                    button.style.background = 'var(--lux-hot-pink)';
                    button.style.color = 'var(--lux-black)';
                },
                'mouseleave': () => {
                    button.style.background = 'var(--lux-dark-gray)';
                    button.style.color = 'var(--lux-white)';
                }
            });

            container.appendChild(button);
        });

        return container;
    }

    handleBroadcast(message) {
        if (message.trim()) {
            console.log('Broadcasting message:', message);
            if (window.appController) {
                window.appController.composeMessage(message);
            }
        }
    }

    handleMessageFilter(filter) {
        console.log('Message filter:', filter);
        if (window.appController) {
            window.appController.filterMessages(filter);
        }
    }

    afterRender() {
        this.loadMessages();
    }

    loadMessages() {
        if (this.dataManager) {
            const messages = this.dataManager.getMessages();
            this.renderMessages(messages);
        }
    }

    renderMessages(messages) {
        const container = document.getElementById('messages-container');
        if (!container) return;

        container.innerHTML = '';
        messages.forEach(message => {
            const messageElement = this.createMessageCard(message);
            container.appendChild(messageElement);
        });
    }

    createMessageCard(message) {
        const card = document.createElement('div');
        card.style.cssText = `
            background: var(--lux-dark-gray);
            border: 1px solid var(--lux-hot-pink);
            padding: 16px;
            margin-bottom: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        const header = this.createStyledElement('div', `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        `);

        const sender = this.createStyledElement('span', `
            color: var(--lux-hot-pink);
            font-weight: 600;
            font-size: 14px;
        `, message.sender);

        const time = this.createStyledElement('span', `
            color: var(--lux-white);
            font-size: 12px;
            opacity: 0.6;
        `, message.time);

        const content = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 14px;
            line-height: 1.4;
            margin: 0;
        `, message.content);

        this.addEventListeners(card, {
            'click': () => this.handleMessageClick(message.id),
            'mouseenter': () => {
                card.style.transform = 'translateX(4px)';
                card.style.borderColor = '#FF69B4';
            },
            'mouseleave': () => {
                card.style.transform = 'translateX(0)';
                card.style.borderColor = 'var(--lux-hot-pink)';
            }
        });

        header.appendChild(sender);
        header.appendChild(time);
        card.appendChild(header);
        card.appendChild(content);
        
        return card;
    }

    handleMessageClick(messageId) {
        console.log('Message clicked:', messageId);
        if (window.appController) {
            window.appController.handleMessageClick(messageId);
        }
    }

    getIOSEquivalent() {
        return {
            type: 'UIViewController',
            title: 'MESSAGES',
            view: {
                backgroundColor: '#000000',
                tableView: {
                    style: 'grouped',
                    cellStyle: 'subtitle'
                }
            }
        };
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MessagesPageComponent;
} 