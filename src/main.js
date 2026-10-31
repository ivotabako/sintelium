import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/refinements.css';
import './styles/themes.css';
import { initTheme } from './theme.js';
initTheme({ document, storage: () => window.localStorage, media: window.matchMedia('(prefers-color-scheme: dark)'), events: window });
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

const settingsToggle = document.querySelector('.settings-toggle');
const settingsPanel = document.querySelector('.settings-panel');
function closeSettings() {
  settingsPanel?.classList.remove('is-open');
  settingsToggle?.setAttribute('aria-expanded', 'false');
}
if (settingsToggle && settingsPanel) {
  settingsToggle.addEventListener('click', () => {
    const open = settingsPanel.classList.toggle('is-open');
    settingsToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      nav?.classList.remove('is-open');
      navToggle?.setAttribute('aria-expanded', 'false');
      navToggle?.setAttribute('aria-label', document.documentElement.lang === 'es' ? 'Abrir menú' : 'Open menu');
    }
  });
  navToggle?.addEventListener('click', closeSettings);
  document.addEventListener('click', event => {
    if (!settingsPanel.contains(event.target) && !settingsToggle.contains(event.target)) closeSettings();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && settingsPanel.classList.contains('is-open')) {
      closeSettings();
      settingsToggle.focus();
    }
  });
  window.matchMedia('(max-width: 760px)').addEventListener('change', closeSettings);
}
