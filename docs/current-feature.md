# Current Feature

## Status

In Progress

## Goals

Close out the frontend redesign branch and get the storefront to a public URL.

The plan, and every decision made against it, lives in
[docs/plans/2026-08-16-remaining-work.md](plans/2026-08-16-remaining-work.md). Read that first —
it carries the reasoning, not just the outcome.

## Where things stand

**174 tests**, lint clean, production build green at 115.30 kB gzipped. Committed but **not yet
pushed** as of 2026-08-17.

`feat/frontend-redesign-foundations` is ahead of `main`, and
[PR #1](https://github.com/STL73/Moss/pull/1) is open with a full description.

Done 2026-08-17:

- **Eighteen products across six categories**, three in each. Every one has a photograph of a made
  object. `wreaths` is back and `letters-signs` is new; the footer offers all six.
- **The photography is generated**, from `docs/product-image-prompts.md` through Cloudflare
  Workers AI. `npm run images:generate` renders the pack; `node scripts/contact-sheet.mjs` composes
  all eighteen into one sheet, which is the only way the consistency problem is visible.
- **Finnish product names are gone.** Kivi, Metsä, Rauha, Lampi, Aurora and Talvi meant nothing to
  a shopper. Names now describe what is in the frame and match the filename. Four files were
  renamed with them — `paleBowl`→`ceramicBowl`, `fernFrame`→`oakFrame` (no fern, ever),
  `mossLetter`→`mossLetterM`, `mossWord`→`mossSign`. The sign spelled KOTI and now spells HOME.
- **The Nordic palette ships**, measured out of `ceramicBowl.jpg` rather than designed, replacing
  the sage-green scheme. Dark accent is the ice-blue moss from that photograph; the light ground is
  the same blue at 16% saturation, well below the near-white the web defaults to. Chosen against
  four other candidates behind a temporary switcher, now deleted.
- **`--accent` and `--accent-strong` are split.** `--accent` is rendered as text, which caps how
  light it can be; a hover border wants the opposite. Trying to satisfy both had collapsed the chip
  hover to 1.01:1. Now 2.16× in light, 2.35× in dark.
- **Light-theme text read pale at nearly 13:1.** Cause was `-webkit-font-smoothing: antialiased` on
  the whole body — right for light-on-dark, wrong for dark-on-light. Now scoped to dark.

Done 2026-08-16:

- **The hero is a two-shot camera move** — wide on the creek, cut at 45%, push in to the droplet.
- **Hero stats, eyebrow, touch targets** — invented figures replaced with true claims, the shared
  eyebrow replaced with a rule, 44px targets across nav, drawer, chips, stepper and cards.
- **Two bugs Slav found** — the mobile menu had no background (`backdrop-filter` on an ancestor was
  capturing the fixed panel), and the sort dropdown was unreadable (now `appearance: base-select`).
- **Responsive images.** `vite-imagetools` emits a width ladder per photograph; `Photo.jsx` wires
  `srcset`/`sizes` and throws in dev without a `sizes`. Products page: **1582 kB → 310 kB** on a
  1440 desktop, **→ 876 kB** on a DPR-3 phone.
- **Route code-splitting.** Saves only **1.9 kB** — the budget is 93% framework — but it stops the
  bundle growing per route. Added `NavigationProgress.jsx`, because the split introduced 612ms of
  silence after a link click on Slow 4G.
- **Skip link.** `SkipLink.jsx` before the nav; `<main>` is `id="main" tabIndex={-1}`.
- **The Add button** was moving by 1.13:1 in dark and 1.04:1 in light — no visible change. New
  `--control` token; now 5.87:1 and 4.98:1. `tokens.test.js` gained an oklab implementation to
  measure a `color-mix`.
- **Footer** carries a Spireforge credit, mark and word in one anchor, linking to spireforge.co.uk.
- **Images renamed and culled.** Named for what is in the frame; 30 unused files deleted,
  **60 MB → 17 MB**.
- **Catalogue cut to six products**, every one showing a made object rather than scenery. Joki
  Stones, Havu Wreath and the `wreaths` category are out until there is photography for them.

## Still open

Slav chose **build first, deploy after** on 2026-08-17, so the deploy now sits behind the visual
work rather than in front of it.

1. **CTAs and components** — buttons, cards, chips and the cart drawer, against the new palette.
2. **Section and page transitions** — `motion` is already installed and already paid for.
3. **The cinematic hero.** Four beats — aerial over moss, dive, through water, the droplet — with a
   WebGL displacement warp on the dive. Needs two new photographs. **A literal flythrough is a
   video shot**: three.js is ~150 kB gzipped against a 115 kB budget, and no video-generation MCP is
   installed.
4. **Merge PR #1 into `main`**, then **deploy to Cloudflare Pages** — root directory `client`, build
   `npm run build`, output `dist`. No `_redirects` needed: Pages auto-detects an SPA when there is
   no top-level `404.html`. Verify a deep link on the live URL. Use `moss.spireforge.co.uk` or the
   free `*.pages.dev`.

Two shots to redo on a fresh neuron allocation:

- **`mossSign.jpg`** — letterforms are crude next to `mossLetterM.jpg`.
- **`mossTiles.jpg`** — the cream tile is right; the three green ones read as conifer fronds.

Smaller, decided but not done:

- **`motion` is 43.9 kB gzipped**, 30% of the JS budget. `LazyMotion` could cut ~20 kB but needs
  every animated component touched. Undecided.
- **Remove the `noindex`** in `client/index.html` on the day the shop is real. It is not a
  `robots.txt` Disallow on purpose — a disallow stops the crawl, so the tag never gets read.

## Not blockers

The placeholder copy in `Story.jsx` — "gathered under licence", "plant-based glycerin", "Nordic" —
is **placeholder, not a risk**. Slav confirmed 2026-08-16: the business has not started, the moss
will come from a supplier whose process he does not know, and this repo is practice. Real copy,
photography and any UI changes follow once trading begins. The contact phone and email are
deliberate placeholders too — the phone is from the range Ofcom reserves for fiction.

## What the image model taught us

All of it is written up in `docs/product-image-prompts.md`, but the expensive one is worth
repeating: **the house-style block must never outweigh the subject line.** A 350-word material
description placed before the subject cost eleven of eighteen images their object entirely — no
glass sphere, no frame, no letters, just a mound of moss on a table. Flat sheet moss was dropped as
a primary material for the same class of reason: the model cannot tell "a fine even mat" from a
lawn.

## History

- 2026-08-17 — eighteen products generated and wired in, Finnish names dropped, four files renamed,
  the Nordic palette built from a photograph, accent tokens split, and a font-smoothing bug found
  behind a complaint that light text "looked pale". Roughly 9,800 of the day's 10,000 free neurons
  spent across three full passes and two rounds of fixes.
- 2026-08-16 — plan written, `/lab` built and consumed then deleted; hero, stats, eyebrow, touch
  targets, two bug fixes, responsive images, code-splitting, skip link, the Add button, the footer
  credit and the image cull all landed. The repo was deleted and recreated to purge a real phone
  number and two photographs of real people from public history — see the brain page.
