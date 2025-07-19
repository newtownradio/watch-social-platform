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