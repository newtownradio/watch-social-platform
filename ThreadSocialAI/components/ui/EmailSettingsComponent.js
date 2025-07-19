// EmailSettingsComponent.js - OOP email settings dashboard
class EmailSettingsComponent extends ResponsiveBaseComponent {
    constructor(containerId, data = {}) {
        super('EmailSettings', null);
        this.containerId = containerId;
        this.data = {
            settings: {
                notifications: {
                    newMessages: true,
                    dealAlerts: true,
                    communityUpdates: true,
                    marketingEmails: false
                },
                display: {
                    showUnreadCount: true,
                    showPreview: true,
                    compactMode: false,
                    darkMode: true
                },
                filters: {
                    autoArchive: false,
                    spamProtection: true,
                    priorityInbox: true
                },
                privacy: {
                    readReceipts: false,
                    typingIndicators: true,
                    onlineStatus: true
                }
            },
            ...data
        };
        this.init();
    }

    init() {
        this.addSettingsStyles();
        this.render();
        this.setupEventListeners();
    }

    addSettingsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Email Settings Styles */
            .email-settings-container {
                background: var(--lux-dark-gray);
                border: 2px solid var(--lux-beige);
                border-radius: 12px;
                padding: clamp(20px, 4vw, 32px);
                margin-bottom: clamp(24px, 5vw, 40px);
                position: relative;
                overflow: hidden;
            }
            
