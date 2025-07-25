// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.getElementById('customCursor');
const cursorHover = document.querySelectorAll('a, button, .zone-option, .pack-option, .location-item');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

cursorHover.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
    });
});

// Scroll Progress Bar
const scrollProgress = document.querySelector('.scroll-progress-bar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    if (scrollProgress) {
        scrollProgress.style.width = scrollPercent + '%';
    }
});

// Vending Machine Time Display
function updateTime() {
    const timeDisplay = document.getElementById('timeDisplay');
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    });
    timeDisplay.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

// Hero Animations
gsap.timeline()
    .from('.hero-title .title-line', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    })
    .from('.hero-subtitle', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.vending-machine', {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.bg-element', {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    }, '-=1');

// Vending Machine Day/Night Morph Animation
const vendingMachine = document.getElementById('vendingMachine');
let isDay = true;

function toggleDayNight() {
    isDay = !isDay;
    
    gsap.to('.machine-body', {
        background: isDay ? 'linear-gradient(145deg, #2C3E50, #34495E)' : 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    gsap.to('.machine-screen', {
        background: isDay ? '#1A1A1A' : '#000000',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    gsap.to('.machine-door', {
        background: isDay ? 'linear-gradient(145deg, #34495E, #2C3E50)' : 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
        duration: 2,
        ease: 'power2.inOut'
    });
}

// Toggle day/night every 10 seconds
setInterval(toggleDayNight, 10000);

// Scroll-triggered animations
gsap.utils.toArray('.feature-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Step cards animations
gsap.utils.toArray('.step-card').forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: index % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 1,
        delay: index * 0.2,
        ease: 'power3.out'
    });
});

// Location items animations
gsap.utils.toArray('.location-item').forEach((item, index) => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        delay: index * 0.1,
        ease: 'power3.out'
    });
});

// Parallax background elements
gsap.utils.toArray('.bg-element').forEach((element, index) => {
    gsap.to(element, {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: (index + 1) * 50,
        rotation: (index + 1) * 10,
        ease: 'none'
    });
});

// Map pins animation
function createMapPins() {
    const map = document.getElementById('map');
    const locations = [
        { x: 20, y: 30, name: 'Downtown' },
        { x: 70, y: 40, name: 'University' },
        { x: 40, y: 70, name: 'Shopping Mall' },
        { x: 80, y: 80, name: 'Airport' }
    ];
    
    locations.forEach((location, index) => {
        const pin = document.createElement('div');
        pin.className = 'map-pin';
        pin.style.left = location.x + '%';
        pin.style.top = location.y + '%';
        pin.innerHTML = `
            <div class="pin-dot"></div>
            <div class="pin-label">${location.name}</div>
        `;
        map.appendChild(pin);
        
        // Animate pin appearance
        gsap.from(pin, {
            scale: 0,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: '.map',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
}

// Add map pin styles
const mapPinStyles = `
    .map-pin {
        position: absolute;
        transform: translate(-50%, -50%);
        z-index: 10;
    }
    
    .pin-dot {
        width: 20px;
        height: 20px;
        background: var(--primary-color);
        border-radius: 50%;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        animation: pinPulse 2s infinite;
    }
    
    .pin-label {
        position: absolute;
        top: 25px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 500;
        color: var(--text-dark);
        white-space: nowrap;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .map-pin:hover .pin-label {
        opacity: 1;
    }
    
    @keyframes pinPulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        50% {
            transform: scale(1.2);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mapPinStyles;
document.head.appendChild(styleSheet);

// Initialize map pins
createMapPins();

// Zone selector interactions
document.querySelectorAll('.zone-option').forEach(option => {
    option.addEventListener('click', () => {
        // Remove active class from all options
        document.querySelectorAll('.zone-option').forEach(opt => {
            opt.classList.remove('active');
        });
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Animate the selection
        gsap.to(option, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    });
});

// Pack selector interactions
document.querySelectorAll('.pack-option').forEach(option => {
    option.addEventListener('click', () => {
        // Animate the selection
        gsap.to(option, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    });
});

// Location item interactions
document.querySelectorAll('.location-item').forEach(item => {
    item.addEventListener('click', () => {
        // Animate the selection
        gsap.to(item, {
            scale: 1.02,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: 'power3.inOut'
            });
        }
    });
});

// Button hover effects
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Feature card hover effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Step card hover effects
document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Social link hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    link.addEventListener('mouseleave', () => {
        gsap.to(link, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Product item hover effects
document.querySelectorAll('.product-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        gsap.to(item, {
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    item.addEventListener('mouseleave', () => {
        gsap.to(item, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Control button hover effects
document.querySelectorAll('.control-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.2,
            ease: 'power2.out'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = hamburger.querySelectorAll('span');
        if (hamburger.classList.contains('active')) {
            gsap.to(spans[0], { rotation: 45, y: 6, duration: 0.3 });
            gsap.to(spans[1], { opacity: 0, duration: 0.3 });
            gsap.to(spans[2], { rotation: -45, y: -6, duration: 0.3 });
        } else {
            gsap.to(spans[0], { rotation: 0, y: 0, duration: 0.3 });
            gsap.to(spans[1], { opacity: 1, duration: 0.3 });
            gsap.to(spans[2], { rotation: 0, y: 0, duration: 0.3 });
        }
    });
}

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
            opacity: 1;
        }
        
        .nav-list {
            flex-direction: column;
            gap: 20px;
        }
        
        .nav-auth {
            margin-top: 20px;
            justify-content: center;
        }
    }
`;

const mobileStyleSheet = document.createElement('style');
mobileStyleSheet.textContent = mobileMenuStyles;
document.head.appendChild(mobileStyleSheet);

// Performance optimization for mobile
if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    gsap.set('.bg-element', { opacity: 0.5 });
    gsap.set('.vending-machine', { opacity: 0.8 });
}

// Initialize all animations when page loads
window.addEventListener('load', () => {
    // Ensure all animations are properly initialized
    ScrollTrigger.refresh();
    
    // Add loading animation
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
}); 