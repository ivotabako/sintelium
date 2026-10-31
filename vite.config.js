import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
const site = JSON.parse(fs.readFileSync('content/site.json', 'utf8'));
const root = path.resolve('src/generated');
function htmlInputs(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? htmlInputs(path.join(dir, entry.name)) : entry.name.endsWith('.html') ? [path.join(dir, entry.name)] : []);
}
export default defineConfig({
  root, base: `${site.basePath || ''}/`, publicDir: path.resolve('public'),
  plugins: [{ name: 'source-entry', resolveId(id) { if (id === '/src/main.js') return path.resolve('src/main.js'); } }],
  server: { fs: { allow: [process.cwd()] } },
  build: { outDir: path.resolve('dist'), emptyOutDir: true, rollupOptions: { input: htmlInputs(root) } }
});
