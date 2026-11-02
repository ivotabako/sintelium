import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContent } from '../scripts/lib/content.mjs';
import { validateRouting } from '../scripts/lib/validate-routing.mjs';

const fixture = () => structuredClone(loadContent());
test('the current route catalogue and both hosting configurations validate', () => {
  for (const basePath of ['', '/sintelium']) {
    const content = fixture();
    content.site.basePath = basePath;
    assert.doesNotThrow(() => validateRouting(content));
  }
});
test('unsafe paths, duplicate routes, and incorrect locale prefixes are rejected', () => {
  for (const route of ['/en/../../outside/', '/en/?x=1/', '/es/wrong/']) {
    const content = fixture();
    content.pages.home.routes.en = route;
    assert.throws(() => validateRouting(content), /path|prefix/);
  }
  const content = fixture();
  content.pages.about.routes.en = content.pages.home.routes.en;
  assert.throws(() => validateRouting(content), /Duplicate route/);
});
test('unsupported locales and broken navigation/category references are rejected', () => {
  const content = fixture();
  content.site.locales.push('fr');
  assert.throws(() => validateRouting(content), /exactly en and es/);
  content.site.locales.pop();
  content.navigation.primary[0].routeId = 'missing';
  assert.throws(() => validateRouting(content), /Unknown navigation/);
  content.navigation.primary[0].routeId = 'home';
  content.servicesData.categories[0].relatedCategoryIds = ['missing'];
  assert.throws(() => validateRouting(content), /Unknown related/);
});
test('contact links and domain reject executable schemes and attribute delimiters', () => {
  for (const bookingUrl of ['javascript:alert(1)', 'https://example.com/"onclick="bad']) {
    const content = fixture();
    content.site.contact.bookingUrl = bookingUrl;
    assert.throws(() => validateRouting(content), /HTTP/);
  }
  const content = fixture();
  content.site.domain = 'https://example.com/path';
  assert.throws(() => validateRouting(content), /origin/);
  content.site.domain = 'https://example.com';
  content.site.contact.email = 'name"@example.com';
  assert.throws(() => validateRouting(content), /email/);
});
