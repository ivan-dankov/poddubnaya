document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor Logic
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if device has mouse
    const isDesktop = window.matchMedia('(pointer: fine)').matches;

    if (isDesktop) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Interactive Elements Hover Effect
        const interactiveElements = document.querySelectorAll('a, button, input, select');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(255, 77, 0, 0.1)';
                cursorOutline.style.borderColor = 'transparent';
            });
            
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
                cursorOutline.style.borderColor = '#050505';
            });
        });
    } else {
        // Hide custom cursor on touch devices
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
    }

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
        // Simple toggle for now, could be animated overlay
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        if(nav.style.display === 'flex') {
            nav.style.position = 'fixed';
            nav.style.top = '0';
            nav.style.right = '0';
            nav.style.height = '100vh';
            nav.style.width = '100%';
            nav.style.background = '#FFF';
            nav.style.flexDirection = 'column';
            nav.style.justifyContent = 'center';
            nav.style.alignItems = 'center';
            nav.style.zIndex = '90';
        } else {
            nav.style = ''; // Reset inline styles
        }
    });

    // Reveal Animations on Scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-text, .reveal-img, .feature-item, .course-row, .about-text');
    revealElements.forEach(el => {
        el.classList.add('hidden-el');
        observer.observe(el);
    });

    // Form Handling
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>ОТПРАВЛЕНО</span>';
            btn.style.backgroundColor = '#000';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
                form.reset();
            }, 3000);
        });
    }
});

// Add CSS for reveal animations dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .hidden-el {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.19, 1, 0.22, 1);
    }
    
    .hidden-el.visible {
        opacity: 1;
        transform: translateY(0);
    }

    .reveal-text.visible {
        transform: translateY(0);
    }

    .delay-1 { transition-delay: 0.1s; }
    .delay-2 { transition-delay: 0.2s; }
`;
document.head.appendChild(styleSheet);
