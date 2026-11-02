import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root } from './lib/paths.mjs';

function sources(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    if (entry.name === 'generated') return [];
    return entry.isDirectory() ? sources(file) : /\.(?:js|mjs)$/.test(file) ? [file] : [];
  });
}

const files = ['src', 'scripts', 'tests'].flatMap(dir => sources(path.join(root, dir)));
files.push(path.join(root, 'vite.config.js'));
for (const file of files) {
  const result = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
console.log('JavaScript syntax checks passed.');
