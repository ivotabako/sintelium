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

const categoryMap = new Map(servicesData.categories.map((category) => [category.id, category]));

function toProjectUrl(pathname) {
  const basePath = '/sintelium';
  if (!pathname) return basePath;
  if (pathname === '/') return basePath;
  return `${basePath}${pathname.startsWith('/') ? pathname : `/${pathname}`}`;
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
  return locale === 'en' ? '/sintelium/en/' : '/sintelium/es/';
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

function buildNav(locale) {
  const navLinks = navigation.primary
    .map((item) => {
      const href = routeFor(item.routeId, locale);
      return `<a class="nav-link" href="${href}">${localeText(item.label, locale)}</a>`;
    })
    .join('');

  const languageSwitch = `
    <div class="language-switch" aria-label="Language switcher">
      <a href="${routeFor('home', 'en')}" aria-label="English" class="${locale === 'en' ? 'is-active' : ''}">EN</a>
      <a href="${routeFor('home', 'es')}" aria-label="Español" class="${locale === 'es' ? 'is-active' : ''}">ES</a>
    </div>
  `;

  const cta = getContactCta(locale);
  const mobileToggle = '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="Open menu">Menu</button>';

  return `
    <header class="site-header">
      <div class="container nav-shell">
        <a class="brand" href="${routeFor('home', locale)}" aria-label="Sintelium home">
          <svg class="brand-mark" viewBox="0 0 64 64" role="img" aria-label="Sintelium">
            <path d="M18 16c8-6 21-6 28 2 5 6 4 14-3 18l-7 5c-4 3-6 8-4 13 3 7 11 9 18 5l2 7c-9 6-23 6-31-2-6-7-6-17 2-24l7-5c4-3 6-8 4-13-2-7-11-10-18-5l-4-6Z" fill="currentColor"></path>
          </svg>
          <span>Sintelium</span>
        </a>
        <nav id="site-nav" class="site-nav" aria-label="Main navigation">
          ${navLinks}
        </nav>
        <div class="nav-actions">
          ${languageSwitch}
          ${cta ? `<div class="nav-cta">${cta}</div>` : ''}
          ${mobileToggle}
        </div>
      </div>
    </header>
  `;
}

function buildFooter(locale) {
  const serviceSections = servicesData.categories.map((category) => `
    <li><a href="${category.routes[locale]}">${localeText(category.title, locale)}</a></li>
  `).join('');

  const year = new Date().getFullYear();
  const privacyHref = routeFor('privacy', locale);
  const legalHref = routeFor('legal', locale);
  const contactHref = routeFor('contact', locale);

  return `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <a class="brand brand-footer" href="${routeFor('home', locale)}">Sintelium</a>
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
            <li><a href="${routeFor('home', 'en')}">EN</a></li>
            <li><a href="${routeFor('home', 'es')}">ES</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-meta">
        <p>© ${year} Sintelium</p>
      </div>
    </footer>
  `;
}

function renderCommonHead({ locale, title, description, canonicalUrl, pageType = 'website' }) {
  return `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="theme-color" content="#0B2422" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${site.domain}/images/og-default.svg" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${site.domain}/images/og-default.svg" />
    <meta property="og:site_name" content="Sintelium" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate" hreflang="en" href="${site.domain}${routeFor('home', 'en')}" />
    <link rel="alternate" hreflang="es" href="${site.domain}${routeFor('home', 'es')}" />
    <link rel="alternate" hreflang="x-default" href="${site.domain}/" />
    ${locale === 'en' ? `<meta http-equiv="content-language" content="en">` : `<meta http-equiv="content-language" content="es">`}
    <script type="module" src="/src/main.js"></script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Sintelium",
        "url": "${site.domain}",
        "areaServed": "Worldwide",
        "description": "${escapeHtml(description)}"
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
    ${renderCommonHead({ locale, title: pageTitle, description: pageDescription, canonicalUrl })}
  </head>
  <body>
    <a class="skip-link" href="#main-content">Skip to content</a>
    ${buildNav(locale)}
    <main id="main-content" class="page-shell">
      ${contentHtml}
    </main>
    ${buildFooter(locale)}
    <script type="module" src="/src/main.js"></script>
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
      <span class="eyebrow-mini">${localeText(category.title, locale)}</span>
      <h3>${localeText(category.title, locale)}</h3>
      <p>${localeText(category.summary, locale)}</p>
      <a href="${category.routes[locale]}" class="text-link">${locale === 'en' ? 'Learn more' : 'Saber más'}</a>
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
            ${ctaHtml || '<span class="cta-row-note">Contact details pending owner confirmation.</span>'}
            <a class="button button-secondary" href="${routeFor('services', locale)}">${locale === 'en' ? 'Explore our services' : 'Explorar servicios'}</a>
          </div>
          <p class="trust-line">${locale === 'en' ? 'Practical engineering. Clear collaboration. Solutions designed to last.' : 'Ingeniería práctica. Colaboración clara. Soluciones pensadas para durar.'}</p>
        </div>
        <div class="hero-visual">
          <svg viewBox="0 0 520 400" role="img" aria-label="AI workflow overview">
            <rect x="26" y="30" width="150" height="76" rx="16" fill="#DDF4EF"/>
            <text x="48" y="70" fill="#0B2422" font-size="18" font-weight="700">Inputs</text>
            <text x="48" y="92" fill="#46534F" font-size="14">APIs, data</text>
            <rect x="182" y="140" width="170" height="96" rx="20" fill="#147D73"/>
            <text x="205" y="182" fill="#fff" font-size="18" font-weight="700">AI agents</text>
            <text x="205" y="205" fill="#DDF4EF" font-size="14">tools + workflow</text>
            <rect x="344" y="258" width="150" height="88" rx="16" fill="#DDF4EF"/>
            <text x="370" y="300" fill="#0B2422" font-size="18" font-weight="700">Business</text>
            <text x="370" y="322" fill="#46534F" font-size="14">approval loop</text>
            <path d="M176 84 H244 L244 140 M244 160 H182 M316 236 L356 258 M380 232 L380 258" stroke="#1C9A8E" stroke-width="5" fill="none" stroke-linecap="round"/>
            <circle cx="180" cy="75" r="8" fill="#0B2422"/>
            <circle cx="244" cy="140" r="8" fill="#147D73"/>
            <circle cx="356" cy="258" r="8" fill="#147D73"/>
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
        ${ctaHtml ? `<div class="cta-row center">${ctaHtml}</div>` : '<p class="notice">Contact details are pending owner approval.</p>'}
      </div>
    </section>
  `;

  return renderPage({ locale, canonicalUrl: `${site.domain}${routeFor('home', locale)}`, title: localeText(seo.pages.home.title, locale), description: localeText(seo.pages.home.description, locale), pageId: 'home', contentHtml: renderHome(locale) });
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
      <span class="eyebrow-mini">${localeText(category.title, locale)}</span>
      <h3>${localeText(category.title, locale)}</h3>
      <p>${localeText(category.summary, locale)}</p>
      <ul class="mini-list">
        ${category.subservices.slice(0, 3).map((sub) => `<li>${localeText(sub.title, locale)}</li>`).join('')}
      </ul>
      <a href="${category.routes[locale]}" class="text-link">${locale === 'en' ? 'See category' : 'Ver categoría'}</a>
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
    return `<li><a href="${item.routes[locale]}">${localeText(item.title, locale)}</a></li>`;
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

  return renderPage({ locale, canonicalUrl: `${site.domain}${category.routes[locale]}`, title: localeText(category.title, locale), description: lead, pageId: 'services', contentHtml: body });
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
      ${!(bookingCta || emailCta) ? '<p class="notice">Contact details are pending owner approval.</p>' : ''}
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
  const routes = new Set();
  for (const locale of ['en', 'es']) {
    routes.add(`${site.domain}${routeFor('home', locale)}`);
    routes.add(`${site.domain}${routeFor('services', locale)}`);
    routes.add(`${site.domain}${routeFor('about', locale)}`);
    routes.add(`${site.domain}${routeFor('process', locale)}`);
    routes.add(`${site.domain}${routeFor('faq', locale)}`);
    routes.add(`${site.domain}${routeFor('contact', locale)}`);
    routes.add(`${site.domain}${routeFor('privacy', locale)}`);
    routes.add(`${site.domain}${routeFor('legal', locale)}`);
  }

  for (const category of servicesData.categories) {
    routes.add(`${site.domain}${category.routes.en}`);
    routes.add(`${site.domain}${category.routes.es}`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${Array.from(routes).map((url) => {
    const localeUrl = new URL(url);
    const localePath = localeUrl.pathname;
    const lang = localePath.startsWith('/es/') ? 'es' : 'en';
    const alt = lang === 'es' ? `${site.domain}${routeFor('home', 'en')}` : `${site.domain}${routeFor('home', 'es')}`;
    return `
  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${site.domain}${routeFor('home', 'en')}" />
    <xhtml:link rel="alternate" hreflang="es" href="${site.domain}${routeFor('home', 'es')}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.domain}/" />
  </url>`;
  }).join('')}
</urlset>`;

  writeFile(path.join(root, 'dist', 'sitemap.xml'), sitemap);
  writeFile(path.join(root, 'public', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`);
}

function copyPublicAssets() {
  const publicDir = path.join(root, 'public');
  for (const entry of fs.readdirSync(publicDir, { withFileTypes: true })) {
    const fullPath = path.join(publicDir, entry.name);
    if (entry.isDirectory()) {
      fs.cpSync(fullPath, path.join(root, 'dist', entry.name), { recursive: true });
    } else {
      fs.copyFileSync(fullPath, path.join(root, 'dist', entry.name));
    }
  }
}

function generateRootPages() {
  fs.rmSync(generatedDir, { recursive: true, force: true });
  ensureDir(generatedDir);
  const routes = [];
  const pageMap = new Map();
  const staticPages = ['home', 'services', 'about', 'process', 'faq', 'contact', 'privacy', 'legal'];

  for (const pageId of staticPages) {
    for (const locale of ['en', 'es']) {
      const routePath = routeFor(pageId, locale);
      routes.push({ pageId, locale, routePath });
      pageMap.set(`${pageId}:${locale}`, routePath);
    }
  }

  for (const category of servicesData.categories) {
    for (const locale of ['en', 'es']) {
      const routePath = category.routes[locale];
      routes.push({ pageId: category.id, locale, routePath });
      pageMap.set(`${category.id}:${locale}`, routePath);
    }
  }

  const rootIndex = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sintelium</title>
    <meta name="description" content="AI transformation and engineering consultancy." />
    <link rel="canonical" href="${site.domain}/" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Sintelium" />
    <meta property="og:description" content="AI transformation and engineering consultancy." />
    <meta property="og:image" content="${site.domain}/images/og-default.svg" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate" hreflang="en" href="${site.domain}/en/" />
    <link rel="alternate" hreflang="es" href="${site.domain}/es/" />
    <link rel="alternate" hreflang="x-default" href="${site.domain}/" />
    <script type="module" src="/src/main.js"></script>
  </head>
  <body>
    <main class="landing-root">
      <section class="landing-panel">
        <p class="eyebrow">Sintelium</p>
        <h1>Build smarter systems. Move business forward.</h1>
        <p class="lead">Practical AI transformation and software engineering for ambitious teams.</p>
        <div class="cta-row">
          <a class="button button-primary" href="/sintelium/en/">English</a>
          <a class="button button-secondary" href="/sintelium/es/">Español</a>
        </div>
      </section>
    </main>
  </body>
</html>`;

  writeFile(path.join(generatedDir, 'index.html'), rootIndex);

  const generatedFiles = new Map();
  generatedFiles.set('home:en', renderHome('en'));
  generatedFiles.set('home:es', renderHome('es'));
  generatedFiles.set('services:en', renderServicesIndex('en'));
  generatedFiles.set('services:es', renderServicesIndex('es'));
  generatedFiles.set('about:en', renderAbout('en'));
  generatedFiles.set('about:es', renderAbout('es'));
  generatedFiles.set('process:en', renderProcess('en'));
  generatedFiles.set('process:es', renderProcess('es'));
  generatedFiles.set('faq:en', renderFaq('en'));
  generatedFiles.set('faq:es', renderFaq('es'));
  generatedFiles.set('contact:en', renderContact('en'));
  generatedFiles.set('contact:es', renderContact('es'));
  generatedFiles.set('privacy:en', renderPrivacy('en'));
  generatedFiles.set('privacy:es', renderPrivacy('es'));
  generatedFiles.set('legal:en', renderLegal('en'));
  generatedFiles.set('legal:es', renderLegal('es'));

  for (const category of servicesData.categories) {
    generatedFiles.set(`${category.id}:en`, renderServicePage('en', category));
    generatedFiles.set(`${category.id}:es`, renderServicePage('es', category));
  }

  const fileMap = [
    { pageId: 'home', locale: 'en', file: path.join(generatedDir, 'en', 'index.html') },
    { pageId: 'home', locale: 'es', file: path.join(generatedDir, 'es', 'index.html') },
    { pageId: 'services', locale: 'en', file: path.join(generatedDir, 'en', 'services', 'index.html') },
    { pageId: 'services', locale: 'es', file: path.join(generatedDir, 'es', 'servicios', 'index.html') },
    { pageId: 'about', locale: 'en', file: path.join(generatedDir, 'en', 'about', 'index.html') },
    { pageId: 'about', locale: 'es', file: path.join(generatedDir, 'es', 'nosotros', 'index.html') },
    { pageId: 'process', locale: 'en', file: path.join(generatedDir, 'en', 'process', 'index.html') },
    { pageId: 'process', locale: 'es', file: path.join(generatedDir, 'es', 'proceso', 'index.html') },
    { pageId: 'faq', locale: 'en', file: path.join(generatedDir, 'en', 'faq', 'index.html') },
    { pageId: 'faq', locale: 'es', file: path.join(generatedDir, 'es', 'preguntas-frecuentes', 'index.html') },
    { pageId: 'contact', locale: 'en', file: path.join(generatedDir, 'en', 'contact', 'index.html') },
    { pageId: 'contact', locale: 'es', file: path.join(generatedDir, 'es', 'contacto', 'index.html') },
    { pageId: 'privacy', locale: 'en', file: path.join(generatedDir, 'en', 'privacy', 'index.html') },
    { pageId: 'privacy', locale: 'es', file: path.join(generatedDir, 'es', 'privacidad', 'index.html') },
    { pageId: 'legal', locale: 'en', file: path.join(generatedDir, 'en', 'legal', 'index.html') },
    { pageId: 'legal', locale: 'es', file: path.join(generatedDir, 'es', 'aviso-legal', 'index.html') }
  ];

  const pageContent = {};
  pageContent['home:en'] = renderHome('en');
  pageContent['home:es'] = renderHome('es');
  pageContent['services:en'] = renderServicesIndex('en');
  pageContent['services:es'] = renderServicesIndex('es');
  pageContent['about:en'] = renderAbout('en');
  pageContent['about:es'] = renderAbout('es');
  pageContent['process:en'] = renderProcess('en');
  pageContent['process:es'] = renderProcess('es');
  pageContent['faq:en'] = renderFaq('en');
  pageContent['faq:es'] = renderFaq('es');
  pageContent['contact:en'] = renderContact('en');
  pageContent['contact:es'] = renderContact('es');
  pageContent['privacy:en'] = renderPrivacy('en');
  pageContent['privacy:es'] = renderPrivacy('es');
  pageContent['legal:en'] = renderLegal('en');
  pageContent['legal:es'] = renderLegal('es');

  for (const category of servicesData.categories) {
    pageContent[`${category.id}:en`] = renderServicePage('en', category);
    pageContent[`${category.id}:es`] = renderServicePage('es', category);
  }

  for (const listItem of fileMap) {
    const contentKey = `${listItem.pageId}:${listItem.locale}`;
    writeFile(listItem.file, pageContent[contentKey]);
  }

  for (const category of servicesData.categories) {
    writeFile(path.join(generatedDir, category.routes.en.replace(/^\//, '').replace(/\/$/, ''), 'index.html'), pageContent[`${category.id}:en`]);
    writeFile(path.join(generatedDir, category.routes.es.replace(/^\//, '').replace(/\/$/, ''), 'index.html'), pageContent[`${category.id}:es`]);
  }

  writeFile(path.join(generatedDir, '404.html'), render404('en'));
  writeFile(path.join(generatedDir, 'es', '404.html'), render404('es'));
  writeFile(path.join(root, 'dist', '404.html'), render404('en'));
}

function developPublic() {
  const distDir = path.join(root, 'dist');
  ensureDir(distDir);
  const publicDir = path.join(root, 'public');
  fs.cpSync(publicDir, distDir, { recursive: true });
  fs.cpSync(path.join(generatedDir), distDir, { recursive: true });
}

function main() {
  validateJson();
  ensureDir(path.join(root, 'src', 'generated'));
  generateRootPages();
  copyPublicAssets();
  fs.writeFileSync(path.join(root, 'dist', 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.domain}/sitemap.xml\n`, 'utf8');
  fs.writeFileSync(path.join(root, 'dist', 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>\n`, 'utf8');
  generateSitemap();
}

main();
