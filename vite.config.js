import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';
import { readJson } from './scripts/lib/content.mjs';
import { root, generatedDir, distDir } from './scripts/lib/paths.mjs';

const site = readJson('site.json');
function htmlInputs(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) return htmlInputs(file);
    return entry.name.endsWith('.html') ? [file] : [];
  });
}

export default defineConfig({
  root: generatedDir,
  base: (site.basePath || '') + '/',
  publicDir: path.join(root, 'public'),
  plugins: [{
    name: 'source-entry',
    resolveId(id) {
      if (id === '/src/main.js') return path.join(root, 'src/main.js');
    }
  }],
  server: { fs: { allow: [root] } },
  build: {
    outDir: distDir,
    emptyOutDir: true,
    rollupOptions: { input: htmlInputs(generatedDir) }
  }
});
