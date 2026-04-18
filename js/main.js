(function () {
  'use strict';

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  /* ── Nav mobile toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navMenu   = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navMenu.classList.remove('open'));
    });
  }

  /* ── Parallax ── */
  const parallaxSky = document.getElementById('parallaxSky');
  const parallaxMid = document.getElementById('parallaxMid');
  const heroContent = document.getElementById('heroContent');

  function onScroll() {
    const y = window.scrollY;
    if (parallaxSky) parallaxSky.style.transform = `translateY(${y * 0.8}px)`;
    if (parallaxMid) parallaxMid.style.transform = `translateY(${y * 0.35}px)`;
    if (heroContent) heroContent.style.transform = `translateY(${y * 0.55}px)`;
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Section 2 slider ── */
  const s2Slides = document.querySelectorAll('.s2-slide');
  const s2Dots   = document.querySelectorAll('#s2Dots .dot');
  let s2Current  = 0;

  function goS2(index) {
    s2Slides[s2Current].classList.remove('active');
    s2Dots[s2Current] && s2Dots[s2Current].classList.remove('active');
    s2Current = (index + s2Slides.length) % s2Slides.length;
    s2Slides[s2Current].classList.add('active');
    s2Dots[s2Current] && s2Dots[s2Current].classList.add('active');
  }

  const s2Prev = document.getElementById('s2Prev');
  const s2Next = document.getElementById('s2Next');
  if (s2Prev) s2Prev.addEventListener('click', () => goS2(s2Current - 1));
  if (s2Next) s2Next.addEventListener('click', () => goS2(s2Current + 1));

  s2Dots.forEach(dot => {
    dot.addEventListener('click', () => goS2(parseInt(dot.dataset.index)));
  });

  /* ── Section 3 slider ── */
  const s3Slides   = document.querySelectorAll('.s3-slide');
  const s3Contents = document.querySelectorAll('.s3-content');
  const s3Dots     = document.querySelectorAll('#s3Dots .s3-dot');
  let s3Current    = 0;

  function goS3(index) {
    s3Slides[s3Current].classList.remove('s3-active');
    s3Contents[s3Current] && s3Contents[s3Current].classList.remove('s3-content-active');
    s3Dots[s3Current]     && s3Dots[s3Current].classList.remove('s3-dot-active');

    s3Current = (index + s3Slides.length) % s3Slides.length;

    s3Slides[s3Current].classList.add('s3-active');
    s3Contents[s3Current] && s3Contents[s3Current].classList.add('s3-content-active');
    s3Dots[s3Current]     && s3Dots[s3Current].classList.add('s3-dot-active');
  }

  const s3Prev = document.getElementById('s3Prev');
  const s3Next = document.getElementById('s3Next');
  if (s3Prev) s3Prev.addEventListener('click', () => goS3(s3Current - 1));
  if (s3Next) s3Next.addEventListener('click', () => goS3(s3Current + 1));

  s3Dots.forEach(dot => {
    dot.addEventListener('click', () => goS3(parseInt(dot.dataset.index)));
  });

  /* Fix s3 slide stacking: make all slides absolute except active */
  function syncS3Layout() {
    s3Slides.forEach((slide, i) => {
      if (i === s3Current) {
        slide.style.position = 'relative';
        slide.style.opacity  = '1';
      } else {
        slide.style.position = 'absolute';
        slide.style.opacity  = '0';
      }
    });
  }

  const origGoS3 = goS3;
  function goS3Full(index) {
    origGoS3(index);
    syncS3Layout();
  }

  if (s3Prev) s3Prev.removeEventListener('click', () => goS3(s3Current - 1));
  if (s3Next) s3Next.removeEventListener('click', () => goS3(s3Current + 1));
  if (s3Prev) s3Prev.addEventListener('click', () => goS3Full(s3Current - 1));
  if (s3Next) s3Next.addEventListener('click', () => goS3Full(s3Current + 1));

  s3Dots.forEach(dot => {
    dot.addEventListener('click', () => goS3Full(parseInt(dot.dataset.index)));
  });

  syncS3Layout();

  /* ── Email form ── */
  const emailForm    = document.getElementById('emailForm');
  const formSuccess  = document.getElementById('formSuccess');
  const formError    = document.getElementById('formError');

  if (emailForm) {
    emailForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = emailForm.querySelector('input[type="email"]').value.trim();
      if (!email) return;

      formSuccess.style.display = 'none';
      formError.style.display   = 'none';

      /* Simulate async submission */
      setTimeout(() => {
        try {
          formSuccess.style.display = 'block';
          emailForm.reset();
        } catch (_) {
          formError.style.display = 'block';
        }
      }, 600);
    });
  }

  /* ── Resize warning ── */
  const resizeWarning = document.getElementById('resizeWarning');

  function checkResize() {
    if (!resizeWarning) return;
    resizeWarning.style.display = window.innerWidth < 768 ? 'flex' : 'none';
  }

  window.addEventListener('resize', checkResize, { passive: true });
  checkResize();

})();
