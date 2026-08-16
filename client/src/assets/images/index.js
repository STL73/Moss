// Only the photographs the storefront actually renders. Anything exported
// here is emitted into the production bundle whether a component uses it or
// not, which is how 61 MB of unused camera-original JPEGs ended up shipping.
//
// Each import goes through vite-imagetools (wired in vite.config.js), which
// resizes and re-encodes the master at build time and returns
// `{ src, srcset, w, h }`. `src` is the widest variant and the fallback; `srcset`
// lists every width. Render them through <Photo>, which needs a `sizes` telling
// the browser how wide the image will actually be drawn — without it the
// browser assumes 100vw and downloads the largest file every time.
//
// Widths are chosen per use, not per photo:
//   240   cart thumbnails (64–96 CSS px at 2x)
//   480   product cards on a phone
//   960   product cards on a desktop grid (424 CSS px at 2x)
//   1400  the product-detail gallery (722 CSS px at 2x)
//   1920+ full-bleed backdrops and the hero stage
//
// The `.jpg` masters are the source of truth. The `.webp` siblings that
// `npm run images` used to produce are no longer imported by anything — the
// plugin does that job now, per width, at build time.
//
// The query has to be written out on every line: Vite resolves import
// specifiers statically, so a shared constant would never be read.

// The creek. Also the hero's opening shot, which is why it carries widths the
// other product photographs do not: the hero stage is full-bleed and the plate
// is scaled to 1.3 on the way in.
//
// 1600 is the top rung rather than the master's full 2000, because the hand-cut
// `mossCreek.webp` this replaces was 1600 too — a pixel-identical export of this
// same file — and a 2000px encode measured 439 kB against its 318 kB. A desktop
// hero should not get heavier in a change made to lighten it.
import moss1 from './moss1.jpg?w=240;480;960;1400;1600&as=img';
import moss3 from './moss3.jpg?w=240;480;960;1400&as=img';
import moss5 from './moss5.jpg?w=240;480;960;1400&as=img';
import moss7 from './moss7.jpg?w=240;480;960;1400&as=img';
import moss8 from './moss8.jpg?w=640;1280;1920&as=img';
// The wide arrangement — log, dried craspedia, layered moss. It is the only
// photograph of a finished piece in its setting, which is what "Our process"
// is describing; moss1, which used to sit there, moved to the hero.
import mossHero from './mossHero.jpg?w=640;1280;1920&as=img';
// The droplet macro — the hero's second shot. A 3:2 crop cut by hand from
// mossCloseup.jpg on 2026-08-16. The crop box was never written down, so the
// .webp is the only thing that reproduces this framing and it is treated as the
// source. 2160 is its full width and the push-in reaches 1.75, so nothing
// narrower would stay sharp at the end of the move.
//
// quality 85 rather than the site-wide 78: encoding from that .webp makes every
// variant a second lossy pass, where every other photograph gets one from its
// master. It is also the shot the push-in arrives at, where the detail is the
// point. The extra bytes buy back what the second pass costs.
import mossDolly from './mossDolly.webp?w=768;1080;1440;2160&quality=85&as=img';
import product1 from './product1.jpg?w=240;480;960;1400&as=img';
import product2 from './product2.jpg?w=240;480;960;1400&as=img';
import product3 from './product3.jpg?w=240;480;960;1400&as=img';
import product4 from './product4.jpg?w=240;480;960;1400&as=img';

export {
  moss1,
  moss3,
  mossHero,
  moss8,
  moss5,
  moss7,
  mossDolly,
  product1,
  product2,
  product3,
  product4,
};
