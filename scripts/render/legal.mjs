export function createLegalRenderers(content, routes, layout) {
  const { site } = content;
  const { routeFor } = routes;
  const { renderPage, renderGenericPage } = layout;
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


  return { renderPrivacy, renderLegal, render404 };
}
