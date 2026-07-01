/**
 * Mahila Atyachar Nivaran Samiti - Main JavaScript File
 * Author: Hardikkumar Gajjar
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER ---
    const loaderWrapper = document.getElementById('loader');
    if (loaderWrapper) {
        window.addEventListener('load', () => {
            loaderWrapper.style.opacity = '0';
            loaderWrapper.style.visibility = 'hidden';
        });
    }

    // --- SCROLL PROGRESS BAR ---
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollPercentage}%`;
        });
    }

    // --- DARK MODE TOGGLE ---
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        // Check for saved dark mode preference
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
        }

        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            // Save preference to localStorage
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.removeItem('theme');
            }
        });
    }

    // --- FADE-IN SECTIONS ON SCROLL ---
    const faders = document.querySelectorAll('.fade-in');
    if (faders.length > 0) {
        const appearOptions = {
            threshold: 0.2,
            rootMargin: "0px 0px -50px 0px"
        };

        const appearOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });
    }

    // --- ANIMATED STATISTICS COUNTER ---
    const counters = document.querySelectorAll('.count');
    if (counters.length > 0) {
        const speed = 200; // The lower the slower

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(() => animateCounter(counter), 1);
            } else {
                counter.innerText = target.toLocaleString('en-IN');
            }
        };

        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // --- BACK TO TOP BUTTON ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // --- FOOTER CURRENT YEAR ---
    const currentYearSpan = document.getElementById('current-year');
    if(currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- MOBILE NAVIGATION ---
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            navLinks.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.classList.toggle('active');
        });
    }

    // --- LANGUAGE SWITCHER ---
    const langSwitcher = document.querySelector('.language-switcher');
    if (langSwitcher) {
        const langBtn = langSwitcher.querySelector('.language-btn');
        const langOptions = langSwitcher.querySelector('.language-options');

        langBtn.addEventListener('click', (e) => {
            // Prevent link behavior and toggle dropdown on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
                langBtn.setAttribute('aria-expanded', !isExpanded);
                langOptions.style.display = isExpanded ? 'none' : 'block';
            }
        });
    }

    // --- FORM VALIDATION LOGIC ---
    const validateForm = (form) => {
        // This is a generic validation function.
        // You can expand it with more specific rules for each form.
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (input.value.trim() === '') {
                // Simplified error handling
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#2ecc71';
            }
        });

        return isValid;
    };


    // --- CONTACT FORM VALIDATION ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const formStatus = document.getElementById('form-status');

        const showError = (input, message) => {
            const formGroup = input.parentElement;
            formGroup.classList.add('error');
            const small = formGroup.querySelector('small');
            small.innerText = message;
        };

        const showSuccess = (input) => {
            const formGroup = input.parentElement;
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            const small = formGroup.querySelector('small');
            small.innerText = '';
        };

        const validateEmail = (email) => {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email.value).toLowerCase());
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            if (name.value.trim() === '') {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                showSuccess(name);
            }

            if (email.value.trim() === '') {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!validateEmail(email)) {
                showError(email, 'Email is not valid');
                isValid = false;
            } else {
                showSuccess(email);
            }

            if (message.value.trim() === '') {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                showSuccess(message);
            }

            if (isValid) {
                formStatus.innerText = 'Thank you for your message. It has been sent.';
                formStatus.className = 'status-success';
                contactForm.reset();
            } else {
                formStatus.innerText = 'Please correct the errors above.';
                formStatus.className = 'status-error';
            }
        });
    }

    // --- VOLUNTEER FORM VALIDATION ---
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(volunteerForm)) {
                // Handle successful submission
                console.log('Volunteer form is valid');
            }
        });
    }

    // --- MEMBERSHIP FORM VALIDATION ---
    const membershipForm = document.getElementById('membership-form');
    if (membershipForm) {
        membershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (validateForm(membershipForm)) {
                // Handle successful submission
                console.log('Membership form is valid');
            }
        });
    }

    // --- GALLERY LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightbox.style.display = 'block';
                const img = item.querySelector('img');
                lightboxImg.src = img.src;
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});