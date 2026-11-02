import { fileURLToPath } from 'node:url';
import path from 'node:path';

export const root = fileURLToPath(new URL('../../', import.meta.url));
export const contentDir = path.join(root, 'content');
export const generatedDir = path.join(root, 'src/generated');
export const distDir = path.join(root, 'dist');
