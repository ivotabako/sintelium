const LOCALES = ['en', 'es'];

function validPath(value, label, trailingSlash = true) {
  if (typeof value !== 'string' || !/^\/(?:[a-z0-9-]+\/)*$/.test(trailingSlash ? value : value + '/')) {
    throw new Error(label + ' must be a clean absolute path' + (trailingSlash ? ' ending in /' : ' without a trailing slash'));
  }
}

/** Validate values used in generated file paths and link attributes before rendering. */
export function validateRouting({ site, pages, servicesData, navigation }) {
  if (!Array.isArray(site.locales) || site.locales.length !== LOCALES.length || !LOCALES.every(locale => site.locales.includes(locale))) {
    throw new Error('site.locales must contain exactly en and es');
  }
  const domain = new URL(site.domain);
  if (!['https:', 'http:'].includes(domain.protocol) || domain.origin !== site.domain) throw new Error('site.domain must be an HTTP(S) origin');
  if (site.basePath) validPath(site.basePath, 'site.basePath', false);
  const { email, bookingUrl } = site.contact;
  if (email != null && (typeof email !== 'string' || !/^[^\s<>"'@]+@[^\s<>"'@]+\.[^\s<>"'@]+$/.test(email))) throw new Error('site.contact.email must be a valid email address');
  if (bookingUrl != null) {
    const url = new URL(bookingUrl);
    if (!['https:', 'http:'].includes(url.protocol) || /[<>"'\s]/.test(bookingUrl)) throw new Error('site.contact.bookingUrl must be an HTTP(S) URL');
  }
  const ids = new Set();
  const paths = new Set();
  const entries = [...Object.entries(pages), ...servicesData.categories.map(category => [category.id, category])];
  for (const [id, page] of entries) {
    if (ids.has(id)) throw new Error('Duplicate page/category id: ' + id);
    ids.add(id);
    for (const locale of LOCALES) {
      const route = page.routes?.[locale];
      validPath(route, id + '.routes.' + locale);
      if (!route.startsWith('/' + locale + '/')) throw new Error('Route must use its locale prefix: ' + route);
      if (paths.has(route)) throw new Error('Duplicate route: ' + route);
      paths.add(route);
    }
  }
  for (const item of navigation.primary) {
    if (!ids.has(item.routeId)) throw new Error('Unknown navigation route: ' + item.routeId);
  }
  for (const category of servicesData.categories) {
    for (const id of category.relatedCategoryIds ?? []) {
      if (!servicesData.categories.some(item => item.id === id)) throw new Error('Unknown related category: ' + id);
    }
  }
}
