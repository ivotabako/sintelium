import { spawnSync } from 'node:child_process';
const commands = { validate: [['scripts/validate-content.mjs']], build: [['scripts/build.mjs'], ['node_modules/vite/bin/vite.js', 'build'], ['scripts/finalize-dist.mjs']], dev: [['scripts/build.mjs'], ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1']] };
for (const args of commands[process.argv[2]] || []) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit', env: { ...process.env, ALLOW_UNCONFIGURED_CONTACT: 'true' } });
  if (result.status !== 0) process.exit(result.status || 1);
}
