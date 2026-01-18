// components.js - Component Loader
class ComponentLoader {
    constructor() {
        this.components = {};
        this.init();
    }
    
    async init() {
        await this.loadComponents();
        this.initializeComponents();
    }
    
    async loadComponents() {
        const components = [
            { name: 'header', file: 'components/header.html' },
            { name: 'footer', file: 'components/footer.html' },
            { name: 'newsletter', file: 'components/newsletter.html' },
            { name: 'testimonials', file: 'components/testimonials.html' }
        ];
        
        for (const component of components) {
            try {
                const response = await fetch(component.file);
                const html = await response.text();
                this.components[component.name] = html;
                
                // Inject component into placeholder
                const placeholder = document.querySelector(`[data-component="${component.name}"]`);
                if (placeholder) {
                    placeholder.innerHTML = html;
                }
            } catch (error) {
                console.error(`Failed to load component: ${component.name}`, error);
            }
        }
    }
    
    initializeComponents() {
        // Components auto-initialize through their own scripts
        console.log('All components loaded and initialized');
    }
    
    getComponent(name) {
        return this.components[name] || null;
    }
}

// Initialize component loader
document.addEventListener('DOMContentLoaded', () => {
    window.componentLoader = new ComponentLoader();
});
