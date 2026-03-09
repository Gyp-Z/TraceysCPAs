# Tracey & Tracey CPAs — Project Context for AI Models

## Project Overview

This is a **static HTML/CSS/JS website** for **Tracey & Tracey CPAs**, a South Jersey accounting firm. The site was rebuilt from scratch as a redesign. There is no build step, no framework, and no package manager — all files are served as-is.

- **Live domain:** `https://www.traceycpas.com`
- **Repo:** `https://github.com/Gyp-Z/TraceysCPAs` (private)
- **Pages:** `index.html` (homepage), `about.html` (About Us)
- **Stack:** Vanilla HTML5, CSS3, JavaScript (ES6)

---

## File Structure

```
tracey-cpas-redesign/
├── index.html          # Homepage — all main sections
├── about.html          # About Us page (Firm, Founder, Team)
├── css/
│   ├── base.css        # Design tokens, resets, typography, animations
│   ├── layout.css      # Section layouts, grid systems, hero
│   └── components.css  # Navbars, cards, accordions, modals, buttons
├── js/
│   ├── navigation.js   # Navbar scroll behavior, mobile toggle, dropdowns
│   ├── components.js   # Accordions, carousels, modals, reveal-on-scroll
│   └── main.js         # Page-specific init and misc interactions
├── assets/             # All images and icons (JPG/PNG, no SVG)
└── .htaccess           # Apache server config (security headers, caching)
```

---

## Design System (CSS Variables — `base.css`)

All styling relies on these CSS custom properties. **Never hardcode colors, spacing, or fonts.**

### Brand Colors
| Token | Value | Usage |
|---|---|---|
| `--primary-color` | `#0f172a` | Deep Navy — navbar bg, headings |
| `--primary-light` | `#1e293b` | Slate 800 — subtle dark contrast |
| `--accent-color` | `#dc2626` | Modern Red — CTAs, highlights, links |
| `--accent-hover` | `#b91c1c` | Darker Red — hover states |
| `--bg-primary` | `#f8fafc` | Off-white — alternating section bg |
| `--bg-secondary` | `#f8fafc` | Same off-white (intentional) |
| `--bg-dark` | `#0f172a` | Dark Navy — footer |
| `--text-primary` | `#1f2937` | Body text |
| `--text-secondary` | `#4b5563` | Subtitles, supporting text |

### Typography
- **Font:** `Rubik` (Google Fonts) — weights 300, 400, 500, 600, 700
- **Font tokens:** `--font-primary` and `--font-display` both point to `'Rubik', sans-serif`
- Base font size: `16px`

### Spacing
- `--spacing-xs`: 0.5rem | `--spacing-sm`: 1rem | `--spacing-md`: 2.5rem
- `--spacing-lg`: 5rem | `--spacing-xl`: 8rem
- Standard section padding: `.section-padding { padding: 8rem 0; }`

### Border Radius
Sharp, professional corners by design:
- `--radius-sm`: 0px | `--radius-md`: 2px | `--radius-lg`: 4px | `--radius-xl`: 8px

### Shadows
- `--shadow-sm` through `--shadow-xl` — soft, diffuse, modern

---

## Section Map (index.html)

| Section | ID | Class | Background |
|---|---|---|---|
| Navigation | — | `.navbar.transparent-nav` | Transparent → Dark on scroll |
| Hero | — | `.hero.home-hero.full-height-hero` | Full-bleed image |
| News & Tax Tips | `#tax-tips` | `.tax-tips` | `bg-primary` (off-white) |
| Services | `#services` | `.services` | `bg-secondary` (off-white) |
| Tax Center | `#tax-center` | `.tax-center` | `bg-primary` |
| Asset Management & Investments | `#investments` | `.investments` | `bg-secondary` |
| Contact | `#contact` | `.contact` | Default |
| Footer | — | `footer` | `bg-dark` (navy) |

---

## Section Map (about.html)

| Section | Anchor | Notes |
|---|---|---|
| Hero | — | Page-specific hero, not full-height |
| Our Firm | `#firm` | History and overview of the practice |
| Our Founder | `#founder` | James Tracey bio + photo |
| Our Team | `#team` | Team member cards (Pam, Triboletti shown; others removed) |

---

## Navigation Rules

- **Navbar** starts transparent over the hero, transitions to solid dark navy on scroll
- **Desktop dropdown** under "About Us" links to `about.html#firm`, `about.html#founder`, `about.html#team`
- **Mobile toggle**: hamburger menu (`.nav-toggle`) with 3 `<span>` bars
- **Anchor scroll fix**: when navigating from another page to an anchor (e.g., `about.html#firm`), the JS in `navigation.js` handles the scroll offset to avoid content hiding behind the fixed navbar
- **"Tax Portal" link** opens `https://onvio.us/#/` in a new tab — styled with `.nav-link-portal` (distinct appearance)
- **Do not wrap the navbar** — it is a single-line flex row at all breakpoints. If items don't fit, reduce font size or spacing before ever allowing wrapping.

