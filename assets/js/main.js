/* ================================================================
   Apart Hotel Kunturi — main.js
   Interactividad: menú, scroll reveal, formulario, fechas
================================================================ */

/* ─── Mobile menu ─────────────────────────────── */
  function toggleMenu() {
    const m = document.getElementById('mobileMenu');
    m.classList.toggle('open');
  }
 
  /* ─── Navbar scroll style ─────────────────────── */
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
      nav.style.boxShadow = 'none';
    }
  });
 
  /* ─── Scroll reveal ───────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));
 
  /* ─── Form submit ─────────────────────────────── */
  function handleSubmit(e) {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3800);
    e.target.reset();
  }
 
  /* ─── Set min date for date inputs ───────────── */
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('checkin').min = today;
  document.getElementById('checkout').min = today;
  document.getElementById('checkin').addEventListener('change', function() {
    document.getElementById('checkout').min = this.value;
  });
 
  /* ─── Active nav link on scroll ──────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cream)' : '';
    });
  });


 
function carouselMove(dir){ goToSlide(currentSlide+dir); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });


