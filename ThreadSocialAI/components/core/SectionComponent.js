// SectionComponent.js - Base class for section-level components
class SectionComponent extends BaseComponent {
    constructor(containerId, data = {}) {
        super(containerId, data);
        this.items = [];
        this.layout = data.layout || 'grid';
    }

    setupStyles() {
        this.addSectionStyles();
    }

    addSectionStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .section-container {
                margin-bottom: 40px;
                padding: 32px;
                background: var(--lux-dark-gray);
                border: 2px solid var(--lux-beige);
                border-radius: 12px;
            }
            
            .section-header {
                margin-bottom: 24px;
                text-align: center;
            }
            
            .section-title {
                font-size: 32px;
                color: var(--lux-beige);
                font-weight: 700;
                margin-bottom: 12px;
                letter-spacing: 2px;
            }
            
            .section-description {
                font-size: 16px;
                color: var(--lux-white);
                opacity: 0.8;
            }
            
            .section-content {
                display: grid;
                gap: 20px;
            }
            
            .section-content.grid {
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            }
            
            .section-content.list {
                grid-template-columns: 1fr;
            }
        `;
        document.head.appendChild(style);
    }

    createElement() {
        const sectionContainer = this.createStyledElement('div', {
            className: 'section-container'
        });

        // Add section header
        const sectionHeader = this.createStyledElement('div', {
            className: 'section-header'
        });

        const sectionTitle = this.createStyledElement('h2', {
            className: 'section-title'
        }, {}, this.data.title || 'Section');

        const sectionDescription = this.createStyledElement('p', {
            className: 'section-description'
        }, {}, this.data.description || '');

        sectionHeader.appendChild(sectionTitle);
        sectionHeader.appendChild(sectionDescription);
        sectionContainer.appendChild(sectionHeader);

        // Add section content
        const sectionContent = this.createStyledElement('div', {
            className: `section-content ${this.layout}`
        });

        this.items.forEach(item => {
            sectionContent.appendChild(item.createElement());
        });

        sectionContainer.appendChild(sectionContent);
        return sectionContainer;
    }

    addItem(itemComponent) {
        this.items.push(itemComponent);
    }

    clearItems() {
        this.items.forEach(item => item.destroy());
        this.items = [];
    }
} 