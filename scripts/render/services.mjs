import { escapeHtml, localeText, localeHtml } from './html.mjs';

export function createServicesRenderers(content, routes, layout) {
  const { site, servicesData, faqs } = content;
  const categoryMap = new Map(servicesData.categories.map(category => [category.id, category]));
  const { toProjectUrl } = routes;
  const { getContactCta, renderPage, renderGenericPage } = layout;
function renderServicesIndex(locale) {
  const cards = servicesData.categories.map((category) => `
    <article class="card card-service">
      <span class="service-icon" aria-hidden="true">↗</span>
      <h3>${localeHtml(category.title, locale)}</h3>
      <p>${localeHtml(category.summary, locale)}</p>
      <ul class="mini-list">
        ${category.subservices.slice(0, 3).map((sub) => `<li>${localeHtml(sub.title, locale)}</li>`).join('')}
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
      <h3>${localeHtml(sub.title, locale)}</h3>
      <p>${localeHtml(sub.description, locale)}</p>
      <div class="deliverable-box">
        <strong>${locale === 'en' ? 'Typical deliverables' : 'Entregables habituales'}</strong>
        <ul>${localeText(sub.deliverables, locale).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
      </div>
    </article>
  `).join('');

  const related = (category.relatedCategoryIds || []).map((id) => {
    const item = categoryMap.get(id);
    if (!item) return '';
    return `<li><a href="${toProjectUrl(item.routes[locale])}">${localeHtml(item.title, locale)}</a></li>`;
  }).join('');

  const faqSubset = faqs.items.filter((item) => item.featured === true || item.category === 'general').slice(0, 3).map((item) => `
    <div class="faq-item-micro">
      <h3>${localeHtml(item.question, locale)}</h3>
      <p>${localeHtml(item.answer, locale)}</p>
    </div>
  `).join('');

  const body = `
    <div class="service-hero">
      <p class="eyebrow subtle">${locale === 'en' ? 'Service category' : 'Categoría de servicio'}</p>
      <h1>${localeHtml(category.title, locale)}</h1>
      <p class="lead">${escapeHtml(lead)}</p>
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


  return { renderServicesIndex, renderServicePage };
}
