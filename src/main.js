import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/refinements.css';
document.documentElement.classList.add('js');
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', document.documentElement.lang === 'es' ? (isOpen ? 'Cerrar menú' : 'Abrir menú') : (isOpen ? 'Close menu' : 'Open menu'));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', document.documentElement.lang === 'es' ? 'Abrir menú' : 'Open menu');
      navToggle.focus();
    }
  });
}
const yearNode = document.querySelector('[data-current-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
