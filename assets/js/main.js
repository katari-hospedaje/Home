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

/* ─── ░░░░░░░ MODAL JS ░░░░░░░  ──────────────── */

const APTS = {
  k1: {
    tag:'Departamento &middot; Modelo K1', title:'Departamento Katari', model:'Modelo K1 &mdash; El cl&aacute;sico',
    desc:'Acogedor y funcional, el K1 es el favorito de familias y grupos de amigos. Cuenta con living y comedor separados, lo que permite que todos tengan su propio espacio para relajarse y compartir. La cocina est&aacute; completamente equipada para que cocinés como en casa.',
    why:'Eleg&iacute; el K1 si viaj&aacute;s en familia o con amigos y valor&aacute;s tener un living donde reunirse. La separaci&oacute;n entre el descanso y la zona social hace que la convivencia sea mucho m&aacute;s c&oacute;moda.',
    price:'$55 USD <span>/ noche</span>',
    feats:['2 dormitorios','1 cama Queen','2 camas dobles','Cocina completa','Living / Comedor','1 ba&ntilde;o','Hasta 4 personas'],
    slides:[
      {img: src="assets/img/k1/k1h1.jpg",icon:'&#x1F6CF;',caption:'Dormitorio principal &mdash; cama Queen'},
      {img:'assets/img/k1/k1h2.jpg',icon:'&#x1F6CF;',caption:'Dormitorio secundario &mdash; 2 camas simples'},
      {img:'assets/img/k1/k1living2.jpg',icon:'&#x1F6CB;',caption:'Living / Sala de estar'},
      {img:'assets/img/k1/k1cocina.jpg',icon:'&#x1F373;',caption:'Cocina completamente equipada'},
      {img:'assets/img/k1/k1baño.jpg',icon:'&#x1F6BF;',caption:'Ba&ntilde;o privado'}
      
    ]
  },
  k2: {
    tag:'Estudio &middot; Modelo K2', title:'Estudio Katari', model:'Modelo K2 &mdash; La opci&oacute;n pr&aacute;ctica',
    desc:'El K2 es el modelo m&aacute;s econ&oacute;mico de Katari. Tiene la misma capacidad que el K1 &mdash; dos dormitorios para hasta 4 personas &mdash; pero con distribuci&oacute;n m&aacute;s compacta: cocina y comedor integrados, sin living separado.',
    why:'Eleg&iacute; el K2 si tu prioridad es el precio y no necesit&aacute;s espacio de living. Ideal para grupos que pasan poco tiempo en el departamento y quieren algo funcional y bien ubicado.',
    price:'$55 USD <span>/ noche</span>',
    feats:['2 dormitorios','1 cama Queen','2 camas dobles','Cocina / Comedor integrado','1 ba&ntilde;o','Hasta 4 personas','Opci&oacute;n m&aacute;s econ&oacute;mica'],
    slides:[
      {img:null,icon:'&#x1F6CF;',caption:'Dormitorio principal'},
      {img:null,icon:'&#x1F373;',caption:'Cocina y comedor integrados'},
      {img:null,icon:'&#x1F6CF;',caption:'Segundo dormitorio'},
      {img:null,icon:'&#x1F6BF;',caption:'Ba&ntilde;o'}
    ]
  },
  k3: {
    tag:'Departamento Accesible &middot; Modelo K3', title:'Departamento Accesible', model:'Modelo K3 &mdash; Comodidad sin barreras',
    desc:'El K3 es nuestro apartamento m&aacute;s equipado. Dise&ntilde;ado para personas con movilidad reducida, ofrece dos ba&ntilde;os completos, lavander&iacute;a de uso exclusivo y amplios espacios de circulaci&oacute;n. Tambi&eacute;n ideal para familias que quieren m&aacute;xima independencia.',
    why:'Eleg&iacute; el K3 si necesit&aacute;s accesibilidad, dos ba&ntilde;os para no compartir, o si viaj&aacute;s con alguien con necesidades especiales de movilidad. El plus de la lavander&iacute;a exclusiva marca la diferencia en estad&iacute;as largas.',
    price:'$80 USD <span>/ noche</span>',
    feats:['2 dormitorios','1 cama Queen','2 camas dobles','Cocina completa','Living / Comedor','2 ba&ntilde;os completos','Lavander&iacute;a exclusiva','Accesible &middot; Hasta 4 personas'],
    slides:[
      {img:null,icon:'&#x1F3E0;',caption:'Vista general del departamento'},
      {img:null,icon:'&#x1F6CF;',caption:'Dormitorio principal accesible'},
      {img:null,icon:'&#x1F6BF;',caption:'Ba&ntilde;o accesible'},
      {img:null,icon:'&#x1F9FA;',caption:'Lavander&iacute;a de uso exclusivo'},
      {img:null,icon:'&#x1F6CB;',caption:'Living / Comedor'}
    ]
  },
  k5: {
    tag:'Familiar &middot; Modelo K5', title:'Familiar Amplio', model:'Modelo K5 &mdash; Para grupos grandes',
    desc:'El K5 es el departamento m&aacute;s amplio de Katari. Pensado para grupos de hasta 5 personas, tiene tres camas dobles m&aacute;s una Queen. El living y comedor son espaciosos para que todos est&eacute;n c&oacute;modos.',
    why:'Eleg&iacute; el K5 si son 5 personas o si quer&eacute;s el mayor espacio posible. La cama doble adicional hace la diferencia cuando el grupo es grande.',
    price:'$110 USD <span>/ noche</span>',
    feats:['2 dormitorios','1 cama Queen','3 camas dobles','Cocina completa','Living / Comedor amplio','1 ba&ntilde;o','Hasta 5 personas','El m&aacute;s espacioso'],
    slides:[
      {img:null,icon:'&#x1F46A;',caption:'Departamento familiar &mdash; vista general'},
      {img:null,icon:'&#x1F6CF;',caption:'Dormitorio con 3 camas dobles'},
      {img:null,icon:'&#x1F6CB;',caption:'Living amplio'},
      {img:null,icon:'&#x1F373;',caption:'Cocina y comedor'}
    ]
  },
  k6: {
    tag:'Departamento &middot; Modelo K6', title:'Departamento Separado', model:'Modelo K6 &mdash; Privacidad al m&aacute;ximo',
    desc:'El K6 est&aacute; dise&ntilde;ado para grupos que prefieren la privacidad individual. Con cuatro camas dobles en dos dormitorios, cada persona tiene su propio espacio sin compartir cama. Perfecto para viajes de amigos o compa&ntilde;eros de trabajo.',
    why:'Eleg&iacute; el K6 si son 4 personas y cada uno quiere su propia cama. No hay cama Queen compartida &mdash; todos duermen solos. Ideal para grupos de amigos o colegas.',
    price:'$110 USD <span>/ noche</span>',
    feats:['2 dormitorios','4 camas dobles individuales','Cocina completa','Living / Comedor','1 ba&ntilde;o','Hasta 4 personas','M&aacute;xima privacidad individual'],
    slides:[
      {img:null,icon:'&#x1F6CF;',caption:'Dormitorio con camas individuales'},
      {img:null,icon:'&#x1F6CF;',caption:'Segundo dormitorio independiente'},
      {img:null,icon:'&#x1F6CB;',caption:'Living / zona com&uacute;n'},
      {img:null,icon:'&#x1F373;',caption:'Cocina equipada'}
    ]
  }
};
 
