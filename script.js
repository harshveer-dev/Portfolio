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
        if (window.scrollY > 40) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        // Active Section Link Highlight
        let currentScroll = window.scrollY + 160;

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
            'GUI Application Developer',
            'Backend & API Specialist',
            'Database & Automation Engineer'
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
       4. AOS Initialization & Skill Bar Animation
       -------------------------------------------------------------------------- */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 80,
            delay: 0,
            disable: prefersReducedMotion
        });
    }

    // Animate skill bars on scroll
    const skillColumns = document.querySelectorAll('.skills-column');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach(bar => {
                    const targetWidth = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 200);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    skillColumns.forEach(el => skillObserver.observe(el));

    /* --------------------------------------------------------------------------
       5. Contact Form — Secure Delivery via FormSubmit (No-CORS method)
       --------------------------------------------------------------------------
       Uses standard form submission targeted at a hidden iframe to bypass any
       local file:// protocol CORS issues. No API keys or passwords required.
       -------------------------------------------------------------------------- */
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const hiddenIframe = document.getElementById('hidden_iframe');
    let isSubmitting = false;

    if (contactForm && formStatus && hiddenIframe) {
        // When the hidden iframe finishes loading the response from FormSubmit
        hiddenIframe.addEventListener('load', () => {
            if (isSubmitting) {
                isSubmitting = false;
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                
                formStatus.className = 'form-status success';
                formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();
                
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i class="fas fa-paper-plane"></i>`;
                
                setTimeout(() => { formStatus.textContent = ''; }, 5000);
            }
        });

        contactForm.addEventListener('submit', () => {
            isSubmitting = true;
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>`;
        });
    }

    /* --------------------------------------------------------------------------
       6. Custom Cursor Trail Animation
       -------------------------------------------------------------------------- */
    const cursorDot  = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && !prefersReducedMotion) {
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let ringX  = mouseX;
        let ringY  = mouseY;

        // Snap dot; lag ring via lerp
        function animateCursor() {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            cursorDot.style.left  = mouseX + 'px';
            cursorDot.style.top   = mouseY + 'px';
            cursorRing.style.left = ringX  + 'px';
            cursorRing.style.top  = ringY  + 'px';

            requestAnimationFrame(animateCursor);
        }

        // Show immediately by default
        cursorDot.classList.add('visible');
        cursorRing.classList.add('visible');
        animateCursor();

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            if (!cursorDot.classList.contains('visible')) {
                cursorDot.classList.add('visible');
                cursorRing.classList.add('visible');
            }
        });

        // Hide when cursor leaves browser window, show on enter
        document.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('visible');
            cursorRing.classList.remove('visible');
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.classList.add('visible');
            cursorRing.classList.add('visible');
        });
    }

    /* --------------------------------------------------------------------------
       7. Visitor Counter Tracking & Animated Display
       -------------------------------------------------------------------------- */
    (function initVisitorCounter() {
        const today = new Date().toISOString().slice(0, 10); // "YYYY-MM-DD"

        // ── Retrieve stored data ──────────────────────────────────────────────
        let totalVisits  = parseInt(localStorage.getItem('pf_total_visits')  || '0', 10);
        let uniqueVisits = parseInt(localStorage.getItem('pf_unique_visits') || '0', 10);
        let todayDate    = localStorage.getItem('pf_today_date') || '';
        let todayVisits  = parseInt(localStorage.getItem('pf_today_visits')  || '0', 10);
        let isNewSession = !sessionStorage.getItem('pf_session_active');

        // ── Reset today counter on new day ───────────────────────────────────
        if (todayDate !== today) {
            todayDate   = today;
            todayVisits = 0;
            localStorage.setItem('pf_today_date', today);
        }

        // ── Increment counters on new session ────────────────────────────────
        if (isNewSession) {
            sessionStorage.setItem('pf_session_active', '1');
            totalVisits++;
            uniqueVisits++;
            todayVisits++;
            localStorage.setItem('pf_total_visits',  totalVisits);
            localStorage.setItem('pf_unique_visits', uniqueVisits);
            localStorage.setItem('pf_today_visits',  todayVisits);
        }

        // ── Animated count-up helper ──────────────────────────────────────────
        function animateCount(el, target, duration) {
            if (!el) return;
            let start     = 0;
            const step    = target / (duration / 16);
            const timer   = setInterval(() => {
                start += step;
                if (start >= target) {
                    start = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(start).toLocaleString();
            }, 16);
        }

        // ── Milestone fill helper ─────────────────────────────────────────────
        function setMilestone(fillId, pctId, current, goal) {
            const fill = document.getElementById(fillId);
            const pct  = document.getElementById(pctId);
            if (!fill || !pct) return;
            const ratio = Math.min(current / goal, 1);
            fill.style.width = (ratio * 100).toFixed(1) + '%';
            pct.textContent  = Math.round(ratio * 100) + '%';
        }

        // ── Observe the visitors section; animate only when visible ───────────
        const visitorSection = document.getElementById('visitors');
        if (!visitorSection) return;

        let countersAnimated = false;

        const visitorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;

                    animateCount(document.getElementById('totalVisits'),  totalVisits,  1500);
                    animateCount(document.getElementById('todayVisits'),  todayVisits,  1200);
                    animateCount(document.getElementById('uniqueVisits'), uniqueVisits, 1400);
                    const liveCount = Math.floor(Math.random() * 2) + 1;
                    animateCount(document.getElementById('onlineNow'), liveCount, 800);

                    // Animate milestone bars with slight delay
                    setTimeout(() => {
                        setMilestone('m1Fill', 'm1Pct', totalVisits, 100);
                        setMilestone('m2Fill', 'm2Pct', totalVisits, 500);
                        setMilestone('m3Fill', 'm3Pct', totalVisits, 1000);
                    }, 400);
                }
            });
        }, { threshold: 0.2 });

        visitorObserver.observe(visitorSection);
    })();

    /* --------------------------------------------------------------------------
       8. Click-to-Choose Card Glow & Shadow Effect (Important Sections)
       -------------------------------------------------------------------------- */
    const choosableCards = document.querySelectorAll(
        '.service-card, .project-card, .glass-project-card'
    );

    if (choosableCards.length > 0) {
        choosableCards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation(); // prevent document click from firing
                const isAlreadyChosen = card.classList.contains('chosen');

                // Remove chosen from all cards in the same section
                const parentSection = card.closest('section') || document;
                parentSection.querySelectorAll('.service-card, .project-card, .glass-project-card').forEach(c => {
                    c.classList.remove('chosen');
                });

                // Toggle on current card
                if (!isAlreadyChosen) {
                    card.classList.add('chosen');
                }
            });
        });

        // Click outside any card to deselect all
        document.addEventListener('click', () => {
            choosableCards.forEach(c => c.classList.remove('chosen'));
        });
    }

    /* --------------------------------------------------------------------------
       9. Smooth Scrolling for Internal Navigation Anchors
       -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - (headerHeight - 5);

                if (prefersReducedMotion) {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'auto'
                    });
                } else {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});
