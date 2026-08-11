// Image optimiser. Run with: npm run images
//
// Source photography is kept as-is — those files are the client's masters and
// several are 6000px+ straight off a camera. This writes web-sized .webp
// siblings next to them, and the asset barrel imports only those. Re-running
// is safe: every output is overwritten from its source.
import sharp from 'sharp';
import { mkdir, readdir, stat } from 'node:fs/promises';

const IMAGES_DIR = 'src/assets/images';
const BRAND_DIR = 'src/assets/brand';

// Nothing renders wider than roughly 700 CSS px (the product-detail gallery on
// a 1440px layout), so 1400 covers a 2x display with room to spare.
const MAX_WIDTH = 1400;
const QUALITY = 78;

await mkdir(BRAND_DIR, { recursive: true });
// public/ is not in the repo yet — the touch icon below is its first occupant.
await mkdir('public', { recursive: true });

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

// Hero: 2000px wide is ample for a 15% Ken Burns zoom on a 4K display.
const hero = await sharp(`${BRAND_DIR}/Design-10.png`)
    .resize(2000, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(`${BRAND_DIR}/hero.webp`);

console.log(`hero.webp  ${kb(hero.size)}  ${hero.width}x${hero.height}`);

// iOS home-screen icon. Safari still ignores SVG favicons, so the logo is
// rasterised once at 180px on the dark background colour.
const LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#121815"/>
  <path d="M26.2 16.5 A10.2 10.2 0 1 1 16 6.3" stroke="#a3bfa8" stroke-width="1.8"
        stroke-linecap="round" fill="none"/>
  <path d="M9 18 Q9.9 13.8 11.9 15.9 Q13.2 12 15.2 15 Q16.8 11.4 18.8 14.8
           Q20.6 13 21.9 16.4 Q22.7 15.4 23 18 Q23.9 19.4 24.14 21
           A9.3 9.3 0 0 1 7.86 21 Q8.1 19.4 9 18 Z" fill="#a3bfa8"/>
  <circle cx="21.6" cy="9.6" r="2" fill="#a3bfa8" opacity="0.85"/>
</svg>`;

await sharp(Buffer.from(LOGO)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
console.log('apple-touch-icon.png  180x180');

// Product and moss photography.
const sources = (await readdir(IMAGES_DIR)).filter((file) => /\.(jpe?g|png)$/i.test(file));

let before = 0;
let after = 0;

for (const file of sources) {
    const source = `${IMAGES_DIR}/${file}`;
    const target = `${IMAGES_DIR}/${file.replace(/\.(jpe?g|png)$/i, '.webp')}`;

    const { size } = await stat(source);
    const result = await sharp(source)
        .resize(MAX_WIDTH, null, { withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(target);

    before += size;
    after += result.size;

    console.log(
        `${file.padEnd(20)} ${kb(size).padStart(8)} -> ${kb(result.size).padStart(7)}` +
        `  ${result.width}x${result.height}`
    );
}

const saved = ((1 - after / before) * 100).toFixed(1);
console.log(
    `\n${sources.length} photos: ${(before / 1024 / 1024).toFixed(1)} MB -> ` +
    `${(after / 1024 / 1024).toFixed(1)} MB (${saved}% smaller)`
);
