// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Scroll progress bar
    const scrollProgress = document.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        if (scrollProgress) {
            scrollProgress.style.width = scrollPercent + '%';
        }
    });

    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Enhanced scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add glow effect to buttons when they come into view
                if (entry.target.classList.contains('glow-on-scroll')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe all scroll-triggered elements
    const scrollElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in, .scroll-rotate-in, .glow-on-scroll, .bounce-on-scroll, .rotate-on-scroll, .slide-from-bottom, .zoom-in, .flip-on-scroll, .stagger-children, .text-reveal, .split-text');
    scrollElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Process steps animation
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Currency converter interaction
    const amountInputs = document.querySelectorAll('.amount-input');
    const exchangeRate = 0.855; // EUR to GBP rate

    amountInputs.forEach((input, index) => {
        input.addEventListener('input', function() {
            const value = parseFloat(this.value) || 0;
            const otherIndex = index === 0 ? 1 : 0;
            const otherInput = amountInputs[otherIndex];
            
            if (index === 0) {
                otherInput.value = (value * exchangeRate).toFixed(2);
            } else {
                otherInput.value = (value / exchangeRate).toFixed(2);
            }
        });
    });

    // Card hover effect
    const cardFront = document.querySelector('.card-front');
    if (cardFront) {
        cardFront.addEventListener('mouseenter', function() {
            this.style.transform = 'rotateY(-5deg) rotateX(5deg) scale(1.05)';
        });
        
        cardFront.addEventListener('mouseleave', function() {
            this.style.transform = 'rotateY(-15deg) rotateX(10deg)';
        });
    }

    // Feature cards hover effect
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Testimonial cards hover effect
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced parallax effects
    const parallaxElements = document.querySelectorAll('.parallax-element');
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // Hero section parallax
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.3;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Animate numbers
    function animateNumbers() {
        const numbers = document.querySelectorAll('.balance');
        numbers.forEach(number => {
            const target = parseFloat(number.textContent.replace(/[^\d.]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                number.textContent = `€${current.toFixed(2)}`;
            }, 20);
        });
    }

    // Trigger number animation when hero is in view
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                heroObserver.unobserve(entry.target);
            }
        });
    });

    if (hero) {
        heroObserver.observe(hero);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Button click effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple effect CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Split text animation
    function animateSplitText() {
        const splitTexts = document.querySelectorAll('.split-text');
        splitTexts.forEach(text => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate');
                    }
                });
            });
            observer.observe(text);
        });
    }

    // Counter animation
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            counter.textContent = `€${current.toFixed(2)}`;
                        }, 20);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(counter);
        });
    }

    // Particle system
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
    }

    // Dynamic background elements (like Grab&Go)
    function createDynamicBackground() {
        const dynamicBg = document.getElementById('dynamicBg');
        if (!dynamicBg) return;

        for (let i = 0; i < 15; i++) {
            const element = document.createElement('div');
            element.className = 'dynamic-element';
            element.style.width = Math.random() * 60 + 20 + 'px';
            element.style.height = element.style.width;
            element.style.left = Math.random() * 100 + '%';
            element.style.top = Math.random() * 100 + '%';
            element.style.animationDelay = Math.random() * 20 + 's';
            element.style.animationDuration = (Math.random() * 10 + 15) + 's';
            dynamicBg.appendChild(element);
        }
    }

    // Magnetic effect
    function initMagneticEffect() {
        const magneticElements = document.querySelectorAll('.magnetic');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'translate(0, 0)';
            });
        });
    }

    // Initialize all animations
    animateSplitText();
    animateCounters();
    createParticles();
    createDynamicBackground();
    initMagneticEffect();

    // Floating animation for app mockup
    const appMockup = document.querySelector('.app-mockup');
    if (appMockup) {
        setInterval(() => {
            appMockup.style.transform = 'translateY(-10px)';
            setTimeout(() => {
                appMockup.style.transform = 'translateY(0)';
            }, 1000);
        }, 2000);
    }

    // Counter animation for testimonials
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current);
            }, 20);
        });
    }

    // Trigger counter animation when testimonials section is in view
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        const testimonialsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    testimonialsObserver.unobserve(entry.target);
                }
            });
        });
        testimonialsObserver.observe(testimonialsSection);
    }

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add enhanced CSS for scroll animations
    const enhancedStyle = document.createElement('style');
    enhancedStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        /* Staggered animations for elements */
        .scroll-fade-in:nth-child(1) { transition-delay: 0.1s; }
        .scroll-fade-in:nth-child(2) { transition-delay: 0.2s; }
        .scroll-fade-in:nth-child(3) { transition-delay: 0.3s; }
        .scroll-fade-in:nth-child(4) { transition-delay: 0.4s; }
        
        /* Enhanced hover effects */
        .feature-card:hover .feature-icon {
            transform: scale(1.1) rotate(5deg);
        }
        
        .testimonial-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Enhanced button effects */
        .btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.3);
        }
        
        /* Floating animation variations */
        .floating-slow {
            animation: float 8s ease-in-out infinite;
        }
        
        .floating-fast {
            animation: float 4s ease-in-out infinite;
        }
    `;
    document.head.appendChild(enhancedStyle);
});

// Enhanced scroll effects (Grab&Go style)
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax effects for different sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        section.style.transform = `translateY(${yPos}px)`;
    });
    
    // Scale effect for cards on scroll
    const cards = document.querySelectorAll('.feature-card, .testimonial-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scale = 1 + (rect.top / window.innerHeight) * 0.1;
            card.style.transform = `scale(${scale})`;
        }
    });
    
    // Dynamic background movement (Grab&Go style)
    const dynamicElements = document.querySelectorAll('.dynamic-element');
    dynamicElements.forEach((element, index) => {
        const speed = 0.2 + (index * 0.1);
        const xPos = -(scrolled * speed * 0.5);
        const yPos = -(scrolled * speed * 0.3);
        element.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
    
    // Shimmer effect on scroll
    const shimmerElements = document.querySelectorAll('.hero::after, .card-section::before');
    shimmerElements.forEach(element => {
        const opacity = 0.3 + (scrolled * 0.0001);
        element.style.opacity = Math.min(opacity, 0.8);
    });
});

// Add CSS for smooth transitions
const transitionStyle = document.createElement('style');
transitionStyle.textContent = `
    * {
        transition: all 0.3s ease;
    }
    
    .navbar {
        transition: transform 0.3s ease, background-color 0.3s ease;
    }
    
    .feature-card, .testimonial-card, .step {
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    
    .card-front {
        transition: transform 0.3s ease;
    }
    
    .btn {
        transition: all 0.3s ease;
    }
    
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(transitionStyle); 