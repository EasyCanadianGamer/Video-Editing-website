/* =============================================
   CANADIAN GAMER — main.js
   Navbar scroll state, fade-in animations,
   hamburger menu, smooth scroll
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- NAVBAR SCROLL STATE ----- */
  const navbar = document.getElementById('navbar');

  const updateNavbar = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar(); // run once on load


  /* ----- HAMBURGER MENU ----- */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when any nav link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  /* ----- SMOOTH SCROLL ----- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* ----- INTERSECTION OBSERVER — FADE IN ----- */
  const fadeObserver = window._fadeObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          fadeObserver.unobserve(entry.target); // fire once only
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  document.querySelectorAll('[data-animate]').forEach(el => {
    fadeObserver.observe(el);
  });

});
