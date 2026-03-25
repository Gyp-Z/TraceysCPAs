# Tracey & Tracey CPAs — Website Redesign

A full redesign of the public-facing website for Tracey & Tracey Certified Public Accountants, LLC — a South Jersey accounting and wealth management firm with offices in Linwood and Egg Harbor City, NJ.

**Live site:** [traceycpas.com](https://www.traceycpas.com)

---

## Overview

The firm's previous site was outdated and difficult to navigate. This project replaced it with a clean, responsive redesign built without any frameworks or build tools — just well-organized vanilla HTML, CSS, and JavaScript.

The goal was a professional, fast-loading site that the firm could rely on without any dependencies to maintain or update over time.

---

## Pages

- **Homepage (`index.html`)** — Hero, services overview, tax tips, tax center, investment access, contact section, and footer
- **About (`about.html`)** — Firm history, founder bio, and team profiles

---

## Features

- **Responsive layout** — Works across desktop, tablet, and mobile without a CSS framework
- **Animated navbar** — Starts transparent over the hero, transitions to solid dark navy on scroll; includes a mobile hamburger menu and a desktop dropdown
- **Accordion components** — Three independently-styled accordion types (Tax Tips, Services, Tax Center) with category tags and source citations
- **News carousel** — Auto-cycling image carousel with manual controls and dot indicators in the Tax Tips section
- **Modals** — Contact and QR code modals triggered from multiple entry points
- **Reveal-on-scroll animations** — Elements animate in as they enter the viewport via IntersectionObserver
- **Tax deadline tracker** — Current-year filing deadlines displayed prominently for clients
- **Regulatory compliance** — Kestra/FINRA disclosures and BrokerCheck links required by financial industry regulations are built in and protected from accidental removal

---

## Tech

**Pure vanilla stack — no build step, no frameworks, no package manager.**

| Layer | Choice |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 with custom properties (design tokens) |
| Interactivity | Vanilla JavaScript (ES6) |
| Server config | Apache `.htaccess` (security headers, CSP, caching) |

### CSS Architecture

Styles are split into three files for maintainability:

- `css/base.css` — Design tokens, resets, typography, animations
- `css/layout.css` — Section layouts, grid systems, hero
- `css/components.css` — Navbars, cards, accordions, modals, buttons

All colors, spacing, and typography are driven by CSS custom properties — nothing is hardcoded.

### JavaScript Architecture

- `js/navigation.js` — Navbar scroll behavior, mobile toggle, dropdown menus, anchor scroll offset fix
- `js/components.js` — Accordions, carousels, modals, reveal-on-scroll
- `js/main.js` — Page-specific init and miscellaneous interactions

---

## Security

The `.htaccess` file sets:
- Content Security Policy (CSP)
- `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` headers
- Cache headers for static assets

---

## Project Context

This was a freelance project for a family client. The existing WordPress site was replaced entirely with a hand-coded static site to improve performance, eliminate maintenance overhead, and give the firm a more modern and professional presence.

All content, design decisions, and regulatory disclosures were coordinated with the firm.
