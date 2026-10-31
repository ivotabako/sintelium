import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateJson } from './validate-content.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const generatedDir = path.join(root, 'src', 'generated');

const site = JSON.parse(fs.readFileSync(path.join(contentDir, 'site.json'), 'utf8'));
const navigation = JSON.parse(fs.readFileSync(path.join(contentDir, 'navigation.json'), 'utf8'));
const pages = JSON.parse(fs.readFileSync(path.join(contentDir, 'pages.json'), 'utf8'));
const servicesData = JSON.parse(fs.readFileSync(path.join(contentDir, 'services.json'), 'utf8'));
const faqs = JSON.parse(fs.readFileSync(path.join(contentDir, 'faqs.json'), 'utf8'));
const process = JSON.parse(fs.readFileSync(path.join(contentDir, 'process.json'), 'utf8'));
const useCases = JSON.parse(fs.readFileSync(path.join(contentDir, 'use-cases.json'), 'utf8'));
const seo = JSON.parse(fs.readFileSync(path.join(contentDir, 'seo.json'), 'utf8'));
const legal = JSON.parse(fs.readFileSync(path.join(contentDir, 'legal.json'), 'utf8'));

const themeInit = fs.readFileSync(path.join(root, 'src', 'theme-init.js'), 'utf8');

const categoryMap = new Map(servicesData.categories.map((category) => [category.id, category]));

