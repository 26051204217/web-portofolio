// ==========================================================================
// PORTOFOLIO JAVASCRIPT - MUHAMMAD HABIBIE
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // 1. TYPING TEXT EFFECT (HERO)
    // -------------------------------------------------------------
    const typingElement = document.getElementById('typing-text');
    const words = [
        'Mahasiswa S1 Teknik Informatika',
        'Web Developer Enthusiast',
        'UI/UX Explorer',
        'Problem Solver',
        'Tech Learner'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 110;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1800; // jeda saat kata selesai diketik
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 400; // jeda sebelum mulai kata berikutnya
        }

        setTimeout(typeEffect, typingSpeed);
    }

    if (typingElement) {
        setTimeout(typeEffect, 600);
    }

    // -------------------------------------------------------------
    // 2. DARK / LIGHT THEME TOGGLE
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    // Cek preferensi tersimpan atau fallback ke preferensi sistem
    const preferredTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    const savedTheme = localStorage.getItem('habibie_theme') || preferredTheme;
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', nextTheme);
        localStorage.setItem('habibie_theme', nextTheme);
        updateThemeIcon(nextTheme);
    });

    function updateThemeIcon(theme) {
        if (!themeIcon) return;
        if (theme === 'light') {
            themeIcon.className = 'fa-solid fa-moon';
        } else {
            themeIcon.className = 'fa-solid fa-sun';
        }
    }

    // -------------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // -------------------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            if (menuIcon) {
                menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        // Tutup menu saat salah satu link diklik
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                if (menuIcon) {
                    menuIcon.className = 'fa-solid fa-bars';
                }
            });
        });
    }

    // -------------------------------------------------------------
    // 4. NAVBAR SCROLL EFFECT & BACK TO TOP BUTTON
    // -------------------------------------------------------------
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;

        // Navbar shadow / compact
        if (navbar) {
            if (scrollPos > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Back to top visibility
        if (backToTopBtn) {
            if (scrollPos > 350) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Highlight active nav link berdasarkan posisi scroll
        updateActiveNavLink();
    });

    // -------------------------------------------------------------
    // 5. ACTIVE NAV LINK ON SCROLL
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavLink() {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

            if (correspondingLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // -------------------------------------------------------------
    // 6. CONTACT FORM SUBMISSION (INTERAKTIF)
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const senderName = document.getElementById('sender-name').value.trim();
            const senderEmail = document.getElementById('sender-email').value.trim();
            const senderMessage = document.getElementById('sender-message').value.trim();
            const mailtoAddress = '26051204217@mhs.unesa.ac.id';
            const subject = encodeURIComponent(`Pesan dari ${senderName || 'Pengunjung'} via Portofolio`);
            const body = encodeURIComponent(
                `Nama: ${senderName}\nEmail: ${senderEmail}\n\nPesan:\n${senderMessage}`
            );

            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = `<i class="fa-solid fa-circle-check"></i> Terima kasih <strong>${senderName || 'teman'}</strong>! Aplikasi email Anda akan terbuka untuk mengirim pesan.`;
            }

            window.location.href = `mailto:${mailtoAddress}?subject=${subject}&body=${body}`;
            contactForm.reset();

            setTimeout(() => {
                if (formStatus) {
                    formStatus.textContent = '';
                }
            }, 6000);
        });
    }
});

