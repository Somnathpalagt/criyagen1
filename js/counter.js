// Counter Animation Library

class Counter {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            start: 0,
            end: parseInt(element.getAttribute('data-count')) || 100,
            duration: parseInt(element.getAttribute('data-duration')) || 2000,
            suffix: element.getAttribute('data-suffix') || '',
            prefix: element.getAttribute('data-prefix') || '',
            separator: element.getAttribute('data-separator') || '',
            decimals: parseInt(element.getAttribute('data-decimals')) || 0,
            easing: element.getAttribute('data-easing') || 'easeOutCubic',
            ...options
        };
        
        this.animated = false;
        this.init();
    }
    
    init() {
        // Set initial value
        this.element.textContent = this.formatNumber(this.options.start);
        
        // Create observer
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.start();
                    this.animated = true;
                }
            });
        }, { threshold: 0.5 });
        
        this.observer.observe(this.element);
    }
    
    start() {
        const startTime = Date.now();
        
        const animate = () => {
            const currentTime = Date.now();
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / this.options.duration, 1);
            
            // Apply easing
            const easedProgress = this.easingFunctions[this.options.easing](progress);
            
            // Calculate current value
            const currentValue = this.options.start + 
                (this.options.end - this.options.start) * easedProgress;
            
            // Update element
            this.element.textContent = this.formatNumber(currentValue);
            
            // Continue animation if not finished
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }
    
    formatNumber(number) {
        let formatted = number.toFixed(this.options.decimals);
        
        // Add thousand separator
        if (this.options.separator) {
            formatted = formatted.replace(/\B(?=(\d{3})+(?!\d))/g, this.options.separator);
        }
        
        // Add prefix and suffix
        return this.options.prefix + formatted + this.options.suffix;
    }
    
    easingFunctions = {
        linear: t => t,
        easeInQuad: t => t * t,
        easeOutQuad: t => t * (2 - t),
        easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
        easeInCubic: t => t * t * t,
        easeOutCubic: t => (--t) * t * t + 1,
        easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        easeInQuart: t => t * t * t * t,
        easeOutQuart: t => 1 - (--t) * t * t * t,
        easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
        easeInQuint: t => t * t * t * t * t,
        easeOutQuint: t => 1 + (--t) * t * t * t * t,
        easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
    }
}

// Initialize all counters on page
function initAdvancedCounters() {
    const counterElements = document.querySelectorAll('[data-counter]');
    
    counterElements.forEach(element => {
        new Counter(element);
    });
}

// Export
window.CriyagenCounters = {
    Counter,
    initAdvancedCounters
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', initAdvancedCounters);
