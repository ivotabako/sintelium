import { localeHtml } from './html.mjs';

export function createHomeRenderers(content, routes, layout) {
  const { servicesData, faqs, process, useCases } = content;
  const { routeFor, toProjectUrl } = routes;
  const { getContactCta } = layout;
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
      <h3>${localeHtml(category.title, locale)}</h3>
      <p>${localeHtml(category.summary, locale)}</p>
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
      <h3>${localeHtml(step.title, locale)}</h3>
      <p>${localeHtml(step.description, locale)}</p>
    </div>
  `).join('');

  const illustrativeCases = useCases.items.map((item) => `
    <li>${localeHtml(item.title, locale)}</li>
  `).join('');

  const faqPreview = faqs.items.slice(0, 4).map((item) => `
    <div class="faq-item-micro">
      <h3>${localeHtml(item.question, locale)}</h3>
      <p>${localeHtml(item.answer, locale)}</p>
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


  return { renderHome };
}
