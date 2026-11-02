import { escapeHtml, localeText, localeHtml } from './html.mjs';

export function createLayout({ site, navigation, servicesData, seo, themeInit }, { routeFor, toProjectUrl }) {
function getContactCta(locale) {
  const booking = site.contact.bookingUrl;
  const email = site.contact.email;
  if (booking) {
    return `<a class="button button-primary" href="${escapeHtml(booking)}" target="_blank" rel="noopener noreferrer">${localeHtml(navigation.cta.label, locale)}</a>`;
  }
  if (email) {
    return `<a class="button button-primary" href="mailto:${escapeHtml(email)}">${localeHtml(navigation.cta.label, locale)}</a>`;
  }
  return '';
}

function buildNav(locale, pageId = 'home') {
  const navLinks = navigation.primary
    .map((item) => {
      const href = routeFor(item.routeId, locale);
      return `<a class="nav-link" href="${href}">${localeHtml(item.label, locale)}</a>`;
    })
    .join('');

  const languageSwitch = `
    <div class="language-switch" aria-label="Language switcher">
      <a href="${routeFor(pageId, 'en')}" aria-label="English" class="${locale === 'en' ? 'is-active' : ''}">EN</a>
      <a href="${routeFor(pageId, 'es')}" aria-label="Español" class="${locale === 'es' ? 'is-active' : ''}">ES</a>
    </div>
  `;

  const cta = getContactCta(locale);
  const mobileToggle = `<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="${locale === 'en' ? 'Open menu' : 'Abrir menú'}">${locale === 'en' ? 'Menu' : 'Menú'}</button>`;

  return `
    <header class="site-header">
      <div class="container nav-shell">
        <a class="brand" href="${routeFor('home', locale)}" aria-label="Sintelium home">
          <span class="brand-symbol"><img class="brand-mark brand-mark-light" src="${toProjectUrl('/images/logo-mark.svg')}" width="36" height="36" alt="" /><img class="brand-mark brand-mark-dark" src="${toProjectUrl('/images/logo-mark-reversed.svg')}" width="36" height="36" alt="" /></span>
          <span>Sintelium</span>
        </a>
        <nav id="site-nav" class="site-nav" aria-label="${locale === 'en' ? 'Main navigation' : 'Navegación principal'}">
          ${navLinks}
        </nav>
        <div class="nav-actions">
          <button class="settings-toggle" type="button" aria-expanded="false" aria-controls="header-settings" aria-label="${locale === 'en' ? 'Settings' : 'Ajustes'}"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linejoin="round" d="M9.168 5.163 A7.4 7.4 0 0 1 10.335 4.790 L10.350 2.644 L13.650 2.644 L13.665 4.790 A7.4 7.4 0 0 1 14.832 5.163 A7.4 7.4 0 0 1 15.921 5.724 L17.449 4.218 L19.782 6.551 L18.276 8.079 A7.4 7.4 0 0 1 18.837 9.168 A7.4 7.4 0 0 1 19.210 10.335 L21.356 10.350 L21.356 13.650 L19.210 13.665 A7.4 7.4 0 0 1 18.837 14.832 A7.4 7.4 0 0 1 18.276 15.921 L19.782 17.449 L17.449 19.782 L15.921 18.276 A7.4 7.4 0 0 1 14.832 18.837 A7.4 7.4 0 0 1 13.665 19.210 L13.650 21.356 L10.350 21.356 L10.335 19.210 A7.4 7.4 0 0 1 9.168 18.837 A7.4 7.4 0 0 1 8.079 18.276 L6.551 19.782 L4.218 17.449 L5.724 15.921 A7.4 7.4 0 0 1 5.163 14.832 A7.4 7.4 0 0 1 4.790 13.665 L2.644 13.650 L2.644 10.350 L4.790 10.335 A7.4 7.4 0 0 1 5.163 9.168 A7.4 7.4 0 0 1 5.724 8.079 L4.218 6.551 L6.551 4.218 L8.079 5.724 A7.4 7.4 0 0 1 9.168 5.163 Z"/><circle cx="12" cy="12" r="3"/></svg></button>
          <div id="header-settings" class="settings-panel" role="group" aria-label="${locale === 'en' ? 'Appearance and language' : 'Apariencia e idioma'}">
          <button class="theme-toggle" type="button" aria-label="${locale === 'en' ? 'Dark theme' : 'Tema oscuro'}" aria-pressed="false" hidden>
            <svg class="theme-moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z"/></svg>
            <svg class="theme-sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>
            <span class="settings-label">${locale === 'en' ? 'Dark theme' : 'Tema oscuro'}</span>
          </button>
          <span class="settings-label language-label">${locale === 'en' ? 'Language' : 'Idioma'}</span>
          ${languageSwitch}
          </div>
          ${cta ? `<div class="nav-cta">${cta}</div>` : ''}
          ${mobileToggle}
        </div>
      </div>
    </header>
  `;
}

function buildFooter(locale, pageId = 'home') {
  const serviceSections = servicesData.categories.map((category) => `
    <li><a href="${toProjectUrl(category.routes[locale])}">${localeHtml(category.title, locale)}</a></li>
  `).join('');

  const year = new Date().getFullYear();
  const privacyHref = routeFor('privacy', locale);
  const legalHref = routeFor('legal', locale);
  const contactHref = routeFor('contact', locale);

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand brand-footer" href="${routeFor('home', locale)}"><span class="brand-symbol"><img class="brand-mark brand-mark-light" src="${toProjectUrl('/images/logo-mark.svg')}" width="36" height="36" alt="" /><img class="brand-mark brand-mark-dark" src="${toProjectUrl('/images/logo-mark-reversed.svg')}" width="36" height="36" alt="" /></span><span>Sintelium</span></a>
          <p>${locale === 'en' ? 'AI transformation and software engineering consultancy for clear, practical business outcomes.' : 'Consultoría de transformación con IA e ingeniería de software para resultados prácticos y claros.'}</p>
          ${site.contact.email ? `<a class="footer-link" href="mailto:${escapeHtml(site.contact.email)}">${escapeHtml(site.contact.email)}</a>` : ''}
        </div>
        <div>
          <h3>${locale === 'en' ? 'Services' : 'Servicios'}</h3>
          <ul class="footer-list">${serviceSections}</ul>
        </div>
        <div>
          <h3>${locale === 'en' ? 'Company' : 'Empresa'}</h3>
          <ul class="footer-list">
            <li><a href="${routeFor('about', locale)}">${locale === 'en' ? 'About' : 'Nosotros'}</a></li>
            <li><a href="${routeFor('process', locale)}">${locale === 'en' ? 'Process' : 'Proceso'}</a></li>
            <li><a href="${routeFor('faq', locale)}">${locale === 'en' ? 'FAQ' : 'Preguntas frecuentes'}</a></li>
            <li><a href="${contactHref}">${locale === 'en' ? 'Contact' : 'Contacto'}</a></li>
          </ul>
        </div>
        <div>
          <h3>${locale === 'en' ? 'Legal' : 'Legal'}</h3>
          <ul class="footer-list">
            <li><a href="${privacyHref}">${locale === 'en' ? 'Privacy' : 'Privacidad'}</a></li>
            <li><a href="${legalHref}">${locale === 'en' ? 'Legal notice' : 'Aviso legal'}</a></li>
            <li><a href="${routeFor(pageId, 'en')}">EN</a></li>
            <li><a href="${routeFor(pageId, 'es')}">ES</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-meta">
        <p>© ${year} Sintelium</p>
      </div>
    </footer>
  `;
}

function renderCommonHead({ locale, title, description, canonicalUrl, pageId = 'home' }) {
  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="color-scheme" content="light dark" />
    <meta name="theme-color" content="#fbfcf8" />
    <script>${themeInit}</script>
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${site.domain}${toProjectUrl('/images/og-default.svg')}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${site.domain}${toProjectUrl('/images/og-default.svg')}" />
    <meta property="og:site_name" content="Sintelium" />
    <link rel="icon" href="${toProjectUrl('/favicon.svg')}" type="image/svg+xml" />
    <link rel="alternate" hreflang="en" href="${site.domain}${routeFor(pageId, 'en')}" />
    <link rel="alternate" hreflang="es" href="${site.domain}${routeFor(pageId, 'es')}" />
    <link rel="alternate" hreflang="x-default" href="${site.domain}${toProjectUrl('/')}" />
    ${locale === 'en' ? `<meta http-equiv="content-language" content="en">` : `<meta http-equiv="content-language" content="es">`}
    <script type="module" src="/src/main.js"></script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Sintelium",
        "url": "${site.domain}${toProjectUrl('/')}",
        "areaServed": "Worldwide",
        "description": ${JSON.stringify(description).replace(/</g, '\\u003c')}
      }
    </script>
  `;
}

function renderPage({ locale, canonicalUrl, title, description, pageId, contentHtml }) {
  const seoPage = seo.pages[pageId] || {};
  const pageTitle = title || localeText(seoPage.title, locale) || 'Sintelium';
  const pageDescription = description || localeText(seoPage.description, locale) || '';
  return `<!DOCTYPE html>
<html lang="${locale}">
  <head>
    ${renderCommonHead({ locale, title: pageTitle, description: pageDescription, canonicalUrl, pageId })}
  </head>
  <body>
    <a class="skip-link" href="#main-content">${locale === 'en' ? 'Skip to content' : 'Saltar al contenido'}</a>
    ${buildNav(locale, pageId)}
    <main id="main-content" class="page-shell">
      ${contentHtml}
    </main>
    ${buildFooter(locale, pageId)}
  </body>
</html>`;
}

function renderGenericPage({ locale, pageId, title, lead, bodySections }) {
  const contentHtml = `
    <section class="page-header">
      <div class="container narrow">
        <p class="eyebrow subtle">${locale === 'en' ? 'Sintelium' : 'Sintelium'}</p>
        <h1>${escapeHtml(title)}</h1>
        ${lead ? `<p class="lead">${escapeHtml(lead)}</p>` : ''}
      </div>
    </section>
    <section class="section">
      <div class="container narrow prose-layout">
        ${bodySections}
      </div>
    </section>
  `;

  const route = routeFor(pageId, locale);
  const seoEntry = seo.pages[pageId] || {};
  return renderPage({ locale, canonicalUrl: `${site.domain}${route}`, title: localeText(seoEntry.title, locale) || title, description: localeText(seoEntry.description, locale) || lead || title, pageId, contentHtml });
}


  return { getContactCta, renderPage, renderGenericPage };
}