            .email-settings-container::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, var(--lux-hot-pink) 0%, var(--lux-beige) 50%, var(--lux-hot-pink) 100%);
            }
            
            .settings-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: clamp(20px, 4vw, 32px);
                flex-wrap: wrap;
                gap: 16px;
            }
            
            .settings-title {
                color: var(--lux-beige);
                font-size: clamp(20px, 4vw, 28px);
                font-weight: 700;
                letter-spacing: 2px;
                margin: 0;
            }
            
            .settings-toggle {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--lux-white);
                font-size: clamp(12px, 2.5vw, 14px);
                cursor: pointer;
            }
            
            .settings-grid {
                display: grid;
                gap: clamp(16px, 3vw, 24px);
                grid-template-columns: 1fr;
            }
            
            .settings-section {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(245, 245, 220, 0.2);
                border-radius: 8px;
                padding: clamp(16px, 3vw, 24px);
            }
            
            .section-title {
                color: var(--lux-hot-pink);
                font-size: clamp(14px, 3vw, 18px);
                font-weight: 600;
                margin-bottom: clamp(12px, 2.5vw, 16px);
                letter-spacing: 1px;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .setting-item {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: clamp(8px, 2vw, 12px) 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .setting-item:last-child {
                border-bottom: none;
            }
            
            .setting-label {
                color: var(--lux-white);
                font-size: clamp(13px, 2.5vw, 15px);
                flex: 1;
            }
            
            .setting-description {
                color: var(--lux-white);
                opacity: 0.7;
                font-size: clamp(11px, 2vw, 12px);
                margin-top: 4px;
            }
            
            /* Toggle Switch */
            .toggle-switch {
                position: relative;
                width: 50px;
                height: 24px;
                background: var(--lux-dark-gray);
                border: 2px solid var(--lux-beige);
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .toggle-switch.active {
                background: var(--lux-hot-pink);
                border-color: var(--lux-hot-pink);
            }
            
            .toggle-switch::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                width: 16px;
                height: 16px;
                background: var(--lux-beige);
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .toggle-switch.active::after {
                transform: translateX(26px);
                background: var(--lux-white);
            }
            
            /* Quick Actions */
            .quick-actions {
                display: flex;
                gap: clamp(8px, 2vw, 12px);
                flex-wrap: wrap;
                margin-top: clamp(16px, 3vw, 24px);
            }
            
            .quick-action-btn {
                background: var(--lux-black);
                color: var(--lux-beige);
                border: 1px solid var(--lux-beige);
                padding: clamp(6px, 1.5vw, 8px) clamp(12px, 2.5vw, 16px);
                font-size: clamp(11px, 2vw, 12px);
                cursor: pointer;
                transition: all 0.3s ease;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .quick-action-btn:hover {
                background: var(--lux-beige);
                color: var(--lux-black);
            }
            
            /* Responsive Design */
            @media (min-width: 768px) {
                .settings-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
            
            @media (min-width: 1024px) {
                .settings-grid {
                    grid-template-columns: repeat(3, 1fr);
                }
            }
            
            @media (min-width: 1200px) {
                .settings-grid {
                    grid-template-columns: repeat(4, 1fr);
                }
            }
            
            /* Touch Device Optimizations */
            .touch-device .toggle-switch {
                min-height: 44px;
                min-width: 60px;
            }
            
            .touch-device .quick-action-btn {
                min-height: 44px;
                padding: 12px 20px;
            }
        `;
        document.head.appendChild(style);
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container ${this.containerId} not found`);
            return;
        }

        const settingsContainer = document.createElement('div');
        settingsContainer.className = 'email-settings-container';

        // Settings Header
        const settingsHeader = this.createSettingsHeader();
        settingsContainer.appendChild(settingsHeader);

        // Settings Grid
        const settingsGrid = this.createSettingsGrid();
        settingsContainer.appendChild(settingsGrid);

        // Quick Actions
        const quickActions = this.createQuickActions();
        settingsContainer.appendChild(quickActions);

        container.appendChild(settingsContainer);
        this.element = settingsContainer;
        
        if (this.resizeObserver) {
            this.resizeObserver.observe(settingsContainer);
        }
    }

    createSettingsHeader() {
        const header = document.createElement('div');
        header.className = 'settings-header';

        const title = document.createElement('h2');
        title.className = 'settings-title';
        title.textContent = 'EMAIL SETTINGS';

        const toggle = document.createElement('div');
        toggle.className = 'settings-toggle';
        toggle.innerHTML = `
            <span>QUICK VIEW</span>
            <div class="toggle-switch" id="quickViewToggle"></div>
        `;

        header.appendChild(title);
        header.appendChild(toggle);
        return header;
    }

    createSettingsGrid() {
        const grid = document.createElement('div');
        grid.className = 'settings-grid';

        // Notifications Section
        const notificationsSection = this.createSettingsSection('Notifications', '🔔', [
            { key: 'newMessages', label: 'New Messages', description: 'Get notified when you receive new messages' },
            { key: 'dealAlerts', label: 'Deal Alerts', description: 'Receive alerts for exclusive deals' },
            { key: 'communityUpdates', label: 'Community Updates', description: 'Stay updated with community activities' },
            { key: 'marketingEmails', label: 'Marketing Emails', description: 'Receive promotional content' }
        ], 'notifications');

        // Display Section
        const displaySection = this.createSettingsSection('Display', '⚙️', [
            { key: 'showUnreadCount', label: 'Show Unread Count', description: 'Display unread message count' },
            { key: 'showPreview', label: 'Show Preview', description: 'Show message preview in inbox' },
            { key: 'compactMode', label: 'Compact Mode', description: 'Use compact layout for messages' },
            { key: 'darkMode', label: 'Dark Mode', description: 'Use dark theme for emails' }
        ], 'display');

        // Filters Section
        const filtersSection = this.createSettingsSection('Filters', '🔍', [
            { key: 'autoArchive', label: 'Auto Archive', description: 'Automatically archive old messages' },
            { key: 'spamProtection', label: 'Spam Protection', description: 'Enable spam filtering' },
            { key: 'priorityInbox', label: 'Priority Inbox', description: 'Show important messages first' }
        ], 'filters');

        // Privacy Section
        const privacySection = this.createSettingsSection('Privacy', '🔒', [
            { key: 'readReceipts', label: 'Read Receipts', description: 'Send read receipts to senders' },
            { key: 'typingIndicators', label: 'Typing Indicators', description: 'Show when you are typing' },
            { key: 'onlineStatus', label: 'Online Status', description: 'Show your online status' }
        ], 'privacy');

        grid.appendChild(notificationsSection);
        grid.appendChild(displaySection);
        grid.appendChild(filtersSection);
        grid.appendChild(privacySection);

        return grid;
    }

    createSettingsSection(title, icon, settings, category) {
        const section = document.createElement('div');
        section.className = 'settings-section';

        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'section-title';
        sectionTitle.innerHTML = `${icon} ${title}`;
        section.appendChild(sectionTitle);

        settings.forEach(setting => {
            const settingItem = this.createSettingItem(setting, category);
            section.appendChild(settingItem);
        });

        return section;
    }

    createSettingItem(setting, category) {
        const item = document.createElement('div');
        item.className = 'setting-item';

        const labelContainer = document.createElement('div');
        const label = document.createElement('div');
        label.className = 'setting-label';
        label.textContent = setting.label;

        const description = document.createElement('div');
        description.className = 'setting-description';
        description.textContent = setting.description;

        labelContainer.appendChild(label);
        labelContainer.appendChild(description);

        const toggle = document.createElement('div');
        toggle.className = `toggle-switch ${this.data.settings[category][setting.key] ? 'active' : ''}`;
        toggle.dataset.setting = setting.key;
        toggle.dataset.category = category;

        item.appendChild(labelContainer);
        item.appendChild(toggle);

        return item;
    }

    createQuickActions() {
        const actions = document.createElement('div');
        actions.className = 'quick-actions';

        const actionButtons = [
            { text: 'Mark All Read', action: 'markAllRead' },
            { text: 'Archive All', action: 'archiveAll' },
            { text: 'Export Settings', action: 'exportSettings' },
            { text: 'Reset Defaults', action: 'resetDefaults' }
        ];

        actionButtons.forEach(button => {
            const btn = document.createElement('button');
            btn.className = 'quick-action-btn';
            btn.textContent = button.text;
            btn.dataset.action = button.action;
            actions.appendChild(btn);
        });

        return actions;
    }

    setupEventListeners() {
        // Toggle switches
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('toggle-switch')) {
                this.toggleSetting(e.target);
            }
        });

        // Quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action-btn')) {
                this.handleQuickAction(e.target.dataset.action);
            }
        });

        // Quick view toggle
        document.addEventListener('click', (e) => {
            if (e.target.id === 'quickViewToggle' || e.target.closest('#quickViewToggle')) {
                this.toggleQuickView();
            }
        });
    }

    toggleSetting(toggleElement) {
        const setting = toggleElement.dataset.setting;
        const category = toggleElement.dataset.category;
        
        this.data.settings[category][setting] = !this.data.settings[category][setting];
        toggleElement.classList.toggle('active');
        
        console.log(`Setting updated: ${category}.${setting} = ${this.data.settings[category][setting]}`);
        this.saveSettings();
    }

    handleQuickAction(action) {
        switch (action) {
            case 'markAllRead':
                this.markAllRead();
                break;
            case 'archiveAll':
                this.archiveAll();
                break;
            case 'exportSettings':
                this.exportSettings();
                break;
            case 'resetDefaults':
                this.resetDefaults();
                break;
        }
    }

    markAllRead() {
        console.log('Marking all messages as read');
    }

    archiveAll() {
        console.log('Archiving all messages');
    }

    exportSettings() {
        const settingsData = JSON.stringify(this.data.settings, null, 2);
        const blob = new Blob([settingsData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'email-settings.json';
        a.click();
        URL.revokeObjectURL(url);
    }

    resetDefaults() {
        if (confirm('Are you sure you want to reset all settings to defaults?')) {
            this.data.settings = this.getDefaultSettings();
            this.update(this.data);
            console.log('Settings reset to defaults');
        }
    }

    getDefaultSettings() {
        return {
            notifications: {
                newMessages: true,
                dealAlerts: true,
                communityUpdates: true,
                marketingEmails: false
            },
            display: {
                showUnreadCount: true,
                showPreview: true,
                compactMode: false,
                darkMode: true
            },
            filters: {
                autoArchive: false,
                spamProtection: true,
                priorityInbox: true
            },
            privacy: {
                readReceipts: false,
                typingIndicators: true,
                onlineStatus: true
            }
        };
    }

    toggleQuickView() {
        const toggle = document.getElementById('quickViewToggle');
        toggle.classList.toggle('active');
    }

    saveSettings() {
        localStorage.setItem('emailSettings', JSON.stringify(this.data.settings));
    }

    loadSettings() {
        const saved = localStorage.getItem('emailSettings');
        if (saved) {
            this.data.settings = JSON.parse(saved);
        }
    }

    updateSettings(newSettings) {
        this.data.settings = { ...this.data.settings, ...newSettings };
        this.update(this.data);
        this.saveSettings();
    }
} 
 