import fs from 'node:fs';
import path from 'node:path';
fs.copyFileSync('src/generated/sitemap.xml', 'dist/sitemap.xml');
const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${site.domain}${site.basePath || ''}/sitemap.xml\n`);
// A project site must not claim the production custom domain.
if (site.basePath && fs.existsSync('dist/CNAME')) fs.unlinkSync('dist/CNAME');
console.log('Dist finalization succeeded; bundled HTML preserved.');
