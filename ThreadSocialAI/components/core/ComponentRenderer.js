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