import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { initTheme } from '../src/theme.js';
const bootstrap = fs.readFileSync('src/theme-init.js', 'utf8');
function fixture({ stored = null, systemDark = false, blocked = false, lang = 'en' } = {}) {
  const root = { dataset: {}, lang };
  let saved = stored;
  const storage = {
    getItem() { if (blocked) throw new Error('blocked'); return saved; },
    setItem(key, value) { if (blocked) throw new Error('blocked'); saved = value; }
  };
  const handlers = {};
  const button = { hidden: true, attrs: {}, setAttribute(key, value) { this.attrs[key] = value; }, addEventListener(key, cb) { handlers[key] = cb; } };
  const meta = { setAttribute(key, value) { this[key] = value; } };
  const media = { matches: systemDark, addEventListener(key, cb) { handlers.system = cb; } };
  const document = { documentElement: root, querySelector(selector) { return selector === '.theme-toggle' ? button : meta; } };
  vm.runInNewContext(bootstrap, { document, localStorage: storage, matchMedia: () => media });
  initTheme({ document, media, storage: () => storage, events: { addEventListener(key, cb) { handlers[key] = cb; } } });
  return { root, button, meta, handlers, saved: () => saved };
}
test('theme applies system preference before paint and follows changes until a manual selection', () => {
  const f = fixture({ systemDark: true });
  assert.equal(f.root.dataset.theme, 'dark');
  assert.equal(f.button.hidden, false);
  assert.equal(f.button.attrs['aria-pressed'], 'true');
  f.handlers.system({ matches: false });
  assert.equal(f.root.dataset.theme, 'light');
  f.handlers.click();
  assert.equal(f.saved(), 'dark');
  f.handlers.system({ matches: false });
  assert.equal(f.root.dataset.theme, 'dark');
});
test('saved light choice overrides a dark device and persists across page loads', () => {
  const f = fixture({ stored: 'light', systemDark: true });
  assert.equal(f.root.dataset.theme, 'light');
  f.handlers.click();
  assert.equal(f.saved(), 'dark');
  const next = fixture({ stored: f.saved() });
  assert.equal(next.root.dataset.theme, 'dark');
  assert.equal(next.meta.content, '#101d18');
});
test('blocked storage does not prevent toggling, and Spanish control text is localized', () => {
  const f = fixture({ blocked: true, lang: 'es' });
  f.handlers.click();
  assert.equal(f.root.dataset.theme, 'dark');
  assert.equal(f.button.title, 'Cambiar al tema claro');
  f.handlers.click();
  assert.equal(f.root.dataset.theme, 'light');
  assert.equal(f.button.attrs['aria-pressed'], 'false');
});
test('invalid stored values fall back to device preference and changes sync across tabs', () => {
  const f = fixture({ stored: 'unexpected', systemDark: true });
  assert.equal(f.root.dataset.theme, 'dark');
  f.handlers.storage({ key: 'sintelium-theme', newValue: 'light' });
  assert.equal(f.root.dataset.theme, 'light');
  f.handlers.storage({ key: 'unrelated', newValue: 'dark' });
  assert.equal(f.root.dataset.theme, 'light');
  f.handlers.storage({ key: null, newValue: null });
  assert.equal(f.root.dataset.themePreference, 'system');
  assert.equal(f.root.dataset.theme, 'dark');
});
