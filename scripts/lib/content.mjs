import fs from 'node:fs';
import path from 'node:path';
import { contentDir } from './paths.mjs';

export function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
}

export function loadContent() {
  return Object.fromEntries(Object.entries({
    site: 'site', navigation: 'navigation', pages: 'pages', servicesData: 'services',
    faqs: 'faqs', process: 'process', useCases: 'use-cases', seo: 'seo', legal: 'legal'
  }).map(([key, file]) => [key, readJson(file + '.json')]));
}
