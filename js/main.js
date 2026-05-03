document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
  initNavToggle();
  initSmoothScroll();
  initScrollProgress();
  initScrollEffects();
  initScrollspy();
  initScrollCue();
});

/* ─── Theme ───────────────────────────────────────────────
   Dark is default (no class). Adding .light-mode = light.
──────────────────────────────────────────────────────── */
function initThemeToggle() {
  const btn  = document.querySelector('.theme-toggle');
  const body = document.body;
  if (localStorage.getItem('theme') === 'light') body.classList.add('light-mode');
  updateToggleIcon();

  btn?.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    updateToggleIcon();
  });
}

function updateToggleIcon() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  btn.textContent = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
}

/* ─── Nav Toggle (mobile) ──────────────────────────────── */
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const nav    = document.querySelector('nav');
  toggle?.addEventListener('click', () => nav?.classList.toggle('active'));
  document.querySelectorAll('nav a').forEach(a =>
    a.addEventListener('click', () => nav?.classList.remove('active'))
  );
}

/* ─── Smooth Scroll ────────────────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ─── Scroll Progress Bar ──────────────────────────────── */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id    = 'scroll-progress';
  document.body.prepend(bar);

  const update = () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width  = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}

/* ─── Scroll-cue hide on first scroll ─────────────────── */
function initScrollCue() {
  const cue = document.querySelector('.scroll-cue');
  if (!cue) return;
  const hide = () => { cue.classList.add('hidden'); window.removeEventListener('scroll', hide); };
  window.addEventListener('scroll', hide, { passive: true });
}

/* ─── Reveal & Parallax Effects ────────────────────────── */
function initScrollEffects() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header  = document.querySelector('header');

  // ── Sections: fade-up reveal (skip hero + sections that contain card grids) ──
  document.querySelectorAll('main section').forEach(el => {
    if (el.classList.contains('hero')) return;
    if (el.querySelector('.bento-grid, .bento-projects')) return; // cards handle their own reveal
    el.classList.add('reveal');
  });

  document.querySelectorAll('.about-content').forEach(el => el.classList.add('reveal'));

  // ── Cards: alternating right / left zipper alignment ──
  // First card goes RIGHT, second goes LEFT, alternating
  const cards = document.querySelectorAll('.bento-grid .bento-card, .bento-projects .project-card');
  cards.forEach((card, i) => {
    card.classList.add(i % 2 === 0 ? 'card-right' : 'card-left');
  });

  if (reduced) {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => el.classList.add('visible'));
    cards.forEach(card => card.classList.add('visible'));
    return;
  }

  // Header shrink on scroll
  window.addEventListener('scroll', () => {
    header?.classList.toggle('shrink', window.scrollY > 60);
  }, { passive: true });

  // Hero: fade + scale out as user scrolls past
  const hero = document.querySelector('.hero');
  if (hero) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const progress = Math.min(window.scrollY / (window.innerHeight * 0.65), 1);
          hero.style.opacity   = String(Math.max(1 - progress * 0.75, 0));
          hero.style.transform = `scale(${1 - progress * 0.04})`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ── Observer for sections (fade-up, standard) ──
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => sectionObserver.observe(el));

  // ── Observer for cards: zipper opens entering from bottom,
  //    fades/closes when near the top, reopens scrolling back up ──
  // rootMargin: shrink the active zone — 20% dead zone at top means
  // cards start closing before fully leaving, 5% at bottom means
  // they open as soon as they peek into view.
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0,
    rootMargin: '-18% 0px -5% 0px'
  });

  cards.forEach(el => cardObserver.observe(el));
}

/* ─── Scrollspy ─────────────────────────────────────────
   Highlights the nav link matching the section currently
   most visible in the viewport.
──────────────────────────────────────────────────────── */
function initScrollspy() {
  const sections  = document.querySelectorAll('main section[id]');
  const navLinks  = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const activate = id => {
    navLinks.forEach(link => {
      const matches = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('spy-active', matches);
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) activate(entry.target.id);
    });
  }, {
    threshold: 0,
    rootMargin: '-30% 0px -60% 0px'
  });

  sections.forEach(s => observer.observe(s));
}
