// Scroll Animations & Interactions

// Initialize scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Handle staggered animations
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.animationDelay = `${delay}s`;
                }, 10);
                
                // Observer can stop observing after animation triggers
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax scrolling effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', CriyagenUtils.throttle(() => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }, 16));
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter-number, .stat-number, .milestone-counter');
    
    if (counters.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
                const suffix = counter.getAttribute('data-suffix') || '';
                const duration = 2000;
                const startTime = Date.now();
                
                function updateCounter() {
                    const currentTime = Date.now();
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Easing function for smooth animation
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(easeOutQuart * target);
                    
                    counter.textContent = currentValue + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Progress bar animations
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill, .sustainability-progress');
    
    if (progressBars.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width') || '100';
                
                // Animate progress bar
                setTimeout(() => {
                    progressBar.style.width = `${width}%`;
                }, 300);
                
                // Animate percentage text if present
                const percentageText = progressBar.parentElement.querySelector('.progress-value');
                if (percentageText) {
                    animatePercentage(percentageText, parseInt(width));
                }
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Animate percentage counter
function animatePercentage(element, target) {
    const duration = 1500;
    const startTime = Date.now();
    
    function updatePercentage() {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(easeOutCubic * target);
        
        element.textContent = `${currentValue}%`;
        
        if (progress < 1) {
            requestAnimationFrame(updatePercentage);
        }
    }
    
    updatePercentage();
}

// Typewriter effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.unobserve(element);
            }
        });
        
        observer.observe(element);
    });
}

// Initialize all animations when page loads
window.addEventListener('load', function() {
    initScrollAnimations();
    initParallax();
    initCounters();
    initProgressBars();
    initTypewriter();
    
    // Add loaded class to body for CSS transitions
    document.body.classList.add('page-loaded');
});

// Export functions for use in other scripts
window.CriyagenAnimations = {
    initScrollAnimations,
    initParallax,
    initCounters,
    initProgressBars,
    initTypewriter,
    animatePercentage
};