let currentSlide=0, totalSlides=0;
 
function openModal(id){
  const apt=APTS[id]; if(!apt) return;
  document.getElementById('mTag').innerHTML=apt.tag;
  document.getElementById('mTitle').innerHTML=apt.title;
  document.getElementById('mModel').innerHTML=apt.model;
  document.getElementById('mDesc').innerHTML=apt.desc;
  document.getElementById('mWhy').innerHTML=apt.why;
  document.getElementById('mPrice').innerHTML=apt.price;
  document.getElementById('mFeats').innerHTML=apt.feats.map(f=>`<span class="modal-feat">${f}</span>`).join('');
  const track=document.getElementById('carouselTrack');
  const dots=document.getElementById('carouselDots');
  track.innerHTML=''; dots.innerHTML='';
  totalSlides=apt.slides.length; currentSlide=0;
  apt.slides.forEach((s,i)=>{
    const slide=document.createElement('div');
    slide.className='carousel-slide'+(i===0?' active':'');
    if(s.img){ slide.innerHTML=`<img src="${s.img}" alt="${s.caption}" loading="lazy">`; }
    else { slide.innerHTML=`<div class="slide-placeholder"><span class="slide-icon">${s.icon}</span><span>Foto pr&oacute;ximamente</span></div>`; }
    if(s.caption){ const cap=document.createElement('div'); cap.className='slide-caption'; cap.innerHTML=s.caption; slide.appendChild(cap); }
    track.appendChild(slide);
    const dot=document.createElement('div');
    dot.className='carousel-dot'+(i===0?' active':'');
    dot.onclick=()=>goToSlide(i);
    dots.appendChild(dot);
  });
  document.getElementById('aptModal').classList.add('open');
  document.body.style.overflow='hidden';
}
 
function closeModal(){
  document.getElementById('aptModal').classList.remove('open');
  document.body.style.overflow='';
}
 
function closeModalOutside(e){ if(e.target===document.getElementById('aptModal')) closeModal(); }
 
function goToSlide(n){
  const slides=document.querySelectorAll('.carousel-slide');
  const dots=document.querySelectorAll('.carousel-dot');
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide=(n+totalSlides)%totalSlides;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}
 
function carouselMove(dir){ goToSlide(currentSlide+dir); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });


