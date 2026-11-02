import test from 'node:test';
import assert from 'node:assert/strict';
import { initHeader } from '../src/ui/header.js';

function element() {
  const classes = new Set();
  return {
    attrs: {}, handlers: {}, focused: false,
    classList: { contains: value => classes.has(value), toggle(value, open) { if (open) classes.add(value); else classes.delete(value); } },
    setAttribute(key, value) { this.attrs[key] = value; },
    addEventListener(key, handler) { this.handlers[key] = handler; },
    contains(target) { return target === this; },
    focus() { this.focused = true; }
  };
}
function fixture(lang = 'en', absent = false) {
  const nodes = Object.fromEntries(['.nav-toggle', '.site-nav', '.settings-toggle', '.settings-panel'].map(key => [key, element()]));
  const handlers = {};
  const document = {
    documentElement: { lang }, querySelector: key => absent ? null : nodes[key],
    addEventListener(key, handler) { handlers[key] = handler; }
  };
  const viewport = { addEventListener(key, handler) { this.change = handler; } };
  initHeader({ document, viewport });
  return { nodes, handlers, viewport };
}

test('navigation and settings are mutually exclusive and keep Spanish ARIA state aligned', () => {
  const { nodes } = fixture('es');
  const nav = nodes['.nav-toggle'];
  const settings = nodes['.settings-toggle'];
  nav.handlers.click();
  assert.equal(nav.attrs['aria-expanded'], 'true');
  assert.equal(nav.attrs['aria-label'], 'Cerrar men\u00fa');
  settings.handlers.click();
  assert.equal(nav.attrs['aria-expanded'], 'false');
  assert.equal(nav.attrs['aria-label'], 'Abrir men\u00fa');
  assert.equal(settings.attrs['aria-expanded'], 'true');
  nav.handlers.click();
  assert.equal(settings.attrs['aria-expanded'], 'false');
});

test('Escape dismisses the active panel and returns focus to its trigger', () => {
  const { nodes, handlers } = fixture();
  for (const selector of ['.nav-toggle', '.settings-toggle']) {
    const trigger = nodes[selector];
    trigger.handlers.click();
    handlers.keydown({ key: 'Enter' });
    assert.equal(trigger.attrs['aria-expanded'], 'true');
    handlers.keydown({ key: 'Escape' });
    assert.equal(trigger.attrs['aria-expanded'], 'false');
    assert.equal(trigger.focused, true);
  }
});

test('outside clicks dismiss settings; clicks within controls preserve it', () => {
  const { nodes, handlers } = fixture();
  const trigger = nodes['.settings-toggle'];
  trigger.handlers.click();
  handlers.click({ target: nodes['.settings-panel'] });
  assert.equal(trigger.attrs['aria-expanded'], 'true');
  handlers.click({ target: trigger });
  assert.equal(trigger.attrs['aria-expanded'], 'true');
  handlers.click({ target: {} });
  assert.equal(trigger.attrs['aria-expanded'], 'false');
});

test('breakpoint changes reset open panels and optional controls may be absent', () => {
  const { nodes, viewport } = fixture();
  for (const selector of ['.nav-toggle', '.settings-toggle']) {
    nodes[selector].handlers.click();
    viewport.change();
    assert.equal(nodes[selector].attrs['aria-expanded'], 'false');
  }
  assert.doesNotThrow(() => fixture('en', true).viewport.change());
});
