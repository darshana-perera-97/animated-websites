// Enhanced JavaScript for FinFlow Website with Bootstrap Integration
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize loading state
    document.body.classList.add('loaded');
    
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
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });

    // Enhanced Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add stagger animation for children
                if (entry.target.classList.contains('stagger-children')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card, .scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .stagger-children');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Enhanced button interactions with ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            // Enhanced ripple effect
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

    // Enhanced card hover effects with 3D transforms
    const cards = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotateX(0deg) rotateY(0deg)';
        });
        
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-8px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });

    // Enhanced step hover effects
    const steps = document.querySelectorAll('.step');
    steps.forEach(step => {
        step.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.step-icon');
            const number = this.querySelector('.step-number');
            
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(10deg)';
            }
            if (number) {
                number.style.transform = 'scale(1.1)';
            }
        });
        
        step.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.step-icon');
            const number = this.querySelector('.step-number');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            if (number) {
                number.style.transform = 'scale(1)';
            }
        });
    });

    // Enhanced navigation scroll effect with parallax
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Add background blur effect on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    // Enhanced parallax effect for hero background
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-orb, .shape');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            const xPos = Math.sin(scrolled * 0.001 + index) * 20;
            element.style.transform = `translateY(${yPos}px) translateX(${xPos}px)`;
        });
    }

    window.addEventListener('scroll', function() {
        requestAnimationFrame(updateParallax);
    });

    // Enhanced number animation with counting effect
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
            
            const increment = target / 100;
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
            }, 20);
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

    // Enhanced phone mockup interactions
    const phoneMockup = document.querySelector('.phone-screen');
    if (phoneMockup) {
        phoneMockup.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        phoneMockup.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
        });
    }

    // Enhanced feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            const highlight = this.querySelector('.feature-highlight');
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
            }
            if (highlight) {
                highlight.style.transform = 'scale(1.05)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            const highlight = this.querySelector('.feature-highlight');
            
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            if (highlight) {
                highlight.style.transform = 'scale(1)';
            }
        });
    });

    // Enhanced pricing card interactions
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.pricing-badge');
            if (badge) {
                badge.style.animation = 'bounce 0.6s ease-in-out';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.pricing-badge');
            if (badge) {
                badge.style.animation = 'bounce 2s infinite';
            }
        });
    });

    // Enhanced testimonial card interactions
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const stars = this.querySelector('.stars');
            const avatar = this.querySelector('.author-avatar');
            
            if (stars) {
                stars.style.transform = 'scale(1.1)';
            }
            if (avatar) {
                avatar.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const stars = this.querySelector('.stars');
            const avatar = this.querySelector('.author-avatar');
            
            if (stars) {
                stars.style.transform = 'scale(1)';
            }
            if (avatar) {
                avatar.style.transform = 'scale(1)';
            }
        });
    });

    // Enhanced navigation interactions
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--primary-color)';
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.transform = 'translateY(0)';
        });
    });

    // Enhanced footer link interactions
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

    // Enhanced social media link interactions
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Enhanced badge interactions
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.background = 'var(--primary-color)';
            this.style.color = 'white';
            this.style.transform = 'translateY(-2px)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255, 255, 255, 0.1)';
            this.style.color = 'var(--text-muted)';
            this.style.transform = 'translateY(0)';
        });
    });

    // Add smooth transitions to all interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .feature-card, .pricing-card, .testimonial-card, .step');
    interactiveElements.forEach(element => {
        element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Enhanced scroll progress indicator
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // Enhanced section reveal animations
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for section children
                const children = entry.target.querySelectorAll('.feature-card, .step, .pricing-card, .testimonial-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        sectionObserver.observe(section);
    });

    // Enhanced mobile responsiveness
    function handleResize() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Disable some animations on mobile for performance
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    // Enhanced touch interactions for mobile
    if ('ontouchstart' in window) {
        const touchElements = document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card, .step');
        touchElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            element.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }

    // Add enhanced CSS for animations
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
        
        /* Enhanced animation classes */
        .feature-card, .step, .pricing-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .feature-card.animate, .step.animate, .pricing-card.animate, .testimonial-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Performance optimizations for mobile */
        .mobile .gradient-orb {
            animation: none;
        }
        
        .mobile .shape {
            animation: none;
        }
        
        /* Enhanced focus states */
        .btn:focus,
        .nav-link:focus,
        .social-links a:focus,
        .footer-column ul li a:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize all animations
    console.log('FinFlow website enhanced with Bootstrap and advanced animations!');
}); 