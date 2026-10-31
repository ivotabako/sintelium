import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const required = [
  'index.html',
  'en/index.html',
  'es/index.html',
  'en/services/index.html',
  'es/servicios/index.html',
  '404.html',
  'sitemap.xml',
  'robots.txt',
  'favicon.svg',
  'images/logo-mark.svg',
  'images/logo-horizontal.svg',
  'images/logo-reversed.svg',
  'images/og-default.svg'
];

const missing = required.filter((file) => {
  const resolved = path.join(dist, file);
  return !fs.existsSync(resolved);
});

if (missing.length) {
  console.error('Missing build artifacts:', missing.join(', '));
  process.exit(1);
}

const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
const base = site.basePath || '';
const pages = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (file.endsWith('.html')) pages.push(file);
  }
}
walk(dist);
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  if (!html.includes('rel="stylesheet"') || html.includes('/src/main.js')) throw new Error(`Unbundled page: ${file}`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) throw new Error(`Expected one H1: ${file}`);
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (!value.startsWith('/') || value.startsWith('//')) continue;
    if (base && !value.startsWith(`${base}/`)) throw new Error(`Link missing base path in ${file}: ${value}`);
    const pathname = value.slice(base.length).split(/[?#]/)[0];
    const resolved = path.join(dist, pathname, pathname.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(resolved)) throw new Error(`Broken link in ${file}: ${value}`);
  }
}
const sitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
if ((sitemap.match(/<loc>/g) || []).length !== 30) throw new Error('Expected all 30 localized routes in sitemap');
console.log(`Dist validation succeeded: ${pages.length} bundled pages, internal links and assets checked.`);
