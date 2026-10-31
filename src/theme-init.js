// Inlined in the document head so the selected palette applies before first paint.
(() => {
  let preference = null;
  try { preference = localStorage.getItem('sintelium-theme'); } catch { /* Storage can be blocked in embedded/private browsers. */ }
  const explicit = preference === 'light' || preference === 'dark';
  const dark = typeof matchMedia === 'function' && matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.themePreference = explicit ? preference : 'system';
  document.documentElement.dataset.theme = explicit ? preference : dark ? 'dark' : 'light';
})();
