/* ================================================================
   Apart Hotel Katari — main.js
   Interactividad: menú, scroll reveal, formulario, modal, carrusel
================================================================ */

/* ─── Mobile menu ───────────────────────────────────────────── */
function toggleMenu() {
  const m = document.getElementById('mobileMenu');
  m.classList.toggle('open');
}

/* ─── Navbar sombra al hacer scroll ────────────────────────── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.style.boxShadow = window.scrollY > 40
    ? '0 4px 20px rgba(0,0,0,0.4)'
    : 'none';
});

/* ─── Scroll reveal ─────────────────────────────────────────── */
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

  /* ─── Fechas mínimas en formulario ──────────────────── */
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

/* ─── Active nav link al hacer scroll ──────────────────────── */
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--cream)' : '';
  });
});

/* ─── Formulario de reserva ─────────────────────────────────── */
function handleSubmit(e) {
  e.preventDefault();

  // Recolectar datos del formulario
  const nombre   = document.getElementById('nombre').value;
  const email    = document.getElementById('email').value;
  const checkin  = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  const personas = document.getElementById('personas').value;
  const tipoSel  = document.getElementById('tipo');
  const tipo     = tipoSel.options[tipoSel.selectedIndex].text;
  const mensaje  = document.getElementById('mensaje').value;

  // Armar el mensaje para WhatsApp
  let texto = `¡Hola! Quiero solicitar una reserva en Katari 🏡%0A%0A`;
  texto += `*Nombre:* ${nombre}%0A`;
  texto += `*Email:* ${email}%0A`;
  texto += `*Check-in:* ${checkin}%0A`;
  texto += `*Check-out:* ${checkout}%0A`;
  texto += `*Personas:* ${personas}%0A`;
  texto += `*Apartamento:* ${tipo}%0A`;
  if (mensaje.trim() !== '') {
    texto += `*Mensaje:* ${mensaje}%0A`;
  }

  // Número de WhatsApp de Katari
  const numeroWhatsapp = '56993869645';
  const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${texto}`;

  // Mostrar confirmación y redirigir
  const toast = document.getElementById('toast');
  toast.textContent = '✓ Redirigiendo a WhatsApp...';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    window.open(urlWhatsapp, '_blank');
    e.target.reset();
  }, 900);
}
/* ================================================================
   MODAL + CARRUSEL DE APARTAMENTOS
   ──────────────────────────────────────────────────────────────
   Para agregar fotos reales a cada modelo, editá el array "slides"
   de cada apartamento abajo. Reemplazá:
     img: null
   por la ruta de tu imagen, ejemplo:
     img: 'assets/img/k1/k1-living.jpg'

   Las imágenes deben estar en:
     assets/img/k1/   → fotos del modelo K1
     assets/img/k2/   → fotos del modelo K2
     assets/img/k3/   → fotos del modelo K3
     assets/img/k5/   → fotos del modelo K5
     assets/img/k6/   → fotos del modelo K6
     assets/img/gen/  → fotos generales (galería, nosotros, hero)
================================================================ */

const APTS = {

  k1: {
    tag:   'Departamento &middot; Modelo K1',
    title: 'Departamento Katari',
    model: 'Modelo K1 &mdash; El cl&aacute;sico',
    desc:  'Acogedor y funcional, el K1 es el favorito de familias y grupos de amigos. Cuenta con living y comedor separados, lo que permite que todos tengan su propio espacio para relajarse y compartir. La cocina est&aacute; completamente equipada para que cocinés como en casa.',
    why:   'Eleg&iacute; el K1 si viaj&aacute;s en familia o con amigos y valor&aacute;s tener un living donde reunirse. La separaci&oacute;n entre el descanso y la zona social hace que la convivencia sea mucho m&aacute;s c&oacute;moda.',
    price: { baja: 40.000, alta: 45.000, moneda: 'CLP' },
    feats: ['2 dormitorios', '1 cama Queen', '2 camas dobles', 'Cocina completa', 'Living / Comedor', '1 ba&ntilde;o', 'Hasta 4 personas'],
    slides: [
      { img: 'assets/img/k1/k1living.jpg',    caption: 'Living / Sala de estar' },
      { img: 'assets/img/k1/k1living2.jpg',   caption: 'Living / Sala de estar' },
      { img: 'assets/img/k1/k1h1.jpg',        caption: 'Dormitorio principal &mdash; cama Queen' },
      { img: 'assets/img/k1/k1h2.jpg',        caption: 'Segundo dormitorio' },
      { img: 'assets/img/k1/k1cocina.jpg',    caption: 'Cocina completamente equipada' },
      { img: 'assets/img/k1/k1baño.jpg',      caption: 'Ba&ntilde;o privado' },
   
    ]
  },

  k2: {
    tag:   'Estudio &middot; Modelo K2',
    title: 'Estudio Katari',
    model: 'Modelo K2 &mdash; La opci&oacute;n pr&aacute;ctica',
    desc:  'El K2 es el modelo m&aacute;s econ&oacute;mico de Katari. Tiene la misma capacidad que el K1 &mdash; dos dormitorios para hasta 4 personas &mdash; pero con distribuci&oacute;n m&aacute;s compacta: cocina y comedor integrados, sin living separado.',
    why:   'Eleg&iacute; el K2 si tu prioridad es el precio y no necesit&aacute;s espacio de living. Ideal para grupos que pasan poco tiempo en el departamento y quieren algo funcional y bien ubicado.',
    price: { baja: 38.000, alta: 43.000, moneda: 'CLP' },
    feats: ['2 dormitorios', '1 cama Queen', '2 camas dobles', 'Cocina / Comedor integrado', '1 ba&ntilde;o', 'Hasta 4 personas', 'Opci&oacute;n m&aacute;s econ&oacute;mica'],
    slides: [
      { img: 'assets/img/k2/k2h2.jpg',        caption: 'Dormitorio principal' },
     { img: 'assets/img/k2/h1k2.jpg',        caption: 'Segundo dormitorio' },
      { img: 'assets/img/k2/k2cocina.jpg',    caption: 'Cocina y comedor integrados' },
      { img: 'assets/img/k2/k2cocina2.jpg',   caption: 'Cocina equipada' },
      { img: 'assets/img/k2/k2baño.jpg',      caption: 'Ba&ntilde;o' },
    ]
  },

  k3: {
    tag:   'Departamento Accesible &middot; Modelo K3',
    title: 'Departamento Accesible',
    model: 'Modelo K3 &mdash; Comodidad sin barreras',
    desc:  'El K3 es nuestro apartamento m&aacute;s equipado. Dise&ntilde;ado para personas con movilidad reducida, ofrece dos ba&ntilde;os completos, lavander&iacute;a de uso exclusivo y amplios espacios de circulaci&oacute;n. Tambi&eacute;n ideal para familias que quieren m&aacute;xima independencia.',
    why:   'Eleg&iacute; el K3 si necesit&aacute;s accesibilidad, dos ba&ntilde;os para no compartir, o si viaj&aacute;s con alguien con necesidades especiales de movilidad. La lavander&iacute;a exclusiva marca la diferencia en estad&iacute;as largas.',
    price: { baja: 43.000, alta: 48.000, moneda: 'CLP' },
    feats: ['2 dormitorios', '1 cama Queen', '2 camas dobles', 'Cocina completa', 'Living / Comedor', '2 ba&ntilde;os completos', 'Lavander&iacute;a exclusiva', 'Accesible &middot; Hasta 4 personas'],
    slides: [
      { img: 'assets/img/k3/k3comedor2.jpg',  caption: 'Comedor / Zona social' },
      { img: 'assets/img/k3/k3comedor.jpg',   caption: 'Comedor / Zona social' },
      { img: 'assets/img/k3/k3h1.jpg',        caption: 'Dormitorio principal accesible' },
       { img: 'assets/img/k3/k3h2.jpg',       caption: 'Dormitorio secundario' },
      { img: 'assets/img/k3/k3baño1.jpg',     caption: 'Ba&ntilde;o accesible' },
      { img: 'assets/img/k3/k3baño2.jpg',     caption: 'Ba&ntilde;o 2' },
      { img: 'assets/img/k3/k3lavadora.jpg',  caption: 'Lavander&iacute;a de uso exclusivo' },
    ]
  },

  k5: {
    tag:   'Familiar &middot; Modelo K5',
    title: 'Familiar Amplio',
    model: 'Modelo K5 &mdash; Para grupos grandes',
    desc:  'El K5 es el departamento m&aacute;s amplio de Katari. Pensado para grupos de hasta 5 personas, tiene tres camas dobles m&aacute;s una Queen. El living y comedor son espaciosos para que todos est&eacute;n c&oacute;modos.',
    why:   'Eleg&iacute; el K5 si son 5 personas o si quer&eacute;s el mayor espacio posible. La cama doble adicional hace la diferencia cuando el grupo es grande y todos necesitan su propio espacio para dormir.',
    price: { baja: 45.000, alta: 50.000, moneda: 'CLP' },
    feats: ['2 dormitorios', '1 cama Queen', '3 camas dobles', 'Cocina completa', 'Living / Comedor amplio', '1 ba&ntilde;o', 'Hasta 5 personas', 'El m&aacute;s espacioso'],
    slides: [
      { img: 'assets/img/k5/k5comedor.jpg',   caption: 'Comedor &mdash; espacio para todos' },
      { img: 'assets/img/k5/k5h1.jpg',        caption: 'Dormitorio principal' },
      { img: 'assets/img/k5/k5h2.jpg',        caption: 'Dormitorio con 3 camas dobles' },
      { img: null, icon: '🛋️',               caption: 'Living amplio' },
      { img: null, icon: '🍳',               caption: 'Cocina equipada' },
    ]
  },

  k6: {
    tag:   'Departamento &middot; Modelo K6',
    title: 'Departamento Separado',
    model: 'Modelo K6 &mdash; Privacidad al m&aacute;ximo',
    desc:  'El K6 est&aacute; dise&ntilde;ado para grupos que prefieren la privacidad individual. Con cuatro camas dobles en dos dormitorios, cada persona tiene su propio espacio sin compartir cama. Perfecto para viajes de amigos o compa&ntilde;eros de trabajo.',
    why:   'Eleg&iacute; el K6 si son 4 personas y cada uno quiere su propia cama. No hay cama Queen compartida &mdash; todos duermen solos. Ideal para grupos de amigos o colegas que valoran la privacidad.',
    price: { baja: 40.000, alta: 45.000, moneda: 'CLP' },
    feats: ['2 dormitorios', '4 camas dobles individuales', 'Cocina completa', 'Living / Comedor', '1 ba&ntilde;o', 'Hasta 4 personas', 'M&aacute;xima privacidad individual'],
    slides: [
      { img: 'assets/img/k6/k6comedor.jpg',   caption: 'Comedor / Zona com&uacute;n' },
      { img: null, icon: '🛏️',               caption: 'Dormitorio con camas individuales' },
      { img: 'assets/img/k6/k6h1.jpg',        caption: 'Segundo dormitorio independiente' },
      { img: 'assets/img/k6/k6cocina.jpg',    caption: 'Cocina equipada' },
      { img: 'assets/img/k6/k6baño.jpg',      caption: 'Ba&ntilde;o privado' },

       
    ]
  }

};

/* ─── Variables del carrusel ──────────────────────────────── */
let currentSlide = 0;
let totalSlides  = 0;

/* ─── Abrir modal ────────────────────────────────────────── */
function openModal(id) {
  const apt = APTS[id];
  if (!apt) return;

  document.getElementById('mTag').innerHTML   = apt.tag;
  document.getElementById('mTitle').innerHTML = apt.title;
  document.getElementById('mModel').innerHTML = apt.model;
  document.getElementById('mDesc').innerHTML  = apt.desc;
  document.getElementById('mWhy').innerHTML   = apt.why;



  document.getElementById('mPrice').innerHTML = apt.price;
  document.getElementById('mFeats').innerHTML =
    apt.feats.map(f => `<span class="modal-feat">${f}</span>`).join('');

  const track = document.getElementById('carouselTrack');
  const dots  = document.getElementById('carouselDots');
  track.innerHTML = '';
  dots.innerHTML  = '';
  totalSlides  = apt.slides.length;
  currentSlide = 0;

  apt.slides.forEach((s, i) => {
    /* -- slide -- */
    const slide = document.createElement('div');
    slide.className = 'carousel-slide' + (i === 0 ? ' active' : '');

    if (s.img) {
      const img = document.createElement('img');
      img.src     = s.img;
      img.alt     = s.caption || '';
      img.loading = 'lazy';
      slide.appendChild(img);
    } else {
      slide.innerHTML = `
        <div class="slide-placeholder">
          <span class="slide-icon">${s.icon || '🏠'}</span>
          <span>Foto próximamente</span>
        </div>`;
    }

    if (s.caption) {
      const cap = document.createElement('div');
      cap.className = 'slide-caption';
      cap.innerHTML = s.caption;
      slide.appendChild(cap);
    }

    track.appendChild(slide);

    /* -- dot -- */
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dots.appendChild(dot);
  });

  document.getElementById('aptModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ─── Cerrar modal ───────────────────────────────────────── */
function closeModal() {
  document.getElementById('aptModal').classList.remove('open');
  document.body.style.overflow = '';
}
function closeModalOutside(e) {
  if (e.target === document.getElementById('aptModal')) closeModal();
}

/* ─── Navegar carrusel ───────────────────────────────────── */
function goToSlide(n) {
  const slides = document.querySelectorAll('.carousel-slide');
  const dots   = document.querySelectorAll('.carousel-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (n + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
function carouselMove(dir) { goToSlide(currentSlide + dir); }

/* ─── Cerrar con Escape ──────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});





 

