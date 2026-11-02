/** Keep navigation and appearance controls mutually exclusive on small screens. */
export function initHeader({ document, viewport }) {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const settingsToggle = document.querySelector('.settings-toggle');
  const settingsPanel = document.querySelector('.settings-panel');
  const labels = document.documentElement.lang === 'es'
    ? { open: 'Abrir men\u00fa', close: 'Cerrar men\u00fa' }
    : { open: 'Open menu', close: 'Close menu' };

  function setNavigation(open) {
    nav?.classList.toggle('is-open', open);
    navToggle?.setAttribute('aria-expanded', String(open));
    navToggle?.setAttribute('aria-label', open ? labels.close : labels.open);
  }

  function setSettings(open) {
    settingsPanel?.classList.toggle('is-open', open);
    settingsToggle?.setAttribute('aria-expanded', String(open));
  }

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      setNavigation(!nav.classList.contains('is-open'));
      setSettings(false);
    });
  }
  if (settingsToggle && settingsPanel) {
    settingsToggle.addEventListener('click', () => {
      const open = !settingsPanel.classList.contains('is-open');
      setSettings(open);
      if (open) setNavigation(false);
    });
    document.addEventListener('click', event => {
      if (!settingsPanel.contains(event.target) && !settingsToggle.contains(event.target)) setSettings(false);
    });
  }
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (nav?.classList.contains('is-open')) {
      setNavigation(false);
      navToggle?.focus();
    }
    if (settingsPanel?.classList.contains('is-open')) {
      setSettings(false);
      settingsToggle?.focus();
    }
  });
  viewport.addEventListener('change', () => {
    setNavigation(false);
    setSettings(false);
  });
}
