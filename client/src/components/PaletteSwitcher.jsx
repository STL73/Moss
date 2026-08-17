import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * TEMPORARY, development only.
 *
 * Flips `data-palette` on the document so the candidate schemes in
 * palettes.css can be judged on the real site — behind the real photography,
 * on a real product grid — rather than as swatches. A palette that reads well
 * as ten rectangles routinely falls apart the moment a photograph sits next to
 * it, which is the entire reason this exists as a control rather than a
 * mood board.
 *
 * Delete all three of these together once a palette is chosen: this file,
 * palettes.css, and the line in RootLayout.
 *
 * Theme is not duplicated here. The nav already has a working light/dark
 * control and `?theme=` already pins one for screenshots, so this only owns
 * the axis that does not yet have a control.
 */

// Every palette has a string id, including the shipping one. The first draft
// gave Sage `id: null` to mean "no attribute", which silently broke the whole
// control: URLSearchParams.get() also returns null when a parameter is absent,
// so the "is this a known palette?" check matched Sage on every plain page
// load, and the stored choice was overridden by a phantom URL pin on every
// render. Clicks wrote to localStorage and were discarded immediately.
//
// SAGE is still special at the DOM end — it removes the attribute rather than
// setting data-palette="sage" — so the default path is exercised exactly as it
// ships, through a selector that will still exist once this file is gone.
const SAGE = 'sage';

// Cut from five candidates to two on 2026-08-17. Both are Nordic and identical
// in dark; they exist only to disagree about the light theme, so switching
// between them with the site in dark mode should show no change whatsoever.
const PALETTES = [
    { id: SAGE, label: 'Sage', note: 'current — near-white light' },
    { id: 'nordic', label: 'Nordic', note: 'light: grey page, blue cards' },
    { id: 'nordic-blue', label: 'Nordic Blue', note: 'light: blue page, grey cards' },
];

const isKnown = (id) => PALETTES.some((palette) => palette.id === id);

// Matches the `?theme=` override in ThemeContext: a palette pinned by URL does
// not touch storage, so driving or screenshotting the app never changes the one
// the browser reopens on. Returns null when nothing valid is pinned, which is
// now unambiguous because no palette is identified by null.
const forcedPalette = () => {
    const requested = new URLSearchParams(window.location.search).get('palette');
    return isKnown(requested) ? requested : null;
};

const PaletteSwitcher = () => {
    const [stored, setStored] = useLocalStorage('palette', SAGE);
    const [open, setOpen] = useState(false);

    const pinned = forcedPalette();
    // A value stored before this component existed, or by an older build, can
    // be anything at all — including the null the first draft wrote.
    const active = pinned ?? (isKnown(stored) ? stored : SAGE);

    useEffect(() => {
        const root = document.documentElement;
        if (active === SAGE) root.removeAttribute('data-palette');
        else root.setAttribute('data-palette', active);
    }, [active]);

    // The same crossfade the theme toggle uses, including the flushSync that
    // makes it work. startViewTransition captures the "before" frame and
    // expects the callback to have applied the change by the time it returns;
    // React batches by default, so without flushSync the snapshot is taken and
    // released before the attribute ever changes and the swap does not animate.
    const choose = (id) => {
        if (pinned) return; // URL wins; clicking would write a choice nothing reads.
        if (typeof document.startViewTransition !== 'function') {
            setStored(id);
            return;
        }
        document.startViewTransition(() => flushSync(() => setStored(id)));
    };

    const current = PALETTES.find((palette) => palette.id === active);

    return (
        <div className="fixed bottom-6 left-6 z-30 font-body text-sm">
            {open && (
                <ul className="mb-2 rounded-xl border border-border-interactive bg-raised p-1.5 shadow-lg">
                    {PALETTES.map((palette) => (
                        <li key={palette.id}>
                            <button
                                type="button"
                                onClick={() => choose(palette.id)}
                                aria-current={palette.id === active}
                                disabled={Boolean(pinned)}
                                className={`flex w-full min-h-11 cursor-pointer items-center gap-3 rounded-lg px-3 text-left
                                    transition-colors duration-200 hover:bg-surface disabled:cursor-not-allowed
                                    ${palette.id === active ? 'text-accent-strong' : 'text-text'}`}
                            >
                                <span className="w-12 font-medium">{palette.label}</span>
                                <span className="text-xs text-text-muted">{palette.note}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                className="min-h-11 cursor-pointer rounded-full border border-border-interactive bg-raised
                    px-4 text-text transition-colors duration-200 hover:bg-surface"
            >
                Palette: <span className="text-accent-strong">{current.label}</span>
                {pinned && <span className="ml-2 text-xs text-text-muted">(pinned by URL)</span>}
            </button>
        </div>
    );
};

export default PaletteSwitcher;
