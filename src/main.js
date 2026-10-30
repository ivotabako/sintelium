import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      nav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

const yearNode = document.querySelector('[data-current-year]');
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}
