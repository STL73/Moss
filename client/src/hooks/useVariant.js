import { useSyncExternalStore } from 'react';

/**
 * TEMPORARY, development only.
 *
 * Which component design is on screen. Exists so redesigned components can be
 * judged on the real pages, against the real catalogue and the real
 * photography, rather than in isolation — the same reason the palette
 * comparison was built as a control rather than a swatch grid.
 *
 * Delete this, VariantSwitcher.jsx, the loser of each pair and the dispatchers
 * once the choices are made.
 *
 * 'a' is always what currently ships. In a production build this hook is not
 * consulted at all: the dispatchers check import.meta.env.DEV first, so the
 * live site renders 'a' with no switching logic reachable.
 */
export const VARIANTS = ['a', 'b'];

const KEY = 'variant';

// Captured ONCE, when this module is first evaluated, and deliberately not
// re-read afterwards.
//
// The first version called this on every read, straight off
// window.location.search — which meant a pin lasted exactly until the first
// link click, because client-side navigation replaces the URL and drops the
// query string. The whole page silently fell back to variant A mid-comparison,
// and the symptom was components appearing to behave erratically rather than
// anything looking obviously broken.
//
// A module is not re-evaluated by an in-app navigation, so holding it here
// makes the pin last for the page view. It still does not touch storage, so
// driving or screenshotting the app never changes the variant the browser
// reopens on — which was the point of matching ThemeContext's `?theme=` in the
// first place.
const PINNED = (() => {
    const requested = new URLSearchParams(window.location.search).get(KEY);
    return VARIANTS.includes(requested) ? requested : null;
})();

const pinned = () => PINNED;

const read = () => {
    if (PINNED) return PINNED;
    try {
        const stored = window.localStorage.getItem(KEY);
        return VARIANTS.includes(stored) ? stored : 'a';
    } catch {
        return 'a';
    }
};

// Every dispatcher on the page has to re-render together when the variant
// changes, and they do not share a parent — the product grid, the filter bar
// and the cart drawer sit in different subtrees. A module-level subscription is
// what lets one control update all of them without threading a provider through
// the app for something temporary.
const listeners = new Set();

export const setVariant = (next) => {
    if (!VARIANTS.includes(next) || pinned()) return;
    try {
        window.localStorage.setItem(KEY, next);
    } catch {
        // Private browsing: the switch still works for this page view.
    }
    listeners.forEach((notify) => notify());
};

const subscribe = (notify) => {
    listeners.add(notify);
    return () => listeners.delete(notify);
};

export const useVariant = () => useSyncExternalStore(subscribe, read, () => 'a');

export const isPinned = () => Boolean(pinned());
