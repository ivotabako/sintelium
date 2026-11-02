import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';
// Exercise the generator on Windows and POSIX without relying on shell env syntax.
const result = spawnSync(process.execPath, ['scripts/build.mjs'], { env: { ...process.env, ALLOW_UNCONFIGURED_CONTACT: 'true' }, encoding: 'utf8' });
assert.equal(result.status, 0, result.stderr);
const read = file => fs.readFileSync(`src/generated/${file}`, 'utf8');
test('root and localized homes have complete static document shells', () => {
  for (const file of ['index.html', 'en/index.html', 'es/index.html']) {
    const html = read(file);
    assert.match(html, /<!DOCTYPE html>/);
    assert.match(html, /<header/);
    assert.match(html, /<footer/);
    assert.equal((html.match(/<h1>/g) || []).length, 1);
    assert.equal((html.match(/src="\/src\/main.js"/g) || []).length, 1);
  }
});
test('service language switch and SEO map explicit translated counterparts', () => {
  const html = read('en/services/ai-transformation/index.html');
  assert.match(html, /href="\/sintelium\/es\/servicios\/transformacion-ia\/" aria-label="Español"/);
  assert.match(html, /hreflang="es" href="https:\/\/ivotabako.github.io\/sintelium\/es\/servicios\/transformacion-ia\/"/);
  assert.match(html, /rel="canonical" href="https:\/\/ivotabako.github.io\/sintelium\/en\/services\/ai-transformation\/"/);
});
test('Spanish homepage has localized navigation, diagram and unavailable-contact text', () => {
  const html = read('es/index.html');
  assert.match(html, /Saltar al contenido/);
  assert.match(html, /Abrir menú/);
  assert.match(html, /03 \/ Resultados/);
  assert.doesNotMatch(html, /Contact details|Open menu|Skip to content/);
});

test('language labels resist browser translation and identify the current locale', () => {
  for (const [file, locale, enRoute, esRoute] of [
    ['en/index.html', 'en', '/sintelium/en/', '/sintelium/es/'],
    ['es/index.html', 'es', '/sintelium/en/', '/sintelium/es/'],
    ['en/services/ai-transformation/index.html', 'en', '/sintelium/en/services/ai-transformation/', '/sintelium/es/servicios/transformacion-ia/'],
    ['es/servicios/transformacion-ia/index.html', 'es', '/sintelium/en/services/ai-transformation/', '/sintelium/es/servicios/transformacion-ia/']
  ]) {
    const html = read(file);
    assert.match(html, /class="language-switch notranslate" translate="no" role="group"/);
    const links = [...html.matchAll(/<a\b([^>]+)>(EN|ES)<\/a>/g)];
    assert.equal(links.length, 4, 'header and footer each contain both language links');
    for (const [, attributes, label] of links) {
      const target = label.toLowerCase();
      assert.ok(attributes.includes('href="' + (target === 'en' ? enRoute : esRoute) + '"'));
      assert.ok(attributes.includes('lang="' + target + '"'));
      assert.ok(attributes.includes('hreflang="' + target + '"'));
      assert.ok(attributes.includes('translate="no"'));
      assert.equal(attributes.includes('aria-current="page"'), target === locale);
    }
  }
});
