import { escapeHtml, localeHtml } from './html.mjs';

export function createCompanyRenderers(content, routes, layout) {
  const { site, faqs, process } = content;
  const { renderGenericPage } = layout;
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
      <h3>${localeHtml(step.title, locale)}</h3>
      <p>${localeHtml(step.description, locale)}</p>
    </article>
  `).join('');

  return renderGenericPage({ locale, pageId: 'process', title: locale === 'en' ? 'A straightforward way to solve complex challenges.' : 'Una forma clara de resolver desafíos complejos.', lead: locale === 'en' ? 'We work through discovery, design, build, and validation so decisions stay aligned with business goals and technical realities.' : 'Trabajamos a través del descubrimiento, diseño, desarrollo y validación para que las decisiones sigan alineadas con los objetivos del negocio y la realidad técnica.', bodySections: `<div class="process-grid">${body}</div>` });
}

function renderFaq(locale) {
  const list = faqs.items.map((item) => `
    <details class="faq-detail" ${item.featured ? 'open' : ''}>
      <summary>${localeHtml(item.question, locale)}</summary>
      <p>${localeHtml(item.answer, locale)}</p>
    </details>
  `).join('');

  return renderGenericPage({ locale, pageId: 'faq', title: locale === 'en' ? 'Frequently asked questions' : 'Preguntas frecuentes', lead: locale === 'en' ? 'Answers to common questions about AI, automation, software delivery, and engagement.' : 'Respuestas a preguntas comunes sobre IA, automatización, entrega de software y colaboración.', bodySections: `<div class="faq-list">${list}</div>` });
}

function renderContact(locale) {
  const bookingCta = site.contact.bookingUrl ? `<a class="button button-primary" href="${escapeHtml(site.contact.bookingUrl)}" target="_blank" rel="noopener noreferrer">${locale === 'en' ? 'Book a discovery call' : 'Reservar una reunión inicial'}</a>` : '';
  const emailCta = site.contact.email ? `<a class="button button-secondary" href="mailto:${escapeHtml(site.contact.email)}">${locale === 'en' ? 'Send an email' : 'Enviar un correo'}</a>` : '';
  const lead = locale === 'en'
    ? 'Tell us what you\'re trying to achieve. We can explore AI opportunities, review an existing system, or discuss a new software solution.'
    : 'Cuéntenos lo que intenta lograr. Podemos explorar oportunidades de IA, revisar un sistema existente o hablar sobre una nueva solución de software.';
  const body = `
    <div class="contact-panel">
      <p class="lead">${escapeHtml(lead)}</p>
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


  return { renderAbout, renderProcess, renderFaq, renderContact };
}
