/* ================================================================
   Apart Hotel Kunturi — main.js
   Interactividad: menú, scroll reveal, formulario, fechas
================================================================ */

/* ─── Mobile menu ─────────────────────────────────────────── */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

/* ─── Navbar sombra al hacer scroll ───────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

/* ─── Scroll reveal con IntersectionObserver ──────────────── */
document.addEventListener('DOMContentLoaded', () => {
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
});

/* ─── Active nav link al hacer scroll ─────────────────────── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = (a.getAttribute('href') === '#' + current)
      ? 'var(--cream)'
      : '';
  });
});

/* ─── Fechas mínimas en formulario de reserva ─────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const today    = new Date().toISOString().split('T')[0];
  const checkin  = document.getElementById('checkin');
  const checkout = document.getElementById('checkout');
  if (checkin)  checkin.min  = today;
  if (checkout) checkout.min = today;
  if (checkin) {
    checkin.addEventListener('change', function () {
      if (checkout) checkout.min = this.value;
    });
  }
});

/* ─── Formulario de reserva ───────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();
  showToast('✓ ¡Solicitud enviada! Te contactamos pronto.');
  e.target.reset();
}

/* ─── Toast notification ──────────────────────────────────── */
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3800);
}
