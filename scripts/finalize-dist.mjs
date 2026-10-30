import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const generatedDir = path.join(root, 'src', 'generated');
const distDir = path.join(root, 'dist');
const publicDir = path.join(root, 'public');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyIfExists(source, target) {
  if (!fs.existsSync(source)) return;
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
}

function copyDirIfExists(source, target) {
  if (!fs.existsSync(source)) return;
  ensureDir(target);
  fs.cpSync(source, target, { recursive: true });
}

ensureDir(distDir);
for (const file of ['index.html', '404.html']) {
  const source = path.join(generatedDir, file);
  if (fs.existsSync(source)) {
    fs.copyFileSync(source, path.join(distDir, file));
  }
}
for (const dir of ['en', 'es']) {
  copyDirIfExists(path.join(generatedDir, dir), path.join(distDir, dir));
}
copyIfExists(path.join(publicDir, 'robots.txt'), path.join(distDir, 'robots.txt'));
copyIfExists(path.join(publicDir, 'CNAME'), path.join(distDir, 'CNAME'));
const sitemapSource = path.join(root, 'dist', 'sitemap.xml');
if (fs.existsSync(sitemapSource)) {
  fs.copyFileSync(sitemapSource, path.join(distDir, 'sitemap.xml'));
}

console.log('Dist finalization succeeded.');
