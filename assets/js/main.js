// JS mínimo para navegação e formulário
(function(){
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => [...r.querySelectorAll(s)];

  // Toggle do menu mobile
  const btn = $('.nav-toggle');
  const nav = $('#menu');
  if (btn && nav){
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  // Smooth scroll com respeito a prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced){
    $$('#menu a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const el = document.getElementById(id);
        if (el){
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          nav.classList.remove('is-open');
          btn?.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Ano dinâmico no rodapé
  const elAno = document.getElementById('ano');
  if (elAno) elAno.textContent = new Date().getFullYear();

  // Validação simples do formulário
  const form = document.getElementById('form-contato');
  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = $('#nome').value.trim();
      const email = $('#email').value.trim();
      const msg = $('#mensagem').value.trim();
      let ok = true;

      const setErr = (id, txt='') => { const el = document.getElementById(id); if (el) el.textContent = txt; };

      if (!nome){ setErr('err-nome', 'Informe seu nome.'); ok = false; } else setErr('err-nome');
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){ setErr('err-email', 'E-mail inválido.'); ok = false; } else setErr('err-email');
      if (!msg){ setErr('err-mensagem', 'Escreva uma mensagem.'); ok = false; } else setErr('err-mensagem');

      const status = document.querySelector('.form__status');

      if (ok){
        status.textContent = 'Mensagem enviada! (demonstração local) — configure seu endpoint depois.';
        form.reset();
      }else{
        status.textContent = 'Revise os campos destacados.';
      }
    });
  }
})();