const page = document.body.dataset.page;
const navItems = [['Início','index.html','home'],['Serviços','servicos.html','servicos'],['Nosso espaço','sobre.html','sobre']];
const header = document.querySelector('#site-header');
if (header) header.innerHTML = `<div class="announcement"><span>Seu momento de beleza começa aqui</span><b>✳</b><span>10% OFF na primeira visita</span></div><header class="site-header"><div class="nav-wrap"><a href="index.html" class="brand" aria-label="Amanda Beauty, início"><span class="brand-mark">✳</span><span class="brand-name">Amanda Beauty<small>beauty studio</small></span></a><nav class="nav-links" id="main-nav" aria-label="Navegação principal">${navItems.map(([name,url,key])=>`<a href="${url}" class="${page===key?'active':''}">${name}</a>`).join('')}<a href="agenda.html" class="${page==='agenda'?'active':''}">Agendamento</a></nav><div class="nav-actions"><a href="#login" class="nav-login" data-open-login>Entrar <span>↗</span></a><a href="agenda.html" class="nav-book">Agendar <span>↗</span></a></div><button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="main-nav">☰</button></div></header>`;
const footer = document.querySelector('#site-footer');
if (footer) footer.innerHTML = `<footer class="site-footer"><div class="footer-main"><div class="footer-brand"><a href="index.html" class="brand"><span class="brand-mark">✳</span><span class="brand-name">Amanda Beauty<small>beauty studio</small></span></a><p>Beleza com intenção, cuidado em cada detalhe e um lugar para você respirar.</p></div><div class="footer-col"><h4>Explore</h4><a href="servicos.html">Nossos serviços</a><a href="sobre.html">O Ateliê</a><a href="agenda.html">Agendar horário</a></div><div class="footer-col"><h4>Fale com a gente</h4><p>(11) 3456-7890</p><p>oi@amandabeauty.com.br</p><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a></div><div class="footer-col"><h4>Estamos por aqui</h4><p>Rua das Flores, 128</p><p>São Paulo · SP</p><p>Seg — Sáb · 09h às 19h</p></div></div><div class="footer-bottom"><span>© 2026 Amanda Beauty · Feito com carinho</span><span>Instagram&nbsp;&nbsp; · &nbsp;&nbsp;Privacidade</span></div></footer>`;

const loginModal = document.createElement('div');
loginModal.className = 'login-modal';
loginModal.id = 'login-modal';
loginModal.setAttribute('aria-hidden', 'true');
loginModal.innerHTML = `<button class="modal-backdrop" data-close-login aria-label="Fechar login"></button><section class="login-dialog" role="dialog" aria-modal="true" aria-labelledby="login-title"><button class="modal-close" data-close-login aria-label="Fechar">×</button><div class="modal-cover"><img src="assets/makeup-artista.jpeg" alt="Cliente recebendo maquiagem profissional"><div class="modal-cover-copy"><span>SEU RITUAL COMEÇA AQUI</span><b>Beleza que<br>combina com você.</b></div><div class="cover-badge">✳ cuidado de dentro pra fora</div></div><div class="modal-content"><span class="eyebrow">OLÁ, QUE BOM TER VOCÊ</span><h2 id="login-title">Que bom<br><em>que voltou.</em></h2><p class="modal-intro">Entre para deixar seus próximos momentos pertinho.</p><form class="auth-form" id="login-form"><label for="login-email">E-mail</label><input id="login-email" type="email" autocomplete="email" placeholder="voce@email.com" required><label for="login-password">Senha</label><div class="password-wrap"><input id="login-password" type="password" autocomplete="current-password" placeholder="Sua senha" required minlength="6"><button type="button" class="password-toggle" aria-label="Mostrar senha">◉</button></div><div class="auth-options"><label class="check-label"><input type="checkbox" name="remember"> <span>Manter conectado</span></label><a href="#" class="forgot-link" data-demo-link>Esqueci minha senha</a></div><button class="button button-dark form-submit" type="submit">Entrar na minha conta <span>↗</span></button><div class="form-feedback" role="status" aria-live="polite"></div></form><p class="auth-switch">É sua primeira vez? <a href="cadastro.html">Criar cadastro</a></p><p class="demo-note">Demonstração visual · sem autenticação conectada</p></div></section>`;
document.body.append(loginModal);

