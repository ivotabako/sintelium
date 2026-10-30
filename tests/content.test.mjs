import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd());

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, 'content', file), 'utf8'));
}

test('site content includes bilingual values', () => {
  const site = readJson('site.json');
  assert.equal(site.locales.includes('en'), true);
  assert.equal(site.locales.includes('es'), true);
});

test('all service categories are present', () => {
  const services = readJson('services.json');
  const expected = ['ai-transformation', 'software-engineering', 'modernization', 'performance-cloud', 'security-quality', 'data-integrations', 'advisory'];
  const categoryIds = services.categories.map((category) => category.id);
  for (const id of expected) assert.ok(categoryIds.includes(id), `Missing service category: ${id}`);
});

test('faqs have enough content', () => {
  const faqs = readJson('faqs.json');
  assert.ok(faqs.items.length >= 12);
});
