/**
 * CRAFTLINE STUDIO — CORE JAVASCRIPT
 * Premium Digital Creative Agency
 * Vanilla ES6+ Implementation: Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* --------------------------------------------------------------------------
     1. DYNAMIC COPYRIGHT YEAR
     -------------------------------------------------------------------------- */
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------------------------------
     2. STICKY NAVBAR & GLASSMORPHISM ON SCROLL
     -------------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top-btn');

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    // Header glassmorphism threshold
    if (header) {
      if (currentScrollY > 20) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }
    }

    // Back to top button visibility threshold
    if (backToTopBtn) {
      if (currentScrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial run

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------------------------------
     3. ACTIVE NAVIGATION INDICATOR (SCROLLSPY)
     -------------------------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}` || link.dataset.section === sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* --------------------------------------------------------------------------
     4. MOBILE HAMBURGER MENU & DRAWER
     -------------------------------------------------------------------------- */
  const mobileToggle  = document.getElementById('mobile-menu-toggle');
  const mobileDrawer  = document.getElementById('mobile-nav-drawer');
  const mobileClose   = document.getElementById('mobile-menu-close');
  const mobileOverlay = document.getElementById('mobile-nav-overlay');
  // All tappable links inside the drawer (nav links + footer CTA)
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta-link');

  // Breakpoint that matches the CSS @media (max-width: 1024px) rule
  const MOBILE_BREAKPOINT = 1024;

  /** Returns true when the drawer is currently open */
  const isMenuOpen = () =>
    !!(mobileDrawer && mobileDrawer.classList.contains('open'));

  /** Open the drawer and lock body scroll */
  const openMobileMenu = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    if (mobileToggle) {
      mobileToggle.classList.add('is-active');
      mobileToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.style.overflow = 'hidden';
  };

  /** Close the drawer, unlock body scroll, reset the hamburger icon */
  const closeMobileMenu = () => {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    if (mobileToggle) {
      mobileToggle.classList.remove('is-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  };

  // ── Hamburger toggle button ─────────────────────────────────────────────
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      if (isMenuOpen()) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  // ── Close button (✕) inside the drawer ──────────────────────────────────
  if (mobileClose) {
    mobileClose.addEventListener('click', () => {
      closeMobileMenu();
      if (mobileToggle) mobileToggle.focus(); // return focus for keyboard users
    });
  }

  // ── Dim overlay tap ─────────────────────────────────────────────────────
  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', closeMobileMenu);
  }

  // ── Nav links & CTA inside drawer ───────────────────────────────────────
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();       // prevent instant native jump
        closeMobileMenu();
        // Wait for the CSS slide transition to finish (≈ 300ms), then scroll
        setTimeout(() => {
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }, 320);
      } else {
        closeMobileMenu();        // external link — just close
      }
    });
  });

  // ── Escape key ──────────────────────────────────────────────────────────
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMenuOpen()) {
      closeMobileMenu();
      if (mobileToggle) mobileToggle.focus();
    }
  });

  // ── Viewport resize ─────────────────────────────────────────────────────
  // When screen grows past the breakpoint, close the drawer immediately and
  // restore body scroll so the desktop layout is never blocked.
  // Use ResizeObserver on <html> for accuracy; fall back to window resize.
  const handleViewportChange = () => {
    if (window.innerWidth > MOBILE_BREAKPOINT && isMenuOpen()) {
      closeMobileMenu();
    }
  };

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(handleViewportChange);
    ro.observe(document.documentElement);
  } else {
    window.addEventListener('resize', handleViewportChange, { passive: true });
  }

  /* --------------------------------------------------------------------------
     5. SCROLL-TRIGGERED REVEAL ANIMATIONS (IntersectionObserver)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay;
          if (delay) {
            setTimeout(() => {
              entry.target.classList.add('is-revealed');
            }, parseInt(delay, 10));
          } else {
            entry.target.classList.add('is-revealed');
          }
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  /* --------------------------------------------------------------------------
     6. ANIMATED NUMBER COUNTERS (Why Craftline Section)
     -------------------------------------------------------------------------- */
  const counterElements = document.querySelectorAll('.stat-counter');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800; // ms
      const steps = 60;
      const stepTime = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        counter.textContent = `${prefix}${Math.round(current)}${suffix}`;
      }, stepTime);
    });
  };

  const statsSection = document.querySelector('.why-visual-col');
  if (statsSection && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsSection);
  } else if (counterElements.length > 0) {
    animateCounters();
  }

  /* --------------------------------------------------------------------------
     7. PORTFOLIO CATEGORY FILTERING
     -------------------------------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button state
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      // Filter project cards with subtle transition
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');

        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.classList.remove('is-hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 60);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.classList.add('is-hidden');
          }, 250);
        }
      });
    });
  });

  /* --------------------------------------------------------------------------
     8. TESTIMONIAL CAROUSEL
     -------------------------------------------------------------------------- */
  const track = document.getElementById('testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.dot-btn');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoplayTimer = null;

  const updateCarousel = (index) => {
    if (!track) return;
    currentSlide = (index + totalSlides) % totalSlides;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update slides accessibility
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentSlide);
    });

    // Update dots state
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
      dot.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
  };

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
      resetAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
      updateCarousel(slideIndex);
      resetAutoplay();
    });
  });

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  if (track) {
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  const handleSwipe = () => {
    const swipeThreshold = 45;
    if (touchEndX < touchStartX - swipeThreshold) {
      updateCarousel(currentSlide + 1);
      resetAutoplay();
    } else if (touchEndX > touchStartX + swipeThreshold) {
      updateCarousel(currentSlide - 1);
      resetAutoplay();
    }
  };

  // Autoplay functionality
  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      updateCarousel(currentSlide + 1);
    }, 6500);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();

  // Pause autoplay on carousel mouse hover
  const carouselContainer = document.querySelector('.testimonial-carousel-container');
  if (carouselContainer) {
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    carouselContainer.addEventListener('mouseleave', () => startAutoplay());
  }

  /* --------------------------------------------------------------------------
     9. PROJECT CASE STUDY MODAL (Accessible Native <dialog>)
     -------------------------------------------------------------------------- */
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContentSlot = document.getElementById('modal-content-slot');
  const viewProjectButtons = document.querySelectorAll('.view-project-btn');

  // Case Study Content Library
  const projectCaseStudies = {
    finora: {
      category: 'Fintech Dashboard • Web Design & Development',
      title: 'FINORA — Next-Gen Wealth OS',
      lead: 'Finora approached Craftline Studio to reimagine wealth management for high-net-worth digital investors. The result is an intuitive dark-mode interface combining real-time asset telemetry with sub-second portfolio rebalancing.',
      stats: [
        { val: '+142%', label: 'Engagement Velocity' },
        { val: '< 0.4s', label: 'Telemetry Latency' },
        { val: '99.8%', label: 'Accessibility Score' }
      ],
      features: [
        'Real-time SVG charting pipeline with dynamic gradient fill',
        'Multi-currency telemetry and automated yield projection engine',
        'Custom modular design token system built for high density views',
        'Strict zero-dependency vanilla JS architecture for instant loading'
      ],
      techStack: ['HTML5 Semantic Canvas', 'Modern CSS Grid', 'Vanilla ES6+', 'SVG Data Visualization']
    },
    lumora: {
      category: 'Brand Identity & Visual System',
      title: 'LUMORA — Sustainable Luxury Universe',
      lead: 'Lumora required a comprehensive digital and physical brand presence that radiated quiet refinement without sacrificing modern digital applicability across web and packaging.',
      stats: [
        { val: '100%', label: 'Bespoke Typography' },
        { val: '32+', label: 'Design System Tokens' },
        { val: '4.9★', label: 'Brand Reception' }
      ],
      features: [
        'Curated typographic scale pairing geometric elegance with high readability',
        'Tactile packaging guidelines and embossed metallic digital assets',
        'Responsive color hierarchy engineered for WCAG AAA contrast',
        'Modular brand guideline portal for international creative teams'
      ],
      techStack: ['Brand Strategy', 'Art Direction', 'Typography Systems', 'Figma Design Tokens']
    },
    elevate: {
      category: 'Enterprise SaaS • Digital Experience',
      title: 'ELEVATE — Distributed Workflow Cloud',
      lead: 'Elevate wanted an enterprise marketing website and interactive app showcase capable of converting technical directors and engineering leaders while maintaining blazing-fast performance.',
      stats: [
        { val: '99/100', label: 'Lighthouse Performance' },
        { val: '2.8x', label: 'Conversion Uplift' },
        { val: '12ms', label: 'Node Sync Latency' }
      ],
      features: [
        'Interactive live pipeline simulation built directly in semantic CSS/JS',
        'Engineered responsive layouts supporting multi-monitor enterprise setups',
        'Integrated micro-interactions enhancing button and card feedback',
        'Sub-second first contentful paint (FCP) achieved without heavy frameworks'
      ],
      techStack: ['Performance Engineering', 'CSS Keyframe Systems', 'Semantic HTML5', 'Vanilla JavaScript']
    }
  };

  const openProjectModal = (projectId) => {
    const project = projectCaseStudies[projectId];
    if (!project || !projectModal || !modalContentSlot) return;

    modalContentSlot.innerHTML = `
      <div class="modal-header-meta">
        <span class="modal-cat">${project.category}</span>
      </div>
      <h3 class="modal-project-title" id="modal-project-title">${project.title}</h3>
      <p class="modal-lead">${project.lead}</p>

      <div class="modal-stats-grid">
        ${project.stats.map(s => `
          <div class="modal-stat-item">
            <div class="m-stat-val">${s.val}</div>
            <div class="m-stat-label">${s.label}</div>
          </div>
        `).join('')}
      </div>

      <div class="modal-section-title" style="font-family: var(--font-display); font-weight: 700; color: #FFF; margin-bottom: 0.5rem; font-size: 1.1rem;">
        Key Architectural Highlights
      </div>
      <ul style="list-style: disc; padding-left: 1.25rem; color: var(--text-secondary); margin-bottom: 1.5rem; line-height: 1.6; font-size: 0.925rem;">
        ${project.features.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
      </ul>

      <div class="modal-tech-stack">
        ${project.techStack.map(t => `<span class="tag-pill tag-blue">${t}</span>`).join('')}
      </div>

      <div class="modal-actions" style="margin-top: 1.5rem;">
        <a href="#contact" class="btn btn-primary modal-contact-trigger">
          <span>Inquire Similar Project</span>
          <svg class="btn-arrow" viewBox="0 0 16 16" fill="none">
            <path d="M3.333 8h9.334M8.667 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    `;

    // Hook up modal CTA to close modal and scroll to contact
    const modalCta = modalContentSlot.querySelector('.modal-contact-trigger');
    if (modalCta) {
      modalCta.addEventListener('click', () => {
        closeProjectModal();
      });
    }

    if (typeof projectModal.showModal === 'function') {
      projectModal.showModal();
    } else {
      projectModal.setAttribute('open', '');
    }
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    if (typeof projectModal.close === 'function') {
      projectModal.close();
    } else {
      projectModal.removeAttribute('open');
    }
    document.body.style.overflow = '';
  };

  viewProjectButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project');
      openProjectModal(projectId);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  // Light dismiss: click outside dialog box
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      const rect = projectModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeProjectModal();
      }
    });

    projectModal.addEventListener('cancel', () => {
      document.body.style.overflow = '';
    });
  }

  /* --------------------------------------------------------------------------
     10. CONTACT FORM VALIDATION & FRONTEND SIMULATION
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const successBanner = document.getElementById('form-success-banner');
  const successClientName = document.getElementById('success-client-name');
  const successResetBtn = document.getElementById('success-reset-btn');
  const submitBtn = document.getElementById('submit-btn');

  const fields = {
    name: {
      input: document.getElementById('contact-name'),
      error: document.getElementById('name-error'),
      group: document.getElementById('group-name'),
      validate: (val) => val.trim().length >= 2 ? '' : 'Please enter your full name (minimum 2 characters).'
    },
    email: {
      input: document.getElementById('contact-email'),
      error: document.getElementById('email-error'),
      group: document.getElementById('group-email'),
      validate: (val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!val.trim()) return 'Email address is required.';
        if (!emailRegex.test(val.trim())) return 'Please provide a valid email address.';
        return '';
      }
    },
    subject: {
      input: document.getElementById('contact-subject'),
      error: document.getElementById('subject-error'),
      group: document.getElementById('group-subject'),
      validate: (val) => val ? '' : 'Please select an area of interest.'
    },
    message: {
      input: document.getElementById('contact-message'),
      error: document.getElementById('message-error'),
      group: document.getElementById('group-message'),
      validate: (val) => val.trim().length >= 10 ? '' : 'Please provide details about your project (minimum 10 characters).'
    }
  };

  // Real-time error removal on input
  Object.values(fields).forEach(field => {
    if (field.input) {
      field.input.addEventListener('input', () => {
        if (field.group.classList.contains('has-error')) {
          const errorMsg = field.validate(field.input.value);
          if (!errorMsg) {
            field.group.classList.remove('has-error');
            field.error.textContent = '';
          }
        }
      });
    }
  });

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isFormValid = true;
      let firstInvalidInput = null;

      // Validate all fields
      Object.entries(fields).forEach(([key, field]) => {
        const errorMsg = field.validate(field.input.value);
        if (errorMsg) {
          isFormValid = false;
          field.group.classList.add('has-error');
          field.error.textContent = errorMsg;
          if (!firstInvalidInput) {
            firstInvalidInput = field.input;
          }
        } else {
          field.group.classList.remove('has-error');
          field.error.textContent = '';
        }
      });

      if (!isFormValid) {
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      // Simulated submit state
      if (submitBtn) {
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
      }

      // Simulate network dispatch with realistic 1.2s delay
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('loading');
          submitBtn.disabled = false;
        }

        const clientNameVal = fields.name.input.value.trim();
        if (successClientName) {
          successClientName.textContent = clientNameVal || 'Client';
        }

        if (successBanner) {
          successBanner.removeAttribute('hidden');
          successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        // Reset form
        contactForm.reset();
        contactForm.style.display = 'none';
      }, 1200);
    });
  }

  if (successResetBtn) {
    successResetBtn.addEventListener('click', () => {
      if (successBanner) {
        successBanner.setAttribute('hidden', '');
      }
      if (contactForm) {
        contactForm.style.display = 'flex';
        fields.name.input.focus();
      }
    });
  }

  // Smooth scroll click handler for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
