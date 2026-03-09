/**
 * navigation.js
 * Responsibility: Smooth Scrolling, Scroll Spy, Fixed Navbar Effects, and Mobile Menu.
 * 
 * This module manages the user's journey through the site structure.
 * Responsibilities:
 * - Handling header anchor links with smooth scrolling and offset adjustment.
 * - Managing the mobile hamburger menu toggle states.
 * - Updating the active navigation link based on scroll position (Scroll Spy).
 */

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
// Select all links with a hash (local or full URL)
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Skip invalid links
        if (href === '#' || href === 'javascript:void(0)') return;

        // Parse the link
        const [path, hash] = href.split('#');

        // Check if we are on the same page
        // "Same page" means: 
        // 1. Link logic is just "#hash" (path is empty)
        // 2. Link path matches current pathname (e.g. "about.html" matches "/about.html" or "/about")
        // 3. Link path is "index.html" and we are on root "/"

        const currentPath = window.location.pathname;
        const isSamePage =
            path === '' ||
            currentPath.endsWith(path) ||
            (path === 'index.html' && (currentPath === '/' || currentPath === '')) ||
            (path === 'about.html' && currentPath.includes('about'));

        if (isSamePage && hash) {
            e.preventDefault();
            const targetId = '#' + hash;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 100; // Adjusted for 90px header + buffer
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        }
    });
});

// ===================================
// NAVIGATION SCROLL EFFECTS
// ===================================
// ===================================
// NAVIGATION SCROLL EFFECTS
// ===================================
const nav = document.querySelector('.navbar');
if (nav) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const heroSection = document.querySelector('.hero') || document.querySelector('#firm');

        if (heroSection) {
            // Calculate progress: 0 at top, 1 at hero bottom
            const heroHeight = heroSection.offsetHeight;
            let progress = currentScroll / (heroHeight - 90); // 90 is navbar height

            // Clamp progress between 0 and 1
            progress = Math.min(Math.max(progress, 0), 1);

            // Update CSS variables for smooth interpolation
            // Alpha: Starts at 0, goes to 0.85
            const alpha = progress * 0.85;
            // Blur: Starts at 0px, goes to 12px
            const blur = progress * 12;

            nav.style.setProperty('--nav-alpha', alpha);
            nav.style.setProperty('--nav-blur', `${blur}px`);

            // Keep the class for other potential styles, but rely on vars for bg/blur
            if (progress > 0.1) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        } else {
            // Fallback for pages without hero
            nav.classList.add('scrolled');
            nav.style.setProperty('--nav-alpha', 0.85);
            nav.style.setProperty('--nav-blur', '12px');
        }
    });
}

// ===================================
// MOBILE MENU TOGGLE
// ===================================
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Automatically close mobile menu when a navigation link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// SCROLL SPY
// ===================================
// Highlights the current section in the navigation as the user scrolls
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link, .sub-nav-link');

function scrollSpy() {
    const scrollY = window.pageYOffset;
    const navBrand = document.querySelector('.nav-brand');
    const isHomePage = document.querySelector('.hero'); // Check if on Homepage

    // 1. Home Indicator Logic (Only on Home Page)
    if (navBrand && isHomePage) {
        if (scrollY < 100) {
            navBrand.classList.add('active');
            // Explicitly clear other nav lines when at top
            navLinks.forEach(link => link.classList.remove('active'));
        } else {
            navBrand.classList.remove('active');
        }
    } else if (navBrand && !isHomePage) {
        // On subpages (e.g. About), never underline the logo
        navBrand.classList.remove('active');
    }

    // 2. Section Highlighting (Only if sections exist)
    if (sections.length > 0) {
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 150; // Buffer for fixed header
            const sectionId = section.getAttribute('id');
            // Find ANY link (nav or sub-nav) that points to this section
            const activeLinks = document.querySelectorAll(`a[href*="${sectionId}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                if (activeLinks.length > 0) {
                    // Clear active state from all links first (except About dropdown parent)
                    navLinks.forEach(link => {
                        if (!isHomePage && link.href.includes('about.html') && link.classList.contains('dropdown-toggle')) {
                            return;
                        }
                        link.classList.remove('active');
                    });

                    // Set active state for specifically matching links
                    activeLinks.forEach(link => link.classList.add('active'));

                    // Optional: Update URL on scroll (debounce recommended if used heavily)
                    // Checking if hash is already set to avoid spamming history
                    if (history.replaceState && window.location.hash !== `#${sectionId}`) {
                        history.replaceState(null, null, `#${sectionId}`);
                    }
                }
            }
        });
    }
}

window.addEventListener('scroll', scrollSpy);
// Ensure it runs on page load (refresh)
window.addEventListener('load', scrollSpy);
