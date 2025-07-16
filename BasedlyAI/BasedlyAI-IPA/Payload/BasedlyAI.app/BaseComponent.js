// BaseComponent.js - Base class for all UI components
class BaseComponent {
    constructor(name, dataManager = null) {
        this.name = name;
        this.dataManager = dataManager;
        this.element = null;
        this.isRendered = false;
    }

    // Initialize the component
    initialize() {
        console.log(`Initializing ${this.name} component`);
    }

    // Render the component
    render(containerId, data = {}) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container ${containerId} not found for ${this.name}`);
            return;
        }

        this.element = this.createElement(data);
        if (this.element) {
            container.appendChild(this.element);
            this.isRendered = true;
            this.afterRender();
        }
    }

    // Create the DOM element (to be implemented by subclasses)
    createElement(data) {
        throw new Error('createElement must be implemented by subclass');
    }

    // Hook for post-render operations
    afterRender() {
        // Override in subclasses if needed
    }

    // Update the component with new data
    update(data) {
        if (this.element && this.isRendered) {
            this.element.remove();
            this.render(this.element.parentElement.id, data);
        }
    }

    // Destroy the component
    destroy() {
        if (this.element) {
            this.element.remove();
            this.element = null;
            this.isRendered = false;
        }
    }

    // Get iOS equivalent component structure
    getIOSEquivalent() {
        return {
            type: 'UIView',
            componentName: this.name
        };
    }

    // Helper method to create styled elements
    createStyledElement(tag, styles, content = '') {
        const element = document.createElement(tag);
        element.style.cssText = styles;
        if (content) {
            element.textContent = content;
        }
        return element;
    }

    // Helper method to add event listeners
    addEventListeners(element, listeners) {
        Object.entries(listeners).forEach(([event, handler]) => {
            element.addEventListener(event, handler);
        });
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseComponent;
} 