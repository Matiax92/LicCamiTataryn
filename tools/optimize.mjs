import sharp from 'sharp';
import { mkdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';

// Uso: node tools/optimize.mjs <archivo> [ancho]
// Optimiza una imagen para web (WebP + AVIF) -> assets/web/
const [, , inputArg, widthArg] = process.argv;
if (!inputArg) {
  console.log('Uso: node tools/optimize.mjs <ruta-a-imagen> [ancho] (default 800)');
  process.exit(1);
}

const input = resolve(inputArg);
const width = Number(widthArg) || 800;
const outDir = resolve(process.cwd(), 'assets/web');
mkdirSync(outDir, { recursive: true });

const base = basename(input).replace(/\.(png|jpe?g|webp)$/i, '').toLowerCase().replace(/\s+/g, '-');
const sharpInstance = sharp(input).resize({ width, withoutEnlargement: true });
const metadata = await sharpInstance.clone().metadata();

const jobs = [
  { ext: 'webp', fmt: sharpInstance.clone().webp({ quality: 82 }) },
  { ext: 'avif', fmt: sharpInstance.clone().avif({ quality: 65 }) },
];

for (const { ext, fmt } of jobs) {
  const out = resolve(outDir, `${base}.${ext}`);
  const info = await fmt.toFile(out);
  console.log(`${out}  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(1)} KB`);
}
console.log(`Fuente: ${metadata.width}x${metadata.height}px -> ancho objetivo ${width}px`);
