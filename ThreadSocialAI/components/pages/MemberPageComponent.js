// MemberPageComponent.js - Member/Profile page component
class MemberPageComponent extends BaseComponent {
    constructor(dataManager) {
        super('MemberPage', dataManager);
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
        `, 'MEMBER');

        // Subtitle
        const subtitle = this.createStyledElement('p', `
            color: var(--lux-white);
            font-size: 16px;
            text-align: center;
            margin-bottom: 32px;
            opacity: 0.8;
        `, 'Manage your profile and preferences');

        // Profile section
        const profileSection = this.createProfileSection();
        
        // Preferences section
        const preferencesSection = this.createPreferencesSection();
        
        // Settings section
        const settingsSection = this.createSettingsSection();

        container.appendChild(title);
        container.appendChild(subtitle);
        container.appendChild(profileSection);
        container.appendChild(preferencesSection);
        container.appendChild(settingsSection);
        
        return container;
    }

    createProfileSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--lux-hot-pink);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-beige);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, '👤 PROFILE');

        const profileInfo = document.createElement('div');
        profileInfo.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 16px;
            margin-bottom: 24px;
        `;

        const nameField = this.createProfileField('Name', 'John Doe');
        const emailField = this.createProfileField('Email', 'john@example.com');
        const locationField = this.createProfileField('Location', 'Los Angeles, CA');

        profileInfo.appendChild(nameField);
        profileInfo.appendChild(emailField);
        profileInfo.appendChild(locationField);

        const editButton = this.createStyledElement('button', `
            background: var(--lux-hot-pink);
            color: var(--lux-white);
            border: none;
            padding: 16px 32px;
            font-size: 16px;
            font-weight: 700;
            letter-spacing: 1px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: block;
            margin: 0 auto;
        `, 'EDIT PROFILE');

        editButton.addEventListener('click', () => {
            this.editProfile();
        });

        section.appendChild(title);
        section.appendChild(profileInfo);
        section.appendChild(editButton);
        
        return section;
    }

    createProfileField(label, value) {
        const field = document.createElement('div');
        field.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        `;

        const labelElement = this.createStyledElement('span', `
            color: var(--lux-white);
            font-weight: 600;
            font-size: 16px;
        `, label);

        const valueElement = this.createStyledElement('span', `
            color: var(--lux-beige);
            font-size: 16px;
        `, value);

        field.appendChild(labelElement);
        field.appendChild(valueElement);
        
        return field;
    }

    createPreferencesSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--lux-beige);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 32px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-hot-pink);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, '⚙️ PREFERENCES');

        const preferencesList = document.createElement('div');
        preferencesList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 16px;
        `;

        const preferences = [
            { label: 'Push Notifications', enabled: true },
            { label: 'Email Updates', enabled: false },
            { label: 'Location Services', enabled: true },
            { label: 'Social Sharing', enabled: true }
        ];

        preferences.forEach(pref => {
            const preferenceItem = this.createPreferenceItem(pref);
            preferencesList.appendChild(preferenceItem);
        });

        section.appendChild(title);
        section.appendChild(preferencesList);
        
        return section;
    }

    createPreferenceItem(preference) {
        const item = document.createElement('div');
        item.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
        `;

        const label = this.createStyledElement('span', `
            color: var(--lux-white);
            font-size: 16px;
        `, preference.label);

        const toggle = this.createToggleSwitch(preference.enabled, (enabled) => {
            this.updatePreference(preference.label, enabled);
        });

        item.appendChild(label);
        item.appendChild(toggle);
        
        return item;
    }

    createToggleSwitch(enabled, onChange) {
        const toggle = document.createElement('div');
        toggle.style.cssText = `
            width: 50px;
            height: 24px;
            background: ${enabled ? 'var(--lux-hot-pink)' : 'rgba(255, 255, 255, 0.2)'};
            border-radius: 12px;
            position: relative;
            cursor: pointer;
            transition: all 0.3s ease;
        `;

        const slider = document.createElement('div');
        slider.style.cssText = `
            width: 20px;
            height: 20px;
            background: var(--lux-white);
            border-radius: 50%;
            position: absolute;
            top: 2px;
            left: ${enabled ? '26px' : '2px'};
            transition: all 0.3s ease;
        `;

        toggle.appendChild(slider);

        toggle.addEventListener('click', () => {
            const newState = !enabled;
            toggle.style.background = newState ? 'var(--lux-hot-pink)' : 'rgba(255, 255, 255, 0.2)';
            slider.style.left = newState ? '26px' : '2px';
            onChange(newState);
        });

        return toggle;
    }

    createSettingsSection() {
        const section = document.createElement('div');
        section.style.cssText = `
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid var(--lux-hot-pink);
            border-radius: 12px;
            padding: 24px;
        `;

        const title = this.createStyledElement('h3', `
            color: var(--lux-beige);
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 16px;
            text-align: center;
        `, '🔧 SETTINGS');

        const settingsList = document.createElement('div');
        settingsList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        const settings = [
            { label: 'Privacy Policy', action: () => this.openPrivacyPolicy() },
            { label: 'Terms of Service', action: () => this.openTermsOfService() },
            { label: 'Help & Support', action: () => this.openHelpSupport() },
            { label: 'Sign Out', action: () => this.signOut() }
        ];

        settings.forEach(setting => {
            const settingItem = this.createSettingItem(setting);
            settingsList.appendChild(settingItem);
        });

        section.appendChild(title);
        section.appendChild(settingsList);
        
        return section;
    }

    createSettingItem(setting) {
        const item = document.createElement('button');
        item.style.cssText = `
            background: none;
            border: none;
            color: var(--lux-white);
            font-size: 16px;
            text-align: left;
            padding: 12px 0;
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        `;
        item.textContent = setting.label;

        item.addEventListener('click', setting.action);
        
        return item;
    }

    editProfile() {
        console.log('Editing profile...');
        // Add profile editing logic here
    }

    updatePreference(preference, enabled) {
        console.log(`Updated ${preference}: ${enabled}`);
        // Add preference update logic here
    }

    openPrivacyPolicy() {
        console.log('Opening privacy policy...');
        // Add privacy policy logic here
    }

    openTermsOfService() {
        console.log('Opening terms of service...');
        // Add terms of service logic here
    }

    openHelpSupport() {
        console.log('Opening help & support...');
        // Add help & support logic here
    }

    signOut() {
        console.log('Signing out...');
        // Add sign out logic here
        if (window.AuthManager) {
            window.AuthManager.signOut();
        }
    }

    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const element = this.createElement(data);
        container.appendChild(element);
    }
} 