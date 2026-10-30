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
  'CNAME',
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

console.log('Dist validation succeeded.');
