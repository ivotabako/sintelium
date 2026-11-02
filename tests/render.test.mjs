import test from 'node:test';
import assert from 'node:assert/strict';
import { createRoutes } from '../scripts/render/routes.mjs';
import { escapeHtml, localeText } from '../scripts/render/html.mjs';
import { loadContent } from '../scripts/lib/content.mjs';

const content = loadContent();
test('every page and service route respects both root and project hosting', () => {
  for (const basePath of ['', '/sintelium']) {
    const { routeFor } = createRoutes({ ...content, site: { ...content.site, basePath } });
    for (const [id, page] of [...Object.entries(content.pages), ...content.servicesData.categories.map(category => [category.id, category])]) {
      for (const locale of content.site.locales) assert.equal(routeFor(id, locale), basePath + page.routes[locale]);
    }
  }
});
test('HTML escaping handles text and attribute delimiters without treating zero as empty', () => {
  assert.equal(escapeHtml('<a title="x">&' + "'" + '\n'), '&lt;a title=&quot;x&quot;&gt;&amp;&#39;\n');
  assert.equal(escapeHtml(0), '0');
  assert.equal(localeText({ en: 'Fallback' }, 'es'), 'Fallback');
});


test('service titles from content are rendered as text in the heading and metadata', async () => {
  const { createLayout } = await import('../scripts/render/layout.mjs');
  const { createServicesRenderers } = await import('../scripts/render/services.mjs');
  const changed = structuredClone(content);
  changed.servicesData.categories[0].title.en = '<script>alert("x")</script>';
  const routes = createRoutes(changed);
  const layout = createLayout({ ...changed, themeInit: '' }, routes);
  const { renderServicePage } = createServicesRenderers(changed, routes, layout);
  const html = renderServicePage('en', changed.servicesData.categories[0]);
  assert.ok(html.includes('<h1>&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt;</h1>'));
  assert.ok(!html.includes('<script>alert("x")</script>'));
});
