import fs from 'node:fs';
import path from 'node:path';
import { readJson } from './lib/content.mjs';
import { generatedDir, distDir } from './lib/paths.mjs';

const site = readJson('site.json');
fs.copyFileSync(path.join(generatedDir, 'sitemap.xml'), path.join(distDir, 'sitemap.xml'));
fs.writeFileSync(path.join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${site.domain}${site.basePath || ''}/sitemap.xml\n`);
// A project site must not claim the production custom domain.
const cname = path.join(distDir, 'CNAME');
if (site.basePath && fs.existsSync(cname)) fs.unlinkSync(cname);
console.log('Dist finalization succeeded; bundled HTML preserved.');
