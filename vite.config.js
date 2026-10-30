import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'vite';

function collectHtmlInputs(baseDir) {
  const entries = {};
  const walk = (dir, rootDir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath, rootDir);
      else if (entry.name.endsWith('.html')) {
        const relativePath = path.relative(rootDir, fullPath).split(path.sep).join('/');
        const outputKey = relativePath.replace(/\.html$/, '').replace(/\/index$/, '');
        entries[outputKey || 'index'] = fullPath;
      }
    }
  };

  if (fs.existsSync(baseDir)) walk(baseDir, baseDir);
  return entries;
}

const htmlInputs = collectHtmlInputs(path.resolve(process.cwd(), 'src/generated'));

export default defineConfig({
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: Object.keys(htmlInputs).length ? htmlInputs : { index: path.resolve(process.cwd(), 'src/generated/index.html') },
    },
  },
});
