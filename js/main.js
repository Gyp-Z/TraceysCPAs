/**
 * main.js
 * Responsibility: Orchestration, Initialization, and Global Page Effects.
 * 
 * This is the central entry point for the application. It runs on DOMContentLoaded
 * to:
 * 1. Initialize global effects like "Reveal on Scroll".
 * 2. Instantiate specific components (Accordions, Carousels, Modals) if they exist on the page.
 * 3. Handle any global event listeners not bound to specific components.
 */

// ===================================
// REVEAL ON SCROLL ANIMATION
// ===================================
// Manages the "fade up" effect for elements with the .reveal class
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Trigger reveal when element is 100px within the viewport
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
};

// ===================================
// INITIALIZATION
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Reveal on Scroll
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once for elements already in view

    // 2. Initialize Accordions across different sections
    // Usage: setupAccordion(wrapper, header, body) from components.js
    setupAccordion('.service-accordion-item', '.service-header', '.service-content');
    setupAccordion('.tax-accordion-item', '.tax-header', '.tax-content');
    setupAccordion('.team-accordion-item', '.team-header', '.team-content');
    setupAccordion('.tip-accordion-item', '.tip-accordion-header', '.tip-accordion-content');

    // 3. Initialize Engagement Widget
    if (typeof engagementWidget !== 'undefined') {
        engagementWidget.init();
    }

    // 4. Initialize Carousels (Unified)
    // Firm Carousel on About Page
    if (document.querySelector('.firm-carousel')) {
        initCarousel('.firm-carousel', 6000); // Slightly slower auto-advance for firm photos
    }

    // News & Tax Tips Carousel on Homepage
    if (document.querySelector('.news-carousel')) {
        initCarousel('.news-carousel', 5000);
    }

    // 6. Initialize Global Listeners
    // Handle logo image errors securely (replaces inline onerror)
    const logoImgs = document.querySelectorAll('.nav-logo-img');
    logoImgs.forEach(img => {
        img.addEventListener('error', function () {
            this.style.display = 'none';
            if (this.nextElementSibling) {
                this.nextElementSibling.style.display = 'block';
            }
        });
    });

    // 7. Initialize QR Code Modal
    if (typeof setupQRModal === 'function') {
        setupQRModal();
    }

    // 7. Initialize Contact Modal
    if (typeof setupContactModal === 'function') {
        setupContactModal();
    }
});
