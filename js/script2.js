// Organic Spa Design - Interactive Features

// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Floating Nav on Scroll
const floatingNav = document.querySelector('.floating-nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        floatingNav.classList.add('scrolled');
    } else {
        floatingNav.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            e.preventDefault();
            const navHeight = floatingNav ? floatingNav.offsetHeight : 80;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Отправка...</span>';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            course: document.getElementById('course').value,
            message: document.getElementById('message')?.value || ''
        };
        
        // Simulate form submission (replace with actual API call)
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success feedback
            submitBtn.innerHTML = `
                <span>Отправлено!</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 10l3 3 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            `;
            submitBtn.style.backgroundColor = '#9FA888';
            
            // Show success message
            showNotification('Спасибо! Я свяжусь с вами в ближайшее время.', 'success');
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                submitBtn.style.backgroundColor = '';
            }, 3000);
            
        } catch (error) {
            // Error feedback
            submitBtn.innerHTML = '<span>Ошибка. Попробуйте снова</span>';
            submitBtn.disabled = false;
            showNotification('Произошла ошибка. Попробуйте позже или свяжитесь через WhatsApp.', 'error');
            
            setTimeout(() => {
                submitBtn.innerHTML = originalBtnText;
            }, 3000);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close" aria-label="Закрыть">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            max-width: 400px;
            padding: 1.25rem 1.5rem;
            background-color: var(--c-ivory);
            border-radius: 12px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slide-in-notification 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .notification-success {
            border-left: 4px solid var(--c-sage);
        }
        
        .notification-error {
            border-left: 4px solid #D64545;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-content span {
            flex: 1;
            font-size: 0.95rem;
            color: var(--c-charcoal);
        }
        
        .notification-close {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0.25rem;
            color: var(--c-taupe);
            transition: color 0.3s;
            flex-shrink: 0;
        }
        
        .notification-close:hover {
            color: var(--c-charcoal);
        }
        
        @keyframes slide-in-notification {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                bottom: 1rem;
                right: 1rem;
                left: 1rem;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slide-in-notification 0.3s reverse';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slide-in-notification 0.3s reverse';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for fade-in animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.course-card, .testimonial-card, .about-content, .philosophy-content'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Image Card Parallax Effect on Mouse Move
const imageCards = document.querySelectorAll('.image-card');

if (imageCards.length > 0 && window.innerWidth > 768) {
    const heroVisual = document.querySelector('.hero-visual');
    
    if (heroVisual) {
        heroVisual.addEventListener('mousemove', (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;
            
            imageCards.forEach((card, index) => {
                const multiplier = (index + 1) * 10;
                const moveX = deltaX * multiplier;
                const moveY = deltaY * multiplier;
                
                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        heroVisual.addEventListener('mouseleave', () => {
            imageCards.forEach(card => {
                card.style.transform = '';
            });
        });
    }
}

// Form Input Animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    // Add floating label effect
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
    
    // Check if input has value on load
    if (input.value) {
        input.parentElement.classList.add('focused');
    }
});

// Preload Critical Images
function preloadImages() {
    const images = [
        'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Performance: Lazy Load Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    // Note: To use lazy loading, replace img src with data-src in HTML
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility: Keyboard Navigation Enhancement
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu
        if (navMenu && navMenu.classList.contains('active')) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Close notification
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.remove();
        }
    }
});

// Console Log with Branding
console.log('%cАнастасия Поддубная', 'font-size: 24px; font-weight: bold; color: #C97A63; font-family: "Cormorant Garamond", serif;');
console.log('%cШкола массажа в Варшаве', 'font-size: 14px; color: #8B7E74;');
console.log('%c✨ Создано с заботой и вниманием к деталям', 'font-size: 12px; color: #9FA888; font-style: italic;');