let loginTrigger = null;
const openLogin = () => {
  loginTrigger = document.activeElement;
  loginModal.classList.add('is-open');
  loginModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  setTimeout(() => document.querySelector('#login-email')?.focus(), 40);
};
const closeLogin = () => {
  loginModal.classList.remove('is-open');
  loginModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  loginTrigger?.focus?.();
};
document.querySelectorAll('[data-open-login]').forEach((link) => link.addEventListener('click', (event) => { event.preventDefault(); openLogin(); }));
loginModal.querySelectorAll('[data-close-login]').forEach((button) => button.addEventListener('click', closeLogin));
document.addEventListener('keydown', (event) => {
  if (!loginModal.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeLogin();
  if (event.key === 'Tab') {
    const focusable = [...loginModal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled])')].filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
if (location.hash === '#login') openLogin();

const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  const open = nav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});

const slides = [...document.querySelectorAll('.carousel-slide')];
if (slides.length) {
  const track = document.querySelector('.carousel-track');
  const dots = [...document.querySelectorAll('.dot')];
  const indexLabel = document.querySelector('.carousel-index');
  let current = 0;
  let timer;
  const goTo = (n) => {
    current = (n + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    slides.forEach((slide, i) => slide.classList.toggle('is-active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('is-active', i === current));
    indexLabel.innerHTML = `0${current + 1} <span>/</span> 0${slides.length}`;
  };
  const start = () => { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5200); };
  document.querySelector('.carousel-prev').addEventListener('click', () => { goTo(current - 1); start(); });
  document.querySelector('.carousel-next').addEventListener('click', () => { goTo(current + 1); start(); });
  dots.forEach((dot) => dot.addEventListener('click', () => { goTo(Number(dot.dataset.slide)); start(); }));
  document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(timer));
  document.querySelector('.carousel').addEventListener('mouseleave', start);
  start();
}

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, { threshold: .12 }) : null;
document.querySelectorAll('.reveal').forEach((el) => revealObserver ? revealObserver.observe(el) : el.classList.add('is-visible'));

document.querySelectorAll('.filter-button').forEach((button) => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  document.querySelectorAll('.filter-button').forEach((item) => item.classList.toggle('is-active', item === button));
  document.querySelectorAll('.catalog-card').forEach((card) => card.classList.toggle('is-hidden', filter !== 'todos' && card.dataset.category !== filter));
}));

const bookingDate = document.querySelector('#booking-date');
if (bookingDate) {
  const today = new Date();
  bookingDate.min = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
}
const showFeedback = (form, message) => {
  const feedback = form.querySelector('.form-feedback');
  feedback.textContent = message;
  feedback.classList.add('is-visible');
};
document.querySelector('#booking-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const values = new FormData(event.currentTarget);
  const date = new Date(`${values.get('date')}T12:00:00`).toLocaleDateString('pt-BR');
  showFeedback(event.currentTarget, `Pedido recebido para ${values.get('service')} em ${date}, às ${values.get('time')}. Esta demonstração não envia a reserva; conecte um canal de atendimento para confirmar.`);
});
document.querySelector('#login-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  showFeedback(event.currentTarget, 'Formulário validado. Para autenticar contas de verdade, conecte este site a um serviço de login.');
});
document.querySelector('#register-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!event.currentTarget.reportValidity()) return;
  const data = new FormData(event.currentTarget);
  try { localStorage.setItem('amanda-beauty-demo-profile', JSON.stringify({ name: data.get('name'), email: data.get('email') })); } catch (_) { /* storage may be unavailable in private browsing */ }
  showFeedback(event.currentTarget, `Que bom ter você, ${data.get('name')}! Seu perfil ficou salvo apenas neste navegador para esta demonstração.`);
});
document.querySelectorAll('.password-toggle').forEach((button) => button.addEventListener('click', () => {
  const input = button.parentElement.querySelector('input');
  const visible = input.type === 'password';
  input.type = visible ? 'text' : 'password';
  button.setAttribute('aria-label', visible ? 'Ocultar senha' : 'Mostrar senha');
}));
document.querySelector('[data-demo-link]')?.addEventListener('click', (event) => {
  event.preventDefault();
  const form = document.querySelector('#login-form');
  showFeedback(form, 'Para redefinir uma senha, conecte um serviço de autenticação ao site.');
});