function toProjectUrl(pathname = '/') {
  const base = (site.basePath || '').replace(/\/$/, '');
  return `${base}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
}

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function localeText(value, locale) {
  return value && value[locale] !== undefined ? value[locale] : value?.en ?? '';
}

function routeFor(pageId, locale) {
  const route = pages[pageId]?.routes?.[locale];
  if (route) return toProjectUrl(route);
  const category = categoryMap.get(pageId);
  if (category && category.routes) return toProjectUrl(category.routes[locale]);
  return toProjectUrl(pages.home.routes[locale]);
}

function getContactCta(locale) {
  const booking = site.contact.bookingUrl;
  const email = site.contact.email;
  if (booking) {
    return `<a class="button button-primary" href="${booking}" target="_blank" rel="noopener noreferrer">${localeText(navigation.cta.label, locale)}</a>`;
  }
  if (email) {
    return `<a class="button button-primary" href="mailto:${email}">${localeText(navigation.cta.label, locale)}</a>`;
  }
  return '';
}

function buildNav(locale, pageId = 'home') {
  const navLinks = navigation.primary
    .map((item) => {
      const href = routeFor(item.routeId, locale);
      return `<a class="nav-link" href="${href}">${localeText(item.label, locale)}</a>`;
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
          <button class="settings-toggle" type="button" aria-expanded="false" aria-controls="header-settings" aria-label="${locale === 'en' ? 'Settings' : 'Ajustes'}"><svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="m9 3-1 3-3 1 1 3-2 2 2 2-1 3 3 1 1 3h6l1-3 3-1-1-3 2-2-2-2 1-3-3-1-1-3Z"/><circle cx="12" cy="12" r="3"/></svg></button>
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
    <li><a href="${toProjectUrl(category.routes[locale])}">${localeText(category.title, locale)}</a></li>
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
          ${site.contact.email ? `<a class="footer-link" href="mailto:${site.contact.email}">${site.contact.email}</a>` : ''}
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

function renderHome(locale) {
  const hero = {
    eyebrow: locale === 'en' ? 'AI TRANSFORMATION · AGENTIC AUTOMATION · SOFTWARE ENGINEERING' : 'TRANSFORMACIÓN CON IA · AUTOMATIZACIÓN AGÉNTICA · INGENIERÍA DE SOFTWARE',
    title: locale === 'en' ? 'Build smarter systems. Move business forward.' : 'Sistemas más inteligentes. Empresas que avanzan.',
    lead: locale === 'en'
      ? 'Sintelium helps businesses turn AI opportunities into reliable software. We design intelligent agents, automate complex workflows, modernize applications, and deliver solutions built for real-world operations.'
      : 'Sintelium ayuda a las empresas a convertir las oportunidades de la inteligencia artificial en soluciones de software fiables. Diseñamos agentes inteligentes, automatizamos procesos complejos, modernizamos aplicaciones y desarrollamos sistemas preparados para el mundo real.'
  };

  const featuredItems = servicesData.categories.slice(0, 6).map((category) => `
    <article class="card card-service">
      <span class="service-icon" aria-hidden="true">↗</span>
      <h3>${localeText(category.title, locale)}</h3>
      <p>${localeText(category.summary, locale)}</p>
      <a href="${toProjectUrl(category.routes[locale])}" class="text-link">${locale === 'en' ? 'Learn more' : 'Saber más'}</a>
    </article>
  `).join('');

  const benefitItems = [
    locale === 'en' ? 'Reduce repetitive work' : 'Reducir trabajo repetitivo',
    locale === 'en' ? 'Connect disconnected systems' : 'Conectar sistemas disociados',
    locale === 'en' ? 'Improve software reliability' : 'Mejorar la fiabilidad del software',
    locale === 'en' ? 'Build with security in mind' : 'Construir con seguridad en mente',
    locale === 'en' ? 'Keep people in control of AI decisions' : 'Mantener a las personas al mando de las decisiones con IA'
  ].map((item) => `<li>${item}</li>`).join('');

  const processSteps = process.steps.map((step, idx) => `
    <div class="step-item">
      <span class="step-number">0${idx + 1}</span>
      <h3>${localeText(step.title, locale)}</h3>
      <p>${localeText(step.description, locale)}</p>
    </div>
  `).join('');

  const illustrativeCases = useCases.items.map((item) => `
    <li>${localeText(item.title, locale)}</li>
  `).join('');

  const faqPreview = faqs.items.slice(0, 4).map((item) => `
    <div class="faq-item-micro">
      <h3>${localeText(item.question, locale)}</h3>
      <p>${localeText(item.answer, locale)}</p>
    </div>
  `).join('');

  const ctaHtml = getContactCta(locale);

  return `
    <section class="hero hero-dark">
      <div class="container hero-grid">
        <div>
          <p class="eyebrow">${hero.eyebrow}</p>
          <h1>${hero.title}</h1>
          <p class="lead">${hero.lead}</p>
          <div class="cta-row">
            ${ctaHtml || `<a class="button button-primary" href="${routeFor('process', locale)}">${locale === 'en' ? 'How we work' : 'Cómo trabajamos'} <span aria-hidden="true">↗</span></a>`}
            <a class="button button-secondary" href="${routeFor('services', locale)}">${locale === 'en' ? 'Explore our services' : 'Explorar servicios'}</a>
          </div>
          <p class="trust-line">${locale === 'en' ? 'Practical engineering. Clear collaboration. Solutions designed to last.' : 'Ingeniería práctica. Colaboración clara. Soluciones pensadas para durar.'}</p>
        </div>
        <div class="hero-visual"><div class="diagram-label"><span class="status-dot"></span>${locale === 'en' ? 'FROM OPPORTUNITY TO OPERATION' : 'DE LA OPORTUNIDAD A LA OPERACIÓN'}</div>
          <svg viewBox="0 0 520 400" role="img" aria-label="${locale === 'en' ? 'Data flows through AI agents and human review into connected systems' : 'Los datos pasan por agentes de IA y revisión humana a sistemas conectados'}">
            <defs><pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="#38534d"/></pattern></defs>
            <rect width="520" height="400" fill="url(#grid)"/>
            <g fill="none" stroke="#76cbb3" stroke-width="2"><path d="M140 98H260V164M260 236V302H380"/><path d="M140 98V302H210" stroke-dasharray="5 7"/></g>
            <g fill="#173c33" stroke="#527f6d"><rect x="32" y="62" width="160" height="72" rx="8"/><rect x="180" y="164" width="180" height="72" rx="8"/><rect x="300" y="266" width="190" height="72" rx="8"/></g>
            <g fill="#e8f8ed" font-size="17" font-family="system-ui" font-weight="600"><text x="52" y="104">${locale === 'en' ? '01 / Your data' : '01 / Tus datos'}</text><text x="200" y="206">${locale === 'en' ? '02 / AI agents' : '02 / Agentes IA'}</text><text x="320" y="308">${locale === 'en' ? '03 / Real outcomes' : '03 / Resultados'}</text></g>
            <circle cx="260" cy="302" r="25" fill="#b9ebc9"/><path d="m250 302 7 7 13-15" fill="none" stroke="#103529" stroke-width="3"/>
            <text x="40" y="370" fill="#b1c9bc" font-size="13" font-family="system-ui">${locale === 'en' ? 'Connected systems. Human oversight.' : 'Sistemas conectados. Supervisión humana.'}</text>
          </svg>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-intro heading-row">
          <div>
            <p class="eyebrow subtle">${locale === 'en' ? 'From AI ambition to working systems' : 'De la ambición de IA a sistemas funcionales'}</p>
            <h2>${locale === 'en' ? 'From AI ambition to working systems' : 'De la ambición de IA a sistemas funcionales'}</h2>
          </div>
        </div>
        <p class="section-copy center">${locale === 'en' ? 'We combine AI strategy with hands-on engineering to take ideas from exploration through integration, validation, and production.' : 'Combinamos estrategia de IA con ingeniería práctica para llevar las ideas desde la exploración hasta la integración, validación y producción.'}</p>
        <div class="card-grid service-grid">${featuredItems}</div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <div class="two-column">
          <div>
            <p class="eyebrow subtle">${locale === 'en' ? 'Technology that works for your business' : 'Tecnología que funciona para tu negocio'}</p>
            <h2>${locale === 'en' ? 'Technology that works for your business' : 'Tecnología que funciona para tu negocio'}</h2>
          </div>
          <ul class="check-list">${benefitItems}</ul>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="eyebrow subtle">${locale === 'en' ? 'A clear path from idea to impact' : 'Un camino claro de la idea al impacto'}</p>
        <h2>${locale === 'en' ? 'A clear path from idea to impact' : 'Un camino claro de la idea al impacto'}</h2>
        <div class="process-grid">${processSteps}</div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <p class="eyebrow subtle">${locale === 'en' ? 'Illustrative use cases' : 'Casos de uso ilustrativos'}</p>
        <h2>${locale === 'en' ? 'Where intelligent engineering can help' : 'Dónde puede ayudar la ingeniería inteligente'}</h2>
        <ul class="usecase-list">${illustrativeCases}</ul>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <p class="eyebrow subtle">${locale === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}</p>
        <h2>${locale === 'en' ? 'Helpful answers to common questions' : 'Respuestas útiles para preguntas comunes'}</h2>
        <div class="faq-stack">${faqPreview}</div>
      </div>
    </section>

    <section class="section cta-panel">
      <div class="container narrow">
        <h2>${locale === 'en' ? "Let's discuss what your business needs next." : 'Hablemos de lo que necesita tu negocio a continuación.'}</h2>
        <p>${locale === 'en' ? 'Whether you\'re exploring AI or improving a complex software system, we\'ll start with the problem and work toward a practical solution.' : 'Ya sea que estés explorando IA o mejorando un sistema de software complejo, empezaremos por el problema y avanzaremos hacia una solución práctica.'}</p>
        ${ctaHtml ? `<div class="cta-row center">${ctaHtml}</div>` : `<p class="notice">${locale === 'en' ? 'Contact details will be available soon.' : 'Los datos de contacto estarán disponibles próximamente.'}</p>`}
      </div>
    </section>
  `;


}

function renderGenericPage({ locale, pageId, title, lead, bodySections }) {
  const contentHtml = `
    <section class="page-header">
      <div class="container narrow">
        <p class="eyebrow subtle">${locale === 'en' ? 'Sintelium' : 'Sintelium'}</p>
        <h1>${title}</h1>
        ${lead ? `<p class="lead">${lead}</p>` : ''}
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

function renderServicesIndex(locale) {
  const cards = servicesData.categories.map((category) => `
    <article class="card card-service">
      <span class="service-icon" aria-hidden="true">↗</span>
      <h3>${localeText(category.title, locale)}</h3>
      <p>${localeText(category.summary, locale)}</p>
      <ul class="mini-list">
        ${category.subservices.slice(0, 3).map((sub) => `<li>${localeText(sub.title, locale)}</li>`).join('')}
      </ul>
      <a href="${toProjectUrl(category.routes[locale])}" class="text-link">${locale === 'en' ? 'See category' : 'Ver categoría'}</a>
    </article>
  `).join('');

  const body = `
    <div class="intro-block">
      <p>${locale === 'en' ? 'From AI agents and automation to software modernization, security, and cloud reliability, Sintelium supports the full journey from technical strategy to delivery.' : 'Desde agentes de IA y automatización hasta modernización de software, seguridad y fiabilidad en la nube, Sintelium acompaña todo el recorrido desde la estrategia técnica hasta la entrega.'}</p>
    </div>
    <div class="card-grid service-grid">${cards}</div>
    <div class="section-divider"></div>
    <div class="two-column">
      <div>
        <h2>${locale === 'en' ? 'Common business challenges' : 'Retos comunes del negocio'}</h2>
        <ul class="check-list">
          <li>${locale === 'en' ? 'Manual, repetitive work is slowing teams down' : 'El trabajo manual y repetitivo está frenando a los equipos'}</li>
          <li>${locale === 'en' ? 'Systems are difficult to integrate and maintain' : 'Los sistemas son difíciles de integrar y mantener'}</li>
          <li>${locale === 'en' ? 'AI pilots are not ready for operational use' : 'Los pilotos de IA no están listos para uso operativo'}</li>
          <li>${locale === 'en' ? 'Applications are under pressure from growth or technical debt' : 'Las aplicaciones están bajo presión por el crecimiento o la deuda técnica'}</li>
        </ul>
      </div>
      <div>
        <h2>${locale === 'en' ? 'Engagement models' : 'Modelos de colaboración'}</h2>
        <ul class="check-list">
          <li>${locale === 'en' ? 'Fixed-scope project' : 'Proyecto con alcance fijo'}</li>
          <li>${locale === 'en' ? 'Time and materials' : 'Tiempo y materiales'}</li>
          <li>${locale === 'en' ? 'Ongoing retainer' : 'Retén continuo'}</li>
        </ul>
      </div>
    </div>
  `;

  return renderGenericPage({ locale, pageId: 'services', title: locale === 'en' ? 'Services that connect AI ambition with engineering execution.' : 'Servicios que conectan la visión de IA con la ejecución técnica.', lead: locale === 'en' ? 'From AI agents and automation to software modernization, security, and cloud reliability, Sintelium supports the full journey from technical strategy to delivery.' : 'Desde agentes de IA y automatización hasta modernización de software, seguridad y fiabilidad en la nube, Sintelium acompaña todo el recorrido desde la estrategia técnica hasta la entrega.', bodySections: body });
}

function renderServicePage(locale, category) {
  const lead = localeText(category.summary, locale);
  const subcards = category.subservices.map((sub) => `
    <article class="card card-subservice">
      <h3>${localeText(sub.title, locale)}</h3>
      <p>${localeText(sub.description, locale)}</p>
      <div class="deliverable-box">
        <strong>${locale === 'en' ? 'Typical deliverables' : 'Entregables habituales'}</strong>
        <ul>${localeText(sub.deliverables, locale).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');

  const related = (category.relatedCategoryIds || []).map((id) => {
    const item = categoryMap.get(id);
    if (!item) return '';
    return `<li><a href="${toProjectUrl(item.routes[locale])}">${localeText(item.title, locale)}</a></li>`;
  }).join('');

  const faqSubset = faqs.items.filter((item) => item.featured === true || item.category === 'general').slice(0, 3).map((item) => `
    <div class="faq-item-micro">
      <h3>${localeText(item.question, locale)}</h3>
      <p>${localeText(item.answer, locale)}</p>
    </div>
  `).join('');

  const body = `
    <div class="service-hero">
      <p class="eyebrow subtle">${locale === 'en' ? 'Service category' : 'Categoría de servicio'}</p>
      <h1>${localeText(category.title, locale)}</h1>
      <p class="lead">${lead}</p>
      ${getContactCta(locale) ? `<div class="cta-row">${getContactCta(locale)}</div>` : ''}
    </div>
    <div class="section-divider"></div>
    <div class="two-column">
      <div>
        <h2>${locale === 'en' ? 'Problems addressed' : 'Problemas que aborda'}</h2>
        <ul class="check-list">
          <li>${locale === 'en' ? 'Identify the highest-value opportunities and the practical path to execution.' : 'Identificar las oportunidades de mayor valor y el camino práctico para ejecutarlas.'}</li>
          <li>${locale === 'en' ? 'Reduce operational friction across systems, teams, and decisions.' : 'Reducir la fricción operativa entre sistemas, equipos y decisiones.'}</li>
          <li>${locale === 'en' ? 'Move from experimentation to secure, observable delivery.' : 'Pasar de la experimentación a una entrega segura y observable.'}</li>
        </ul>
      </div>
      <div>
        <h2>${locale === 'en' ? 'Typical workflow' : 'Flujo habitual'}</h2>
        <ol class="number-list">
          <li>${locale === 'en' ? 'Assess goals, context, and constraints.' : 'Evaluar objetivos, contexto y restricciones.'}</li>
          <li>${locale === 'en' ? 'Design the architecture and delivery plan.' : 'Diseñar la arquitectura y el plan de entrega.'}</li>
          <li>${locale === 'en' ? 'Build, integrate, and test with clear checkpoints.' : 'Desarrollar, integrar y probar con puntos de control claros.'}</li>
          <li>${locale === 'en' ? 'Validate outcomes and plan the next iteration.' : 'Validar resultados y planificar la siguiente iteración.'}</li>
        </ol>
      </div>
    </div>
    <div class="section-divider"></div>
    <div class="card-grid service-grid">${subcards}</div>
    <div class="section-divider"></div>
    <div class="two-column">
      <div>
        <h2>${locale === 'en' ? 'Adjacent categories' : 'Categorías relacionadas'}</h2>
        <ul class="check-list">${related || '<li>—</li>'}</ul>
      </div>
      <div>
        <h2>${locale === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes'}</h2>
        ${faqSubset}
      </div>
    </div>
    <div class="cta-panel inset">
      <h3>${locale === 'en' ? 'Start with the problem, not the tool.' : 'Empieza por el problema, no por la herramienta.'}</h3>
      <p>${locale === 'en' ? 'Tell us about your goals, constraints, and the challenges you want to solve.' : 'Cuéntenos sus objetivos, restricciones y los desafíos que desea resolver.'}</p>
      ${getContactCta(locale) ? `<div class="cta-row center">${getContactCta(locale)}</div>` : ''}
    </div>
  `;

  return renderPage({ locale, canonicalUrl: `${site.domain}${toProjectUrl(category.routes[locale])}`, title: localeText(category.title, locale), description: lead, pageId: category.id, contentHtml: `<section class="section"><div class="container">${body}</div></section>` });
}

function renderAbout(locale) {
  const body = `
    <div class="value-grid">
      <article class="card"><h3>${locale === 'en' ? 'Clarity over complexity' : 'Claridad por encima de la complejidad'}</h3><p>${locale === 'en' ? 'We translate ambiguity into practical plans and measurable progress.' : 'Convertimos la ambigüedad en planes prácticos y progreso medible.'}</p></article>
      <article class="card"><h3>${locale === 'en' ? 'Engineering discipline' : 'Disciplina de ingeniería'}</h3><p>${locale === 'en' ? 'Strong architecture, testability, observability, and maintainability matter as much as business value.' : 'La arquitectura sólida, la comprobabilidad, la observabilidad y la mantenibilidad importan tanto como el valor empresarial.'}</p></article>
      <article class="card"><h3>${locale === 'en' ? 'Responsible AI' : 'IA responsable'}</h3><p>${locale === 'en' ? 'AI should support decisions with guardrails, human oversight, and clear accountability.' : 'La IA debe apoyar decisiones con salvaguardas, supervisión humana y responsabilidad clara.'}</p></article>
      <article class="card"><h3>${locale === 'en' ? 'Long-term maintainability' : 'Mantenibilidad a largo plazo'}</h3><p>${locale === 'en' ? 'Systems are designed to evolve without creating irreversible complexity.' : 'Los sistemas están diseñados para evolucionar sin crear complejidad irreversible.'}</p></article>
    </div>
    <div class="two-column">
      <div>
        <h2>${locale === 'en' ? 'Our philosophy' : 'Nuestra filosofía'}</h2>
        <p>${locale === 'en' ? 'Sintelium is a software and AI consultancy focused on solving meaningful business challenges through thoughtful architecture, responsible automation, and dependable delivery.' : 'Sintelium es una consultora de software e IA centrada en resolver desafíos empresariales relevantes mediante una arquitectura reflexiva, automatización responsable y entrega fiable.'}</p>
      </div>
      <div>
        <h2>${locale === 'en' ? 'How we collaborate' : 'Cómo colaboramos'}</h2>
        <p>${locale === 'en' ? 'We prefer clear checkpoints, shared decisions, and direct communication so teams can move confidently without losing context.' : 'Preferimos puntos de control claros, decisiones compartidas y comunicación directa para que los equipos puedan avanzar con confianza sin perder contexto.'}</p>
      </div>
    </div>
  `;

  return renderGenericPage({ locale, pageId: 'about', title: locale === 'en' ? 'Engineering with purpose. AI with practical value.' : 'Ingeniería con propósito. IA con valor práctico.', lead: locale === 'en' ? 'Sintelium is a software and AI consultancy focused on solving meaningful business challenges through thoughtful architecture, responsible automation, and dependable delivery.' : 'Sintelium es una consultora de software e IA centrada en resolver desafíos empresariales relevantes mediante una arquitectura reflexiva, automatización responsable y entrega fiable.', bodySections: body });
}

function renderProcess(locale) {
  const body = process.steps.map((step) => `
    <article class="process-step-card">
      <span class="step-number">${step.number}</span>
      <h3>${localeText(step.title, locale)}</h3>
      <p>${localeText(step.description, locale)}</p>
    </article>
  `).join('');

  return renderGenericPage({ locale, pageId: 'process', title: locale === 'en' ? 'A straightforward way to solve complex challenges.' : 'Una forma clara de resolver desafíos complejos.', lead: locale === 'en' ? 'We work through discovery, design, build, and validation so decisions stay aligned with business goals and technical realities.' : 'Trabajamos a través del descubrimiento, diseño, desarrollo y validación para que las decisiones sigan alineadas con los objetivos del negocio y la realidad técnica.', bodySections: `<div class="process-grid">${body}</div>` });
}

function renderFaq(locale) {
  const list = faqs.items.map((item) => `
    <details class="faq-detail" ${item.featured ? 'open' : ''}>
      <summary>${localeText(item.question, locale)}</summary>
      <p>${localeText(item.answer, locale)}</p>
    </details>
  `).join('');

  return renderGenericPage({ locale, pageId: 'faq', title: locale === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes', lead: locale === 'en' ? 'Answers to common questions about AI, automation, software delivery, and engagement.' : 'Respuestas a preguntas comunes sobre IA, automatización, entrega de software y colaboración.', bodySections: `<div class="faq-list">${list}</div>` });
}

function renderContact(locale) {
  const bookingCta = site.contact.bookingUrl ? `<a class="button button-primary" href="${site.contact.bookingUrl}" target="_blank" rel="noopener noreferrer">${locale === 'en' ? 'Book a discovery call' : 'Reservar una reunión inicial'}</a>` : '';
  const emailCta = site.contact.email ? `<a class="button button-secondary" href="mailto:${site.contact.email}">${locale === 'en' ? 'Send an email' : 'Enviar un correo'}</a>` : '';
  const lead = locale === 'en'
    ? 'Tell us what you\'re trying to achieve. We can explore AI opportunities, review an existing system, or discuss a new software solution.'
    : 'Cuéntenos lo que intenta lograr. Podemos explorar oportunidades de IA, revisar un sistema existente o hablar sobre una nueva solución de software.';
  const body = `
    <div class="contact-panel">
      <p class="lead">${lead}</p>
      <p>${locale === 'en' ? 'Helpful details include your business goal, current challenges, approximate scope, and preferred timeline. Please avoid sharing credentials or sensitive data in your first message.' : 'Los detalles útiles incluyen su objetivo de negocio, los desafíos actuales, el alcance aproximado y el plazo deseado. Evite compartir credenciales o datos sensibles en su primer mensaje.'}</p>
      <div class="cta-row">
        ${bookingCta || ''}
        ${emailCta || ''}
      </div>
      ${!(bookingCta || emailCta) ? `<p class="notice">${locale === 'en' ? 'Contact details will be available soon.' : 'Los datos de contacto estarán disponibles próximamente.'}</p>` : ''}
    </div>
  `;
  return renderGenericPage({ locale, pageId: 'contact', title: locale === 'en' ? 'Let\'s talk about your next project.' : 'Hablemos de tu próximo proyecto.', lead, bodySections: body });
}

function renderPrivacy(locale) {
  const body = `
    <div class="notice-box">
      <strong>${locale === 'en' ? 'Status: requires owner legal review before publication.' : 'Estado: requiere revisión legal del propietario antes de publicar.'}</strong>
      <p>${locale === 'en' ? 'This page is intentionally left as a template pending legal review. Replace or approve the actual privacy measure list before launch.' : 'Esta página se deja intencionalmente como plantilla pendiente de revisión legal. Sustituya o apruebe la lista de medidas de privacidad reales antes del lanzamiento.'}</p>
    </div>
    <ul class="check-list">
      <li>${locale === 'en' ? 'Hosting and static site provider details should be described accurately.' : 'Los detalles del proveedor de hosting y del sitio estático deben describirse con precisión.'}</li>
      <li>${locale === 'en' ? 'Scheduling or booking tools must be disclosed if used.' : 'Las herramientas de programación o reserva deben revelarse si se utilizan.'}</li>
      <li>${locale === 'en' ? 'Email handling and contact preferences must be documented.' : 'El manejo del correo electrónico y las preferencias de contacto deben documentarse.'}</li>
      <li>${locale === 'en' ? 'Any analytics or third-party scripts require consent review before activation.' : 'Cualquier analítica o script de terceros requiere revisión de consentimiento antes de activarse.'}</li>
    </ul>
  `;
  return renderGenericPage({ locale, pageId: 'privacy', title: locale === 'en' ? 'Privacy' : 'Privacidad', lead: locale === 'en' ? 'This page is intentionally a legal review template until the owner approves the final content.' : 'Esta página es una plantilla de revisión legal hasta que el propietario apruebe el contenido final.', bodySections: body });
}

function renderLegal(locale) {
  const body = `
    <div class="notice-box">
      <strong>${locale === 'en' ? 'Status: requires owner legal review before publication.' : 'Estado: requiere revisión legal del propietario antes de publicar.'}</strong>
      <p>${locale === 'en' ? 'No fabricated legal entity, postal address, registration number, jurisdiction claims, or compliance certifications are included here.' : 'No se incluyen entidad legal inventada, dirección postal, número de registro, afirmaciones de jurisdicción ni certificaciones de cumplimiento.'}</p>
    </div>
    <ul class="check-list">
      <li>${locale === 'en' ? 'Confirm legal name, business status, and responsible jurisdiction.' : 'Confirmar el nombre legal, el estado de la empresa y la jurisdicción responsable.'}</li>
      <li>${locale === 'en' ? 'Confirm domain and privacy disclosures for any connected booking or email provider.' : 'Confirmar divulgaciones de dominio y privacidad para cualquier proveedor de reserva o correo conectado.'}</li>
      <li>${locale === 'en' ? 'Review any website notices against current commercial and privacy obligations.' : 'Revisar cualquier aviso del sitio frente a las obligaciones comerciales y de privacidad vigentes.'}</li>
    </ul>
  `;
  return renderGenericPage({ locale, pageId: 'legal', title: locale === 'en' ? 'Legal notice' : 'Aviso legal', lead: locale === 'en' ? 'This legal notice is intentionally a template pending business approval.' : 'Este aviso legal es intencionalmente una plantilla pendiente de aprobación empresarial.', bodySections: body });
}

function render404(locale) {
  const body = `
    <div class="notice-box">
      <h1>${locale === 'en' ? 'Page not found' : 'Página no encontrada'}</h1>
      <p>${locale === 'en' ? 'The page you are looking for may have moved. Start from a key section below.' : 'La página que buscas puede haber cambiado de ubicación. Empieza por una de las secciones clave.'}</p>
      <div class="cta-row">
        <a class="button button-primary" href="${routeFor('home', locale)}">${locale === 'en' ? 'Go to homepage' : 'Ir a la página de inicio'}</a>
        <a class="button button-secondary" href="${routeFor('services', locale)}">${locale === 'en' ? 'View services' : 'Ver servicios'}</a>
      </div>
    </div>
  `;

  return renderPage({ locale, canonicalUrl: `${site.domain}/404.html`, title: locale === 'en' ? 'Page not found' : 'Página no encontrada', description: 'Not found', pageId: 'home', contentHtml: body });
}

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
  validateJson();
  ensureDir(generatedDir);
  const renderers = { home: locale => renderPage({ locale, pageId: 'home', canonicalUrl: `${site.domain}${routeFor('home', locale)}`, contentHtml: renderHome(locale) }), services: renderServicesIndex, about: renderAbout, process: renderProcess, faq: renderFaq, contact: renderContact, privacy: renderPrivacy, legal: renderLegal };
  for (const [id, page] of Object.entries(pages)) {
    for (const locale of ['en', 'es']) writeFile(path.join(generatedDir, page.routes[locale], 'index.html'), renderers[id](locale));
  }
  for (const category of servicesData.categories) {
    for (const locale of ['en', 'es']) writeFile(path.join(generatedDir, category.routes[locale], 'index.html'), renderServicePage(locale, category));
  }
  writeFile(path.join(generatedDir, 'index.html'), renderers.home('en'));
  writeFile(path.join(generatedDir, '404.html'), render404('en'));
  generateSitemap();
}
main();
