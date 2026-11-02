import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root } from './lib/paths.mjs';

const commands = {
  validate: [['scripts/validate-content.mjs']],
  build: [['scripts/build.mjs'], ['node_modules/vite/bin/vite.js', 'build'], ['scripts/finalize-dist.mjs']],
  dev: [['scripts/build.mjs'], ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1']]
};
const command = process.argv[2];
if (!Object.hasOwn(commands, command)) {
  console.error('Unknown command: ' + command);
  process.exit(1);
}

for (const [script, ...args] of commands[command]) {
  const result = spawnSync(process.execPath, [path.join(root, script), ...args], {
    cwd: root,
    stdio: 'inherit',
    // Preserve the existing draft workflow; an explicit strict setting wins.
    env: { ...process.env, ALLOW_UNCONFIGURED_CONTACT: process.env.ALLOW_UNCONFIGURED_CONTACT ?? 'true' }
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}
