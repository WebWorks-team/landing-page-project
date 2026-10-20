# CRAFTLINE STUDIO — Premium Digital Creative Agency Website

> **"Crafting meaningful digital experiences through design and technology."**

A bespoke, production-grade digital agency website built with pure semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+). Engineered with award-winning aesthetic standards, meticulous typography, fluid micro-interactions, dark-mode ambient lighting, and zero external framework dependencies.

---

## 1. Project Overview

**Craftline Studio** is a boutique digital creative agency specializing in:
- **Website Design & Development**
- **UI/UX Product Design**
- **Brand Identity & Creative Systems**
- **Digital Solutions & Accessibility Auditing**

This website was engineered for an academic capstone assignment to demonstrate senior-level frontend engineering, modern design systems, clean code architecture, and high-performance interactive experiences without relying on heavy frameworks like React, Vue, Bootstrap, or Tailwind CSS.

---

## 2. Technologies Used

- **HTML5**: Semantic landmark structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dialog>`, `<footer>`), ARIA accessibility roles, OpenGraph metadata tags.
- **CSS3**: Custom design tokens (CSS variables), CSS Grid & Flexbox, Glassmorphism (`backdrop-filter`), CSS keyframe animations, `@media (prefers-reduced-motion)` accessibility, responsive viewports down to 360px.
- **Vanilla JavaScript (ES6+)**: `IntersectionObserver` scroll-triggered reveals, touch-enabled testimonial carousel, dynamic portfolio category filtering, modal case study dialog, input validation engine, and live scrollspy navigation tracker.
- **Typography**: Google Fonts ([Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for body and UI elements, [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) for editorial headlines).
- **Zero Third-Party Bundlers or External Runtime Libraries**: 100% self-contained code.

---

## 3. Main Features & Technical Highlights

1. **Header & Sticky Navigation**:
   - Transparent hero navigation transitioning smoothly to a frosted glassmorphism bar on scroll.
   - Active section scrollspy highlighting the current viewport section.
   - Dedicated, easily swappable logo placeholder in both header and footer.
   - Fully animated mobile drawer menu with hamburger-to-X morphing, backdrop blur, and keyboard trap support.

2. **Hero Section (Redesigned Centered Layout)**:
   - Centered composition with balanced typography and optical alignment.
   - Luminous multi-layered ambient background orbs (violet, electric blue, and purple) with smooth CSS floating keyframe animations.
   - Availability status badge with real-time pulsing indicator.
   - Main headline with high-contrast gradient text and line breaks.
   - Dual-action CTAs ("Explore Our Work" and "Start a Project") with glowing hover micro-interactions.
   - Centered trust indicators glass pill with demonstration metrics (50+ Products, 100% Satisfaction, 5.0★ Rating, 12+ Awards).
   - Staggered entrance animations respecting `prefers-reduced-motion`.

3. **About Section**:
   - Headline: *"Design With Purpose. Build With Precision."*
   - Concise agency introduction and three brand value cards: **Creative Thinking**, **Strategic Approach**, and **Thoughtful Execution**.

4. **Services Bento Grid**:
   - Four distinct service cards with bespoke SVG iconography, capabilities tags, directional arrows, and mouse-over glow states.

5. **Selected Work / Portfolio Showcase**:
   - Three fictional flagship projects:
     - **FINORA**: Fintech Wealth Management Dashboard (Web Design & Development)
     - **LUMORA**: Sustainable Luxury Brand Identity & Visual System (Branding)
     - **ELEVATE**: High-Performance Enterprise SaaS Website (Development & Web Design)
   - Real-time client-side category filtering (`All`, `Web Design`, `Branding`, `Development`) with smooth fade/slide transitions.
   - Interactive "View Case Study" modal dialog (`<dialog>`) featuring project breakdowns, architecture highlights, and metrics.

6. **Why Craftline Studio**:
   - Four core agency pillars: Purposeful Design, Modern Technology, Creative Problem Solving, and User-Focused Experiences.
   - Animated numeric counters triggered by `IntersectionObserver`.
   - Fictional demonstration notice for academic clarity.

7. **Our Creative Process**:
   - Four-step connected methodology: **01 Discover**, **02 Strategize**, **03 Design & Develop**, **04 Deliver**.
   - Connected timeline with glowing numbered nodes.

8. **Client Testimonials Carousel**:
   - 3 fictional sample client testimonials with star ratings and stylized initial avatars.
   - Smooth slide transitions, previous/next controls, pagination dots, mobile touch-swipe support, and auto-play with hover pause.

9. **Contact Section & Client-Side Validation**:
   - Dual-column layout featuring agency contact details and responsive inquiry form.
   - Real-time validation for Full Name, Email format (regex), Subject selection, and Message length.
   - Animated loading spinner during submission simulation.
   - In-place success feedback banner with form reset capability.
   - Academic disclaimer clarifying no backend server is connected.

10. **Strictly Minimal Footer**:
    - Complies with strict minimal requirements: Craftline Studio logo placeholder, LinkedIn profile placeholder (`https://www.linkedin.com/in/your-profile/`), GitHub profile placeholder (`https://github.com/your-username`), and automatically computed copyright year. No redundant links or columns.

