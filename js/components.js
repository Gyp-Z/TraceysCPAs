/**
 * components.js
 * Responsibility: Reusable UI Logic (Accordions, Carousel, Engagement Widget).
 * 
 * This module defines the behavior for all recurring UI components.
 * It is designed to be purely functional and decoupled from specific pages,
 * allowing components to be instantiated wherever their HTML structure exists.
 * 
 * Key Components:
 * - Accordion: Handles expand/collapse logic with mutual exclusivity.
 * - Carousel: Distinct auto-rotating sliders for Firm, News, and Tips.
 * - Engagement Widget: Interactive bottom-right notification cycle.
 * - Modals: Logic for QR Code and Contact popups.
 */

// ===================================
// ACCORDION UTILITY
// ===================================
/**
 * Initializes accordion behavior for a group of elements.
 * @param {string} itemSelector - The outer container for each accordion item.
 * @param {string} headerSelector - The clickable header element.
 * @param {string} contentSelector - The body that expands/collapses.
 */
function setupAccordion(itemSelector, headerSelector, contentSelector) {
    const items = document.querySelectorAll(itemSelector);

    items.forEach(item => {
        const header = item.querySelector(headerSelector);
        const content = item.querySelector(contentSelector);

        if (header && content) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all sibling items to ensure only one is open at a time
                items.forEach(i => {
                    i.classList.remove('active');
                    const c = i.querySelector(contentSelector);
                    if (c) c.style.maxHeight = null;
                });

                // Toggle the clicked item
                if (!isActive) {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            });
        }
    });
}

// ===================================
// UNIFIED CAROUSEL LOGIC
// ===================================
/**
 * Initializes a carousel instance.
 * @param {string} selector - Container selector for the carousel.
 * @param {number} autoInterval - Auto-advance interval in ms (0 to disable).
 */
function initCarousel(selector, autoInterval = 5000) {
    const wrapper = document.querySelector(selector);
    if (!wrapper) return;

    const slides = wrapper.querySelectorAll('.carousel-slide');
    const dots = wrapper.querySelectorAll('.dot');
    const prevBtn = wrapper.querySelector('.carousel-btn.prev');
    const nextBtn = wrapper.querySelector('.carousel-btn.next');

    if (!slides.length) return;

    let currentIndex = 0;
    let timer = null;

    const showSlide = (index) => {
        // Handle wrapping
        if (index >= slides.length) currentIndex = 0;
        else if (index < 0) currentIndex = slides.length - 1;
        else currentIndex = index;

        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const nextSlide = () => {
        showSlide(currentIndex + 1);
        resetTimer();
    };

    const prevSlide = () => {
        showSlide(currentIndex - 1);
        resetTimer();
    };

    const resetTimer = () => {
        if (autoInterval > 0) {
            clearInterval(timer);
            timer = setInterval(nextSlide, autoInterval);
        }
    };

    // Event Listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            resetTimer();
        });
    });

    // Start
    showSlide(0);
    resetTimer();
}

// ===================================
// SMART ENGAGEMENT WIDGET
// ===================================
// This class manages the cycling informative toast at the bottom right.
const engagementWidget = {
    items: [
        {
            text: "Filling out your New Jersey or Federal Taxes? View deadlines here.",
            icon: "assets/icon-widget-calendar.png",
            target: "#tax-deadlines"
        },
        {
            text: "Click here for the latest Tax Tips & News!",
            icon: "assets/icon-widget-idea.png",
            target: "#tax-tips"
        },
        {
            text: "Meet the Tracey & Tracey Team!",
            icon: "assets/icon-widget-team.png",
            target: "about.html#team"
        }
    ],
    displayDuration: 8000,
    intervalDuration: 10000, // Reduced from 30s to 10s per user request
    currentIndex: 0,
    timer: null,
    widget: null,
    messageEl: null,
    iconEl: null,
    progressEl: null,

    init() {
        this.widget = document.createElement('div');
        this.widget.className = 'engagement-widget';
        this.widget.innerHTML = `
            <div class="widget-content">
                <span class="widget-icon"></span>
                <span class="widget-text"></span>
                <button class="widget-close">×</button>
            </div>
            <div class="widget-progress"></div>
        `;

        document.body.appendChild(this.widget);

        this.messageEl = this.widget.querySelector('.widget-text');
        this.iconEl = this.widget.querySelector('.widget-icon');
        this.progressEl = this.widget.querySelector('.widget-progress');

        this.widget.querySelector('.widget-close').addEventListener('click', (e) => {
            e.stopPropagation();
            this.hide();
        });

        this.widget.addEventListener('click', () => this.handleClick());

        // First message delay
        setTimeout(() => this.showNext(), 5000);
    },

    showNext() {
        const item = this.items[this.currentIndex];
        this.messageEl.textContent = item.text;

        this.iconEl.innerHTML = '';
        const img = document.createElement('img');
        img.src = item.icon;
        img.className = "widget-icon-img";
        this.iconEl.appendChild(img);

        this.progressEl.style.transition = 'none';
        this.progressEl.style.width = '0%';

        this.widget.classList.add('active');
        this.widget.classList.add('pulse');

        setTimeout(() => {
            this.progressEl.style.transition = `width ${this.displayDuration}ms linear`;
            this.progressEl.style.width = '100%';
        }, 50);

        this.timer = setTimeout(() => this.hide(), this.displayDuration);
    },

    hide() {
        if (!this.widget) return;
        this.widget.classList.remove('active');
        this.widget.classList.remove('pulse');
        clearTimeout(this.timer);
        setTimeout(() => this.showNext(), this.intervalDuration);
    },

    handleClick() {
        const item = this.items[this.currentIndex];
        if (item.target.startsWith('#')) {
            const target = document.querySelector(item.target);
            if (target) {
                // FIXED: Use getBoundingClientRect for absolute position relative to viewport
                // offsetTop was failing due to parent transforms (.reveal class)
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - 100; // -100 for navbar/breathing room

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        } else {
            window.location.href = item.target;
        }
        this.hide();
        this.currentIndex = (this.currentIndex + 1) % this.items.length;
    }
};

// ===================================
// QR CODE MODAL LOGIC
// ===================================
function setupQRModal() {
    const qrTrigger = document.querySelector('.footer-qr-img');
    const modal = document.getElementById('qr-modal');

    if (!qrTrigger || !modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    qrTrigger.style.cursor = 'pointer';
    qrTrigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Also close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===================================
// CONTACT MODAL LOGIC
// ===================================
function setupContactModal() {
    const contactTrigger = document.getElementById('contact-assist-btn');
    const modal = document.getElementById('contact-modal');

    if (!contactTrigger || !modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');

    const openModal = () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    contactTrigger.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

