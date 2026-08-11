/* ==========================================================================
   Harshveer Portfolio - Interactive JavaScript Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Mobile Navigation Toggle
       -------------------------------------------------------------------------- */
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.getElementById('navbar');

    if (menuBtn && navbar) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.className = 'fas fa-xmark';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close navbar when clicking link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    /* --------------------------------------------------------------------------
       2. Sticky Header & Active Nav Link Highlighting
       -------------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Sticky Header
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Section Link Highlight
        let currentScroll = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    /* --------------------------------------------------------------------------
       3. Dynamic Roles Typing Animation
       -------------------------------------------------------------------------- */
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const roles = [
            'Python Developer',
            'Backend Specialist',
            'Software Engineer',
            'Automation Expert',
            'API Architect'
        ];

        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeEffect() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        typeEffect();
    }

    /* --------------------------------------------------------------------------
       4. Scroll Reveal Animations (IntersectionObserver)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate skill bars if inside skill section
                if (entry.target.classList.contains('skills-column')) {
                    const bars = entry.target.querySelectorAll('.bar-fill');
                    bars.forEach(bar => {
                        const targetWidth = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = targetWidth;
                        }, 200);
                    });
                }
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    /* --------------------------------------------------------------------------
       5. Contact Form Interactive Handler
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;

            setTimeout(() => {
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;

                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            }, 1200);
        });
    }

    /* --------------------------------------------------------------------------
       6. Custom Cursor Trail Animation
       -------------------------------------------------------------------------- */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');


    if (cursorDot && cursorRing && window.matchMedia('(hover: hover)').matches) {
        let mouseX = 0, mouseY = 0;   // current mouse position
        let ringX  = 0, ringY  = 0;   // ring's smoothed position
        let rafId  = null;

        // Snap dot; lag ring via lerp
        function animateCursor() {
            // Lerp: ring follows mouse with slight delay
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursorDot.style.left  = mouseX + 'px';
            cursorDot.style.top   = mouseY + 'px';
            cursorRing.style.left = ringX  + 'px';
            cursorRing.style.top  = ringY  + 'px';

            rafId = requestAnimationFrame(animateCursor);
        }

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Reveal on first move
            if (!cursorDot.classList.contains('visible')) {
                cursorDot.classList.add('visible');
                cursorRing.classList.add('visible');
                ringX = mouseX;
                ringY = mouseY;
                if (!rafId) animateCursor();
            }
        });

        // Hide when cursor leaves window
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('visible');
            cursorRing.classList.remove('visible');
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.classList.add('visible');
            cursorRing.classList.add('visible');
        });
    }

});
