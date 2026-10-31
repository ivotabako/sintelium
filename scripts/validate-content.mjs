import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = path.resolve(process.cwd());
const contentDir = path.join(root, 'content');

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
}

function hasLocaleValue(value) {
  return value && typeof value === 'object' && value.en !== undefined && value.es !== undefined;
}

function ensureLocalized(obj, label) {
  if (!obj || typeof obj !== 'object') {
    throw new Error(`${label} is missing or not an object`);
  }
  if (!hasLocaleValue(obj)) {
    throw new Error(`${label} must include en and es values`);
  }
  if (typeof obj.en !== 'string' || typeof obj.es !== 'string') {
    throw new Error(`${label} must contain string values for en and es`);
  }
}

function ensureString(value, label) {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`${label} must be a string`);
}

function validateJson() {
  const site = readJson('site.json');
  const nav = readJson('navigation.json');
  const pages = readJson('pages.json');
  const services = readJson('services.json');
  const faqs = readJson('faqs.json');
  const process = readJson('process.json');
  const useCases = readJson('use-cases.json');
  const seo = readJson('seo.json');
  const legal = readJson('legal.json');
  const allowUnconfiguredContact = typeof globalThis.process !== 'undefined' && globalThis.process.env
    ? globalThis.process.env.ALLOW_UNCONFIGURED_CONTACT
    : undefined;

  if (!site.defaultLocale || !['en', 'es'].includes(site.defaultLocale)) throw new Error('site.defaultLocale must be en or es');
  if (!Array.isArray(site.locales) || !site.locales.includes('en') || !site.locales.includes('es')) throw new Error('site.locales must include en and es');
  if (!site.contact || typeof site.contact !== 'object') throw new Error('site.contact is required');
  if (site.contact.email === null && site.contact.bookingUrl === null && allowUnconfiguredContact !== 'true') {
    throw new Error('At least one approved contact path must be configured before production. Set bookingUrl or email, or allow env ALLOW_UNCONFIGURED_CONTACT=true for local-only builds.');
  }

  validateJsonStructure(nav.primary, 'navigation.primary');
  if (!nav.cta || !nav.cta.label) throw new Error('navigation.cta.label is required');
  ensureLocalized(nav.cta.label, 'navigation.cta.label');

  for (const [pageId, page] of Object.entries(pages)) {
    if (!page.routes || !page.routes.en || !page.routes.es) throw new Error(`pages.${pageId}.routes missing en/es`);
  }

  const requiredPageIds = ['home', 'services', 'about', 'process', 'faq', 'contact', 'privacy', 'legal'];
  for (const pageId of requiredPageIds) {
    if (!pages[pageId]) throw new Error(`Missing required page definition: ${pageId}`);
  }

  const categoryIds = ['ai-transformation', 'software-engineering', 'modernization', 'performance-cloud', 'security-quality', 'data-integrations', 'advisory'];
  if (!Array.isArray(services.categories)) throw new Error('services.categories must be an array');
  for (const category of services.categories) {
    if (!categoryIds.includes(category.id)) throw new Error(`Unexpected category id: ${category.id}`);
    if (!category.routes || !category.routes.en || !category.routes.es) throw new Error(`Category ${category.id} missing localized route`);
    ensureLocalized(category.title, `services.categories.${category.id}.title`);
    ensureLocalized(category.summary, `services.categories.${category.id}.summary`);
    if (!Array.isArray(category.subservices) || category.subservices.length < 3) throw new Error(`Category ${category.id} must include at least one subservice list`);
    for (const sub of category.subservices) {
      ensureLocalized(sub.title, `services.categories.${category.id}.subservices.${sub.id}.title`);
      ensureLocalized(sub.description, `services.categories.${category.id}.subservices.${sub.id}.description`);
      if (!Array.isArray(sub.deliverables.en) || !Array.isArray(sub.deliverables.es)) {
        throw new Error(`Category ${category.id} subservice ${sub.id} deliverables must include en and es arrays`);
      }
    }
  }

  if (!Array.isArray(faqs.items) || faqs.items.length < 12) throw new Error('faqs.items must have at least 12 entries');
  for (const item of faqs.items) {
    ensureLocalized(item.question, `faqs.items.${item.id}.question`);
    ensureLocalized(item.answer, `faqs.items.${item.id}.answer`);
  }

  if (!Array.isArray(process.steps) || process.steps.length < 4) throw new Error('process.steps must include at least 4 steps');
  for (const step of process.steps) {
    ensureLocalized(step.title, `process.steps.${step.id}.title`);
    ensureLocalized(step.description, `process.steps.${step.id}.description`);
  }

  if (!Array.isArray(useCases.items) || useCases.items.length < 4) throw new Error('use-cases.items must include at least 4 entries');
  for (const item of useCases.items) {
    ensureLocalized(item.title, `use-cases.items.${item.id}.title`);
    ensureLocalized(item.description, `use-cases.items.${item.id}.description`);
  }

  if (!seo || !seo.defaults) throw new Error('seo.defaults is required');
  for (const [key, value] of Object.entries(seo.pages)) {
    if (value.title) ensureLocalized(value.title, `seo.pages.${key}.title`);
    if (value.description) ensureLocalized(value.description, `seo.pages.${key}.description`);
  }

  if (legal.status !== 'requires-owner-legal-review') throw new Error('legal.status must be requires-owner-legal-review');

  console.log('Content validation succeeded.');
}

function validateJsonStructure(node, label) {
  if (!Array.isArray(node)) {
    throw new Error(`${label} must be an array`);
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    validateJson();
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export { validateJson, ensureLocalized };
