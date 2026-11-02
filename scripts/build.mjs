import fs from 'node:fs';
import path from 'node:path';
import { validateJson } from './validate-content.mjs';
import { root, generatedDir } from './lib/paths.mjs';
import { loadContent } from './lib/content.mjs';
import { createRoutes } from './render/routes.mjs';
import { createLayout } from './render/layout.mjs';
import { createHomeRenderers } from './render/home.mjs';
import { createServicesRenderers } from './render/services.mjs';
import { createCompanyRenderers } from './render/company.mjs';
import { createLegalRenderers } from './render/legal.mjs';

validateJson();
const content = loadContent();
const { site, pages, servicesData } = content;
const routes = createRoutes(content);
const { routeFor } = routes;
const layout = createLayout({ ...content, themeInit: fs.readFileSync(path.join(root, 'src/theme-init.js'), 'utf8') }, routes);
const { renderPage } = layout;
const { renderHome } = createHomeRenderers(content, routes, layout);
const { renderServicesIndex, renderServicePage } = createServicesRenderers(content, routes, layout);
const { renderAbout, renderProcess, renderFaq, renderContact } = createCompanyRenderers(content, routes, layout);
const { renderPrivacy, renderLegal, render404 } = createLegalRenderers(content, routes, layout);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function writeFile(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, 'utf8');
}

function generateSitemap() {
  const entries = [...Object.entries(pages), ...servicesData.categories.map(c => [c.id, c])];
  const urls = entries.flatMap(([id]) => ['en', 'es'].map(locale => `<url><loc>${site.domain}${routeFor(id, locale)}</loc>${['en', 'es'].map(lang => `<xhtml:link rel="alternate" hreflang="${lang}" href="${site.domain}${routeFor(id, lang)}" />`).join('')}</url>`));
  writeFile(path.join(generatedDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`);
}

function main() {
  ensureDir(generatedDir);
  const renderers = {
    home: locale => renderPage({
      locale, pageId: 'home',
      canonicalUrl: site.domain + routeFor('home', locale),
      contentHtml: renderHome(locale)
    }),
    services: renderServicesIndex,
    about: renderAbout,
    process: renderProcess,
    faq: renderFaq,
    contact: renderContact,
    privacy: renderPrivacy,
    legal: renderLegal
  };
  for (const [id, page] of Object.entries(pages)) {
    for (const locale of site.locales) writeFile(path.join(generatedDir, page.routes[locale], 'index.html'), renderers[id](locale));
  }
  for (const category of servicesData.categories) {
    for (const locale of site.locales) writeFile(path.join(generatedDir, category.routes[locale], 'index.html'), renderServicePage(locale, category));
  }
  writeFile(path.join(generatedDir, 'index.html'), renderers.home(site.defaultLocale));
  writeFile(path.join(generatedDir, '404.html'), render404('en'));
  generateSitemap();
}
main();
