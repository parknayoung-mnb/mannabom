import { cp, mkdir, rm, stat } from 'node:fs/promises';

const files = ['index.html', 'styles.css', 'script.js', '.nojekyll'];
for (const file of files) {
  const fileStat = await stat(file);
  if (!fileStat.isFile()) throw new Error(`${file} is missing or is not a file`);
}

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
for (const file of files) await cp(file, `dist/${file}`);
await cp('assets', 'dist/assets', { recursive: true });
console.log('Built static site into dist/');
