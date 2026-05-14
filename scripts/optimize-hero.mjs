import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT_DIR = resolve(ROOT, 'public', 'hero');

const jobs = [
  {
    in: resolve(ROOT, 'PROYECTO MANANTIALES (1).png'),
    out: resolve(OUT_DIR, 'manantiales.webp'),
    width: 1920,
    quality: 82,
  },
];

await mkdir(OUT_DIR, { recursive: true });

for (const job of jobs) {
  const meta = await sharp(job.in).metadata();
  const info = await sharp(job.in)
    .resize({ width: job.width, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 5 })
    .toFile(job.out);
  console.log(
    `${job.in.split(/[\\/]/).pop()} → ${job.out.split(/[\\/]/).pop()}  ` +
      `${meta.width}×${meta.height} → ${info.width}×${info.height}  ` +
      `${(info.size / 1024).toFixed(0)} KB`,
  );
}
