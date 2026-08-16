# Current Feature

## Status

In Progress

## Goals

Close out the frontend redesign branch and get the storefront to a public URL.

The plan, and every decision made against it, lives in
[docs/plans/2026-08-16-remaining-work.md](plans/2026-08-16-remaining-work.md). Read that first —
it carries the reasoning, not just the outcome.

## Where things stand

Everything below is **committed and pushed**. Working tree clean, **165 tests**, lint clean,
production build green.

`feat/frontend-redesign-foundations` is 56 commits ahead of `main`, and
[PR #1](https://github.com/STL73/Moss/pull/1) is open with a full description.

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

1. **Merge PR #1 into `main`.** `main` is 56 commits behind the branch.
2. **Deploy to Cloudflare Pages** — root directory `client`, build `npm run build`, output `dist`.
   No `_redirects` needed: Pages auto-detects an SPA when there is no top-level `404.html`. Verify
   a deep link on the live URL to confirm. Use `moss.spireforge.co.uk` or the free `*.pages.dev`.
3. **Product photography.** Prompt pack ready at
   `outputs/product-image-prompts_2026-08-16_v1.md` — eight prompts sharing one house-style block
   so the grid reads as one catalogue. Generating them restores the two removed products and the
   wreaths category.

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

## History

- 2026-08-16 — plan written, `/lab` built and consumed then deleted; hero, stats, eyebrow, touch
  targets, two bug fixes, responsive images, code-splitting, skip link, the Add button, the footer
  credit and the image cull all landed. The repo was deleted and recreated to purge a real phone
  number and two photographs of real people from public history — see the brain page.