---

## Component Rules

### Accordions
Three accordion types exist, each with distinct class naming:
1. **Tax Tips** (`.tip-accordion-item`, `.tip-accordion-header`, `.tip-accordion-content`)
2. **Services** (`.service-accordion-item`, `.service-header`, `.service-content`)
3. **Tax Center** (`.tax-accordion-item`, `.tax-header`, `.tax-content`)

Each has a `+`/`-` toggle icon. **Do not mix these class names** — each is styled independently.

### Carousels
The News & Tax Tips section uses a mini image carousel (`.news-carousel`) with:
- `.carousel-slide.active` for the visible slide
- `.carousel-btn.prev` / `.carousel-btn.next` for navigation
- `.carousel-dots` / `.dot.active` for indicator dots

### Modals
Two modals exist on `index.html`:
- `#contact-modal` — triggered by "Contact Us for Assistance" button, shows phone number `(609) 904-2192`
- `#qr-modal` — triggered by QR code image in footer, shows enlarged QR code

### Reveal on Scroll
Elements with class `.reveal` animate up on scroll via IntersectionObserver in `components.js`. Add `.reveal` to any new section container to enable this effect.

---

## Business Rules & Content Rules

### Content That Must Not Be Changed
- **Firm name:** Always "Tracey & Tracey CPAs" or "Tracey & Tracey Certified Public Accountants, LLC"
- **Investment arm name:** "Tracey Wealth Management Co."
- **Kestra disclosures** in the footer are **legally required** — do not edit, remove, or reword them
- **BrokerCheck link** (`https://brokercheck.finra.org/`) must remain present and visible on both the Investments section and the footer
- **Tax Portal link** (`https://onvio.us/#/`) must remain in the navbar and open in a new tab

### Contact Information
| Location | Address | Phone |
|---|---|---|
| Linwood Office | 327 Central Avenue, Suite 101, Linwood, NJ 08221 | (609) 927-9305 |
| Egg Harbor City Office | 230 Philadelphia Avenue, Egg Harbor City, NJ 08215 | (609) 965-7709 |
| Email | info@traceycpas.com | — |
| Investments Assist | — | (609) 904-2192 (modal only) |

### Team Members (About Page)
Only the following team members currently have photos and cards displayed:
- **James Tracey** — Founder (photo: `assets/James-Tracey.jpg`)
- **Pam** — Team (photo: `assets/Pam.jpg`)
- **Triboletti** — Team (photo: `assets/Triboletti.jpg`)

Other team member photos/cards were removed per client request. Do not re-add them without explicit instruction.

### Investments Section
- The NFS Accounts card uses a **left-image / right-content** layout (`.nfs-card`, `.card-image-left`, `.card-content-right`)
- The "Access Account" button links to `https://www.mystreetscape.com/auth/kestra/login`
- The section heading is **"Our Investment Sites"** (not "Client Access" or "Investments")
- A "Contact Us for Assistance" note appears **above** the NFS card

### News & Tax Tips
- Tips are added as `.tip-accordion-item` entries with category tags (Individual, Business, International)
- Each tip must include a `tip-date`, `tip-category`, `tip-title`, content paragraph, and a `.tip-source` link to a reputable source (IRS, AICPA, major law firm, etc.)

### Tax Deadlines
The deadlines block (`#tax-deadlines`) is updated annually. Current deadlines reflect **2026 tax year**:
- 1065 & 1120S → March 16, 2026
- 1040, 1041, 1120C, FinCEN 114-FBAR → April 15, 2026
- 990 → May 15, 2026
- NJ deadlines link: `https://www.nj.gov/treasury/taxation/pdf/chronolist26.pdf`

---

## Security & Performance Rules (`.htaccess`)

The `.htaccess` file configures:
- **Content Security Policy (CSP):** inline scripts are blocked except where `unsafe-inline` is set for styles. No external JS CDNs allowed.
- **Cache headers** for static assets
- **Security headers**: X-Frame-Options, X-Content-Type-Options, Referrer-Policy

When adding new external resources (fonts, scripts, images), the CSP in both `.htaccess` **and** the `<meta http-equiv="Content-Security-Policy">` tag in each HTML file's `<head>` must be updated to allow the new source.

---

## Known Past Decisions

- **No hero text/tagline content** beyond "Welcome to your South Jersey Accounting Solution" — the previous firm description paragraph was removed per client request
- **`bg-primary` and `bg-secondary` are the same color** — this is intentional. Sections visually separate through spacing and content, not alternating backgrounds.
- **Container width** is `min(98%, 1800px)` — widened from standard to fill more screen on large monitors per client preference
- **Founder and Team section backgrounds match** — set to the same background color intentionally after an earlier mismatch was corrected
- **Scroll padding** is `20px` on `html` — keeps anchor targets just below the fixed navbar
