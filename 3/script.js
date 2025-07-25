// Modern JavaScript for FinFlow Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
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

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Button hover effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            // Ripple effect
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

    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Step hover effects
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Navigation scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb, .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });

    // Animate numbers in hero stats
    function animateNumbers() {
        const numbers = document.querySelectorAll('.stat-number');
        numbers.forEach(number => {
            const text = number.textContent;
            const isCurrency = text.includes('$');
            const isPlus = text.includes('+');
            
            let target;
            if (isCurrency) {
                target = parseFloat(text.replace(/[^\d.]/g, ''));
            } else {
                target = parseInt(text.replace(/[^\d]/g, ''));
            }
            
            const increment = target / 50;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (isCurrency) {
                    number.textContent = `$${current.toFixed(0)}B+`;
                } else if (isPlus) {
                    number.textContent = `${Math.floor(current)}+`;
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 30);
        });
    }

    // Trigger number animation when hero is in view
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    heroObserver.unobserve(entry.target);
                }
            });
        });
        heroObserver.observe(hero);
    }

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
        
        /* Animation classes */
        .feature-card, .step, .pricing-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .feature-card.animate, .step.animate, .pricing-card.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Staggered animations */
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
        
        .step:nth-child(1) { transition-delay: 0.1s; }
        .step:nth-child(2) { transition-delay: 0.2s; }
        .step:nth-child(3) { transition-delay: 0.3s; }
        
        .pricing-card:nth-child(1) { transition-delay: 0.1s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.3s; }
        
        .testimonial-card:nth-child(1) { transition-delay: 0.1s; }
        .testimonial-card:nth-child(2) { transition-delay: 0.2s; }
        .testimonial-card:nth-child(3) { transition-delay: 0.3s; }
        
        /* Mobile menu styles */
        @media (max-width: 768px) {
            .nav-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 2rem;
                box-shadow: var(--shadow-lg);
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
            }
            
            .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            .mobile-menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .mobile-menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Smooth scrolling */
        html {
            scroll-behavior: smooth;
        }
        
        /* Enhanced hover effects */
        .feature-card:hover {
            transform: translateY(-8px) !important;
        }
        
        .pricing-card:hover {
            transform: translateY(-8px) !important;
        }
        
        .testimonial-card:hover {
            transform: translateY(-8px) !important;
        }
        
        /* Loading animation */
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // Add loading class
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Enhanced interactions for pricing cards
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('featured')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });

    // Enhanced interactions for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Enhanced interactions for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const stars = this.querySelector('.stars');
            if (stars) {
                stars.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const stars = this.querySelector('.stars');
            if (stars) {
                stars.style.transform = 'scale(1)';
            }
        });
    });

    // Smooth reveal animations for sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s ease';
        sectionObserver.observe(section);
    });

    // Enhanced navigation interactions
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
        });
    });

    // Footer link interactions
    const footerLinks = document.querySelectorAll('.footer-column a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'white';
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'translateX(0)';
        });
    });

    // Social media link interactions
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .pricing-card, .testimonial-card, .step');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb, .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Initialize all animations
    console.log('FinFlow website initialized successfully!');
}); 