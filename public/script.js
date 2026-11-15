(() => {
  'use strict';
  document.documentElement.classList.add('js');
  // Inline vector fallback ensures all interface icons work even when the CDN is unavailable.
  function renderIcons() {
    if (window.lucide?.createIcons) { window.lucide.createIcons(); return; }
    const d = {
      'arrow-up-right':'<path d="M7 17 17 7M7 7h10v10"/>',
      'arrow-right':'<path d="M5 12h14m-7-7 7 7-7 7"/>',
      'arrow-down':'<path d="M12 4v16m-7-7 7 7 7-7"/>',
      'map-pin':'<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
      'phone':'<path d="M22 16.5v3a2 2 0 0 1-2.2 2A19.5 19.5 0 0 1 2.5 4.2 2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7l.5 2.9a2 2 0 0 1-.6 1.8L7.5 10a15 15 0 0 0 6.5 6.5l1.6-1.9a2 2 0 0 1 1.8-.6l2.9.5a2 2 0 0 1 1.7 2Z"/>',
      'house':'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"/><path d="M9 21v-8h6v8"/>',
      'menu':'<path d="M4 7h16M4 12h16M4 17h16"/>',
      'shield-check':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
      'sparkles':'<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9ZM5 18l.7 1.3L7 20l-1.3.7L5 22l-.7-1.3L3 20l1.3-.7ZM19 2l.7 1.3L21 4l-1.3.7L19 6l-.7-1.3L17 4l1.3-.7Z"/>',
      'building-2':'<path d="M3 21V5a2 2 0 0 1 2-2h8v18M13 10h6a2 2 0 0 1 2 2v9H3"/><path d="M7 7h2M7 11h2M7 15h2M16 14h2M16 18h2"/>',
      'package':'<path d="m12 2 9 5-9 5-9-5 9-5ZM3 7v10l9 5 9-5V7M12 12v10"/>',
      'panels-top-left':'<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
      'store':'<path d="m3 9 1-6h16l1 6v3a3 3 0 0 1-5 2 3 3 0 0 1-4 0 3 3 0 0 1-4 0 3 3 0 0 1-5-2V9ZM5 15v6h14v-6M9 21v-5h6v5"/>',
      'house-plus':'<path d="m3 10 9-7 9 7v10H3V10ZM9 20v-6h6v6M17 4h5m-2.5-2.5v5"/>',
      'handshake':'<path d="m2 12 3-5 5 1 4 4M22 12l-3-5-5 1-4 4 2 2 4-3M4 14l7 7a2 2 0 0 0 3-1l1 1a2 2 0 0 0 3-2l2-2M2 14l3 2M22 14l-3 2"/>',
      'clipboard-check':'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 14l2 2 4-4"/>',
      'heart-handshake':'<path d="M20 8c1 3-2 6-8 12C6 14 3 11 4 8c1-4 6-5 8-1 2-4 7-3 8 1ZM8 12l3 3 4-3"/>',
      'badge-check':'<path d="m12 2 3 2 3.5.5.5 3.5 2 4-2 3-.5 3.5-3.5.5-3 2-3-2-3.5-.5L5 15l-2-3 2-4 .5-3.5L9 4Z"/><path d="m9 12 2 2 4-4"/>',
      'leaf':'<path d="M21 3c-11 0-17 5-17 12a6 6 0 0 0 6 6c7 0 12-6 11-18ZM4 21c4-8 9-10 15-13"/>',
      'message-square-text':'<path d="M21 11.5V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5l4 3v-3h5a2 2 0 0 0 2-2Z"/><path d="M7 8h10M7 12h8"/>',
      'file-text':'<path d="M13 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10l-8-8ZM13 2v8h8M7 14h10M7 18h10"/>',
      'calendar-check':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 10h18m-13 6 2 2 5-5"/>',
      'navigation':'<path d="m3 11 18-9-9 19-2-8-7-2Z"/>',
      'phone-call':'<path d="M22 16.5v3a2 2 0 0 1-2.2 2A19.5 19.5 0 0 1 2.5 4.2 2 2 0 0 1 4.5 2h3a2 2 0 0 1 2 1.7l.5 2.9a2 2 0 0 1-.6 1.8L7.5 10a15 15 0 0 0 6.5 6.5l1.6-1.9a2 2 0 0 1 1.8-.6l2.9.5a2 2 0 0 1 1.7 2ZM15 2a7 7 0 0 1 7 7M15 6a3 3 0 0 1 3 3"/>',
      'plus':'<path d="M12 5v14M5 12h14"/>',
      'clipboard-list':'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M10 10h6M10 14h6M10 18h6M7 10h.01M7 14h.01M7 18h.01"/>',
      'mail':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 7 10-7"/>',
      'heart':'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>'
    };
    document.querySelectorAll('[data-lucide]').forEach(el => {
      const paths = d[el.getAttribute('data-lucide')] || d.sparkles;
      const svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
      svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');
      svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.8');
      svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');
      svg.setAttribute('aria-hidden','true');svg.innerHTML=paths;
      el.replaceWith(svg);
    });
  }
  renderIcons();
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const menuToggle = $('#menu-toggle');
  const menu = $('#main-navigation');
  function closeMenu() {
    menu?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Ouvrir le menu');
    document.body.classList.remove('menu-open');
  }
  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(Boolean(open)));
    menuToggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    document.body.classList.toggle('menu-open', Boolean(open));
  });
  $$('#main-navigation a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
  const serviceSelect = $('#service-select');
  const picked = new Set();
  function chooseService(name) {
    if (!serviceSelect) return;
    serviceSelect.value = [...serviceSelect.options].some(o => o.value === name) ? name : 'Plusieurs services / Autre';
    serviceSelect.dispatchEvent(new Event('change', {bubbles:true}));
  }
  $$('.quick-option').forEach(button => button.addEventListener('click', () => {
    const name = button.dataset.service;
    if (picked.has(name)) picked.delete(name); else picked.add(name);
    button.classList.toggle('selected', picked.has(name));
    button.setAttribute('aria-pressed', String(picked.has(name)));
    if (picked.size === 1) chooseService([...picked][0]);
    if (name === 'Nettoyage de bureaux' || name === 'Nettoyage commercial') { const r = document.querySelector('input[name=type][value=Commercial]'); if (r) r.checked = true; }
    if (picked.size > 1) chooseService('Plusieurs services / Autre');
    if (picked.size === 0 && serviceSelect) serviceSelect.value = '';
  }));
  $('#quick-submit')?.addEventListener('click', () => {
    const values = [...picked];
    if (values.length === 1) chooseService(values[0]);
    if (values.length > 1) {
      chooseService('Plusieurs services / Autre');
      const textarea = $('#quote-form textarea');
      if (textarea && !textarea.value.trim()) textarea.value = `Services souhaités : ${values.join(', ')}. `;
    }
    $('#soumission')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant':'smooth', block:'start' });
    setTimeout(() => $('#quote-form input[name=name]')?.focus({preventScroll:true}), 650);
  });
  $$('.service-link[data-pick]').forEach(link => link.addEventListener('click', () => { chooseService(link.dataset.pick); if (['Nettoyage de bureaux','Nettoyage commercial'].includes(link.dataset.pick)) document.querySelector('input[name=type][value=Commercial]').checked = true; }));
  const quoteForm = $('#quote-form');
  quoteForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!quoteForm.reportValidity()) return;
    const data = new FormData(quoteForm);
    if (!data.get('consent')) return;
    const subject = 'Demande de soumission — site Angélique Cleaning Services';
    const rows = [
      `Bonjour Angélique Cleaning Services,`, '', 'Je souhaite recevoir une soumission pour un service de nettoyage.', '',
      `Nom : ${data.get('name')}`, `Téléphone : ${data.get('phone')}`, `Courriel : ${data.get('email')}`,
      `Secteur : ${data.get('city')}`, `Type d’espace : ${data.get('type')}`, `Service : ${data.get('service')}`,
      '', 'Détails :', String(data.get('message') || 'Aucun détail supplémentaire.'), '',
      'J’accepte d’être contacté(e) au sujet de cette demande.'
    ];
    const mailto = `mailto:info@angeliquecleaning.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rows.join('\n'))}`;
    const notice = $('#form-notice');
    if (notice) { notice.textContent = 'Votre courriel est prêt à être envoyé. Vérifiez votre application de messagerie pour finaliser la demande.'; notice.classList.add('notice-open'); }
    window.location.href = mailto;
  });
  $('#year').textContent = String(new Date().getFullYear());
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    }), {threshold:0.09,rootMargin:'0px 0px -30px 0px'});
    $$('.reveal').forEach(el => observer.observe(el));
  } else $$('.reveal').forEach(el => el.classList.add('visible'));
  const header = $('.site-header');
  const sticky = () => header?.classList.toggle('scrolled', window.scrollY > 12);
  window.addEventListener('scroll', sticky, {passive:true}); sticky();
})();
