export function initTheme({ document, storage, media, events }) {
  const root = document.documentElement;
  const button = document.querySelector('.theme-toggle');
  if (!button) return;
  let explicit = root.dataset.themePreference !== 'system';
  function apply(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    button.setAttribute('aria-pressed', String(dark));
    button.title = root.lang === 'es'
      ? (dark ? 'Cambiar al tema claro' : 'Cambiar al tema oscuro')
      : (dark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#101d18' : '#fbfcf8');
  }
  apply(root.dataset.theme === 'dark' ? 'dark' : 'light');
  button.hidden = false;
  button.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    explicit = true;
    root.dataset.themePreference = theme;
    apply(theme);
    try { storage()?.setItem('sintelium-theme', theme); } catch { /* The toggle still works without persistence. */ }
  });
  const systemChanged = event => { if (!explicit) apply(event.matches ? 'dark' : 'light'); };
  if (media.addEventListener) media.addEventListener('change', systemChanged);
  else media.addListener?.(systemChanged);
  events.addEventListener('storage', event => {
    if (event.key !== 'sintelium-theme' && event.key !== null) return;
    explicit = event.key !== null && (event.newValue === 'dark' || event.newValue === 'light');
    root.dataset.themePreference = explicit ? event.newValue : 'system';
    apply(explicit ? event.newValue : media.matches ? 'dark' : 'light');
  });
}