11. **Accessibility & Usability**:
    - `skip-to-content` link for keyboard users.
    - High-contrast color tokens adhering to WCAG standards.
    - Full `@media (prefers-reduced-motion: reduce)` support.
    - Back-to-top button with smooth scroll.

---

## 4. Project Structure

```text
craftline-studio/
│
├── index.html        # Semantic HTML5 markup, accessible landmarks, modal structure
├── style.css         # Complete CSS3 design system, animations, glassmorphism, responsive queries
├── script.js         # Vanilla ES6+ interactivity, carousel, filters, modal, form validation
└── README.md         # Documentation, architecture, setup instructions, and deployment guide
```

---

## 5. How to Run Locally

Because this project is built with standard native web technologies, no build tools, compilers, or `node_modules` installations are required.

### Option 1: Direct Browser Launch
Simply double-click `index.html` or open it directly in any modern browser:
- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Edge

### Option 2: Local HTTP Server (Recommended)
Running through a local web server ensures optimal font caching and smooth asset resolution:

Using Python 3:
```bash
# In the project root directory:
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

Using Node.js (`npx serve` or `live-server`):
```bash
npx serve .
# or
npx live-server
```

Using VS Code:
- Install the **Live Server** extension by Ritwick Dey.
- Right-click `index.html` and select **"Open with Live Server"**.

---

## 6. How to Customize the Logo & Profile Links

### Replacing the Logo Placeholder
The navbar and footer contain an easily replaceable logo container:
```html
<!-- Inside index.html: -->
<a href="#home" class="brand-logo" id="brand-logo" aria-label="Craftline Studio">
  <!-- Replace the temporary SVG/text below with your official logo asset: -->
  <img src="assets/craftline-logo.svg" alt="Craftline Studio" class="brand-logo-img">
</a>
```
The CSS includes flexbox auto-centering to ensure seamless alignment for any custom SVG or PNG logo file.

### Replacing Social Profile Links
In `index.html` inside `<footer class="site-footer">`:
- Replace `https://www.linkedin.com/in/your-profile/` with your official LinkedIn profile URL.
- Replace `https://github.com/your-username` with your official GitHub profile URL.

---

## 7. Deployment Instructions

This frontend repository can be deployed instantly for free to any static hosting platform:

### Deploying to GitHub Pages
1. Initialize git and commit your files:
   ```bash
   git init
   git add .
   git commit -m "Initial release of Craftline Studio website"
   ```
2. Create a new repository on [GitHub](https://github.com).
3. Link your remote repository and push:
   ```bash
   git remote add origin https://github.com/your-username/craftline-studio.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   - Go to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select `Deploy from a branch`.
   - Choose `main` branch and `/ (root)` folder.
   - Click **Save**. Your site will be live at `https://your-username.github.io/craftline-studio/`.

### Deploying to Vercel or Netlify
- **Vercel**: Import your GitHub repository in the [Vercel Dashboard](https://vercel.com). Leave build settings default (no build command needed, publish directory: `.`).
- **Netlify**: Drag and drop the project folder onto [Netlify Drop](https://app.netlify.com/drop) or connect via Git.

---

## 8. License & Academic Attribution

Developed as an academic demonstration for modern web engineering and creative direction. Fictional brands (Finora, Lumora, Elevate) and client testimonials are demonstration fixtures created solely for portfolio exhibition.

&copy; 2026 CRAFTLINE STUDIO. All rights reserved.
