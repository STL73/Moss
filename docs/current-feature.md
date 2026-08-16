# Current Feature

## Status

In Progress

## Goals

Close out the frontend redesign branch and get the storefront to a public URL.

The plan, and every decision made against it, lives in
[docs/plans/2026-08-16-remaining-work.md](plans/2026-08-16-remaining-work.md). Read that first —
it carries the reasoning, not just the outcome.

## Notes

All uncommitted on `feat/frontend-redesign-foundations`.

Done 2026-08-16, first half:

- **The hero is a two-shot camera move** — wide on the creek, cut at 45%, push in to the droplet.
- **Hero stats** replaced with claims that are true; the invented figures are deleted.
- **Eyebrow** replaced with a rule; the `eyebrow` prop is removed from `PageHeader`.
- **Touch targets** raised to 44px across nav, drawer, chips, stepper and product cards.
- **Two bugs Slav found**: the mobile menu had no background, and the sort dropdown was unreadable.

Done 2026-08-16, second half:

- **Responsive images.** `vite-imagetools` emits a width ladder per photograph and `Photo.jsx`
  wires `srcset`/`sizes`. Products page on a 1440 desktop: **1582 kB → 310 kB**. On a DPR-3 phone:
  **1582 kB → 876 kB**.
- **Route code-splitting.** Each route is its own chunk. Saves only **1.9 kB** — the budget turned
  out to be 93% framework — but it stops the bundle growing per route. Added
  `NavigationProgress.jsx`, because the split introduced 612ms of silence after a link click.
- **Skip link.** `SkipLink.jsx` before the nav; `<main>` is now `id="main" tabIndex={-1}`.
- **The Add button** on a product card, reported by Slav as blending in both states. It was moving
  by 1.13:1 in dark and 1.04:1 in light. New `--control` token; now 5.87:1 and 4.98:1.

**161 tests, lint clean, production build green.**

## Still open

The PR description and the deploy. Nothing blocks either.

Smaller, decided but not done:

- **~20 orphaned `.webp` files** plus `brand/hero.webp` and `mossCreek.webp`, about 4 MB, no longer
  imported by anything. `mossCloseup.jpg` must stay — it is `mossDolly`'s master.
- **`motion` is 43.9 kB gzipped**, 30% of the JS budget. `LazyMotion` could cut ~20 kB but needs
  every animated component touched. Undecided.

`client/src/lab/` is **gone** — built, consumed and deleted on 2026-08-16, as it was always meant
to be. Its `?theme=` hook in `ThemeContext` stays: pinning a route to a theme by URL without
touching `localStorage` is useful any time the app is driven or screenshotted.

## Resolved, no longer blockers

The unverified copy in `Story.jsx` — "gathered under licence", "plant-based glycerin", "Nordic" —
is **placeholder, not a risk**. Slav confirmed 2026-08-16: the business has not started, the moss
will come from a supplier whose process he does not yet know, and this repo is practice. Real
copy, real photography and any UI changes follow once trading begins.

## History

- 2026-08-16 — plan written, `/lab` built and consumed; hero, stats, eyebrow, touch targets, two
  bug fixes, responsive images, code-splitting, skip link and the Add button all landed.
