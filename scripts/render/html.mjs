export function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function localeText(value, locale) {
  return value && value[locale] !== undefined ? value[locale] : value?.en ?? '';
}

/** Use for localized plain text interpolated into HTML, not metadata or arrays. */
export function localeHtml(value, locale) {
  return escapeHtml(localeText(value, locale));
}
