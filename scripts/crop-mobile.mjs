import sharp from 'sharp';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const HERO_DIR = resolve(ROOT, 'public', 'hero');

const jobs = [
  {
    in: resolve(HERO_DIR, 'niza-living.webp'),
    out: resolve(HERO_DIR, 'niza-living-mobile.webp'),
    aspect: { w: 4, h: 5 },
    targetWidth: 1200,
    quality: 82,
  },
];

for (const job of jobs) {
  const meta = await sharp(job.in).metadata();
  const targetCropWidth = Math.floor((meta.height * job.aspect.w) / job.aspect.h);
  const cropWidth = Math.min(targetCropWidth, meta.width);
  const cropHeight = Math.floor((cropWidth * job.aspect.h) / job.aspect.w);
  const left = Math.floor((meta.width - cropWidth) / 2);
  const top = Math.floor((meta.height - cropHeight) / 2);

  const info = await sharp(job.in)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize({ width: job.targetWidth, withoutEnlargement: true })
    .webp({ quality: job.quality, effort: 5 })
    .toFile(job.out);

  console.log(
    `${job.in.split(/[\\/]/).pop()} → ${job.out.split(/[\\/]/).pop()}  ` +
      `${meta.width}×${meta.height} → ${info.width}×${info.height}  ` +
      `${(info.size / 1024).toFixed(0)} KB`,
  );

  // Versión pre-borrosa para la animación de profundidad sin jank.
  // Resolución baja (el browser escala), blur fuerte aplicado offline.
  const blurOut = job.out.replace(/\.webp$/, '-blur.webp');
  const blurInfo = await sharp(job.in)
    .extract({ left, top, width: cropWidth, height: cropHeight })
    .resize({ width: 240, withoutEnlargement: true })
    .blur(18)
    .webp({ quality: 60, effort: 5 })
    .toFile(blurOut);
  console.log(
    `  + ${blurOut.split(/[\\/]/).pop()}  ${blurInfo.width}×${blurInfo.height}  ` +
      `${(blurInfo.size / 1024).toFixed(0)} KB`,
  );
}
