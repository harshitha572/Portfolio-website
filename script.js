(function () {
  const navToggleButton = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const toTop = document.getElementById('to-top');
  const yearEl = document.getElementById('year');
  const sections = document.querySelectorAll('main .section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if (navToggleButton && siteNav) {
    navToggleButton.addEventListener('click', function () {
      const isOpen = siteNav.classList.toggle('open');
      navToggleButton.setAttribute('aria-expanded', String(isOpen));
    });
    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (siteNav.classList.contains('open')) {
          siteNav.classList.remove('open');
          navToggleButton.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function handleScroll() {
    if (window.scrollY > 600) {
      toTop && toTop.classList.add('show');
    } else {
      toTop && toTop.classList.remove('show');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function setActiveLink() {
    let currentId = '';
    const fromTop = window.scrollY + 120;
    sections.forEach(function (section) {
      if (section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
        currentId = section.id;
      }
    });
    navLinks.forEach(function (link) {
      const target = link.getAttribute('href').slice(1);
      if (target === currentId) link.classList.add('active'); else link.classList.remove('active');
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  // Background Music: attempt autoplay (some browsers block without user interaction)
  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic) {
    const tryPlay = () => bgMusic.play().catch(() => {});
    // Try immediately
    tryPlay();
    // Try again on first user interaction if blocked
    const once = () => { tryPlay(); window.removeEventListener('pointerdown', once); };
    window.addEventListener('pointerdown', once, { once: true });
  }
})();



