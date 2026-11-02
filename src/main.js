import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/components.css';
import './styles/refinements.css';
import './styles/themes.css';
import { initTheme } from './theme.js';
import { initHeader } from './ui/header.js';

initTheme({ document, storage: () => window.localStorage, media: window.matchMedia('(prefers-color-scheme: dark)'), events: window });
initHeader({ document, viewport: window.matchMedia('(max-width: 760px)') });
document.documentElement.classList.add('js');

const yearNode = document.querySelector('[data-current-year]');
if (yearNode) yearNode.textContent = String(new Date().getFullYear());
