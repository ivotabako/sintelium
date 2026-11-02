export function createRoutes({ site, pages, servicesData }) {
  const categoryMap = new Map(servicesData.categories.map(category => [category.id, category]));
function toProjectUrl(pathname = '/') {
  const base = (site.basePath || '').replace(/\/$/, '');
  return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function routeFor(pageId, locale) {
  const route = pages[pageId]?.routes?.[locale];
  if (route) return toProjectUrl(route);
  const category = categoryMap.get(pageId);
  if (category && category.routes) return toProjectUrl(category.routes[locale]);
  return toProjectUrl(pages.home.routes[locale]);
}


  return { toProjectUrl, routeFor };
}
