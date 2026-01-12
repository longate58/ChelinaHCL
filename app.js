// UTILS
const $ = q => document.querySelector(q);
const $$ = q => [...document.querySelectorAll(q)];

// LAZY-LOAD IMÁGENES (data-img)
$$('[data-img]').forEach(el => {
  const src = `assets/img/${el.dataset.img}`;
  if (el.tagName === 'ARTICLE' || el.tagName === 'FIGURE') {
    el.style.backgroundImage = `url(${src})`;
    el.style.backgroundSize = 'cover';
    el.style.backgroundPosition = 'center';
  } else {
    el.src = src;
  }
});

// VIDEO: pausa cuando no está visible
const video = $('.hero__video');
if (video && 'IntersectionObserver' in window) {
  const obs = new IntersectionObserver(([{isIntersecting}]) => {
    isIntersecting ? video.play() : video.pause();
  }, {threshold: .5});
  obs.observe(video);
}

// CTA FLOAT & SAVE LOOK
$('.js-save-look').addEventListener('click', () => {
  if (navigator.share) {
    navigator.share({title: 'Chelina HCL – Look 2026', url: location.href});
  } else {
    navigator.clipboard.writeText(location.href);
    alert('🔗 Link copiado. Compártelo en Pinterest.');
  }
});

// MODAL PRÓXIMAMENTE
const modal = $('#modal');
$$('.js-open-modal').forEach(btn => {
  btn.addEventListener('click', () => modal.showModal());
});
$('.modal__close').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => {
  if (e.target === modal) modal.close();
});

// POLL A/B (simple counter)
let count = 0;
$$('.poll__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    count++;
    $('.poll__count').textContent = count;
    // Enviar a GA4
    gtag('event', 'poll_vote', {value: btn.dataset.vote});
  });
});

// GLITCH CONTROLADO (random en títulos)
$$('.hero__title, .value h2, .loc h2').forEach(el => {
  if (Math.random() > .6) {
    el.classList.add('glitch');
    el.setAttribute('data-text', el.textContent);
  }
});