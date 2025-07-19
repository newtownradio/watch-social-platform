// ComponentRenderer.js - Main rendering engine
class ComponentRenderer {
    constructor() {
        this.components = new Map();
        this.activePage = null;
        this.renderQueue = [];
        this.isRendering = false;
    }

    // Register a component
    registerComponent(name, componentClass) {
        this.components.set(name, componentClass);
        console.log(`Registered component: ${name}`);
    }

    // Create and render a component
    renderComponent(name, containerId, data = {}) {
        const ComponentClass = this.components.get(name);
        if (!ComponentClass) {
            console.error(`Component ${name} not found`);
            return null;
        }

        const component = new ComponentClass(containerId, data);
        component.render();
        return component;
    }

    // Batch render multiple components
    batchRender(renderTasks) {
        this.renderQueue.push(...renderTasks);
        this.processRenderQueue();
    }

    // Process the render queue
    async processRenderQueue() {
        if (this.isRendering) return;
        
        this.isRendering = true;
        
        for (const task of this.renderQueue) {
            await this.renderComponent(task.name, task.containerId, task.data);
        }
        
        this.renderQueue = [];
        this.isRendering = false;
    }

    // Clear all components
    clearAll() {
        this.components.forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        this.components.clear();
    }
}

// Global renderer instance
window.componentRenderer = new ComponentRenderer();

// BaseComponent.js - Enhanced base class for all components
class BaseComponent {
    constructor(containerId, data = {}) {
        this.containerId = containerId;
        this.data = data;
        this.element = null;
        this.children = [];
        this.isRendered = false;
        this.eventListeners = new Map();
        
        this.init();
    }

    init() {
        this.setupData();
        this.setupStyles();
        this.setupEvents();
    }

    setupData() {
        // Override in subclasses to setup data
    }

    setupStyles() {
        // Override in subclasses to setup styles
    }

    setupEvents() {
        // Override in subclasses to setup events
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container ${this.containerId} not found`);
            return;
        }

        this.element = this.createElement();
        if (this.element) {
            container.appendChild(this.element);
            this.isRendered = true;
            this.afterRender();
        }
    }

    createElement() {
        throw new Error('createElement must be implemented by subclass');
    }

    afterRender() {
        // Override in subclasses
    }

    update(newData) {
        this.data = { ...this.data, ...newData };
        if (this.isRendered) {
            this.element.remove();
            this.render();
        }
    }

    destroy() {
        // Remove event listeners
        this.eventListeners.forEach((listener, element) => {
            element.removeEventListener(listener.event, listener.handler);
        });
        this.eventListeners.clear();

        // Destroy children
        this.children.forEach(child => child.destroy());
        this.children = [];

        // Remove element
        if (this.element) {
            this.element.remove();
            this.element = null;
        }

        this.isRendered = false;
    }

    addChild(childComponent) {
        this.children.push(childComponent);
    }

    addEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        this.eventListeners.set(element, { event, handler });
    }

    // Helper methods for creating styled elements
    createStyledElement(tag, styles = {}, attributes = {}) {
        const element = document.createElement(tag);
        
        // Apply styles
        Object.assign(element.style, styles);
        
        // Apply attributes
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        return element;
    }

    // Helper method for creating luxury-styled elements
    createLuxuryElement(tag, content = '', options = {}) {
        const element = this.createStyledElement(tag, {
            fontFamily: 'var(--lux-font-family)',
            color: 'var(--lux-white)',
            ...options.styles
        }, options.attributes);

        if (content) {
            element.innerHTML = content;
        }

        return element;
    }
}

// PageComponent.js - Base class for page-level components
class PageComponent extends BaseComponent {
    constructor(containerId, data = {}) {
        super(containerId, data);
        this.sections = new Map();
        this.navigation = null;
        this.footer = null;
    }

    setupData() {
        this.pageTitle = this.data.title || 'WATCH';
        this.pageDescription = this.data.description || '';
    }

    setupStyles() {
        // Add page-specific styles
        this.addPageStyles();
    }

    addPageStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .page-container {
                min-height: 100vh;
                background: var(--lux-black);
                color: var(--lux-white);
            }
            
            .page-content {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .page-header {
                text-align: center;
                margin-bottom: 40px;
            }
            
            .page-title {
                font-size: 48px;
                color: var(--lux-beige);
                font-weight: 900;
                margin-bottom: 16px;
                letter-spacing: 3px;
            }
            
            .page-description {
                font-size: 20px;
                color: var(--lux-white);
                opacity: 0.9;
                letter-spacing: 1px;
            }
        `;
        document.head.appendChild(style);
    }

    createElement() {
        const pageContainer = this.createStyledElement('div', {
            className: 'page-container'
        });

        // Add navigation
        if (this.navigation) {
            pageContainer.appendChild(this.navigation.createElement());
        }

        // Add page content
        const pageContent = this.createStyledElement('div', {
            className: 'page-content'
        });

        // Add page header
        const pageHeader = this.createStyledElement('div', {
            className: 'page-header'
        });

        const pageTitle = this.createStyledElement('h1', {
            className: 'page-title'
        }, {}, this.pageTitle);

        const pageDescription = this.createStyledElement('p', {
            className: 'page-description'
        }, {}, this.pageDescription);

        pageHeader.appendChild(pageTitle);
        pageHeader.appendChild(pageDescription);
        pageContent.appendChild(pageHeader);

        // Add sections
        this.sections.forEach(section => {
            pageContent.appendChild(section.createElement());
        });

        // Add footer
        if (this.footer) {
            pageContent.appendChild(this.footer.createElement());
        }

        pageContainer.appendChild(pageContent);
        return pageContainer;
    }

    addSection(name, sectionComponent) {
        this.sections.set(name, sectionComponent);
    }

    setNavigation(navigationComponent) {
        this.navigation = navigationComponent;
    }

    setFooter(footerComponent) {
        this.footer = footerComponent;
    }
}

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