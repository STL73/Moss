import { readFileSync } from 'node:fs';
import { describe, it, expect } from 'vitest';

// This suite guards the palette itself rather than any component. Contrast is a
// property of the token values, so asserting it here catches a regression at
// the point it is introduced instead of in whichever component notices first.

// Relative to the client root, which is where Vitest runs. import.meta.url is
// not a file URL under Vite's transform, and process is not in scope for the
// browser-targeted ESLint config, so a plain relative path is the way in.
const css = readFileSync('src/index.css', 'utf-8');

// Pull the custom properties out of a given selector block.
const tokensIn = (selector) => {
    const block = css.slice(css.indexOf(selector));
    const body = block.slice(block.indexOf('{') + 1, block.indexOf('}'));
    return Object.fromEntries(
        [...body.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]])
    );
};

const channel = (value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

const contrast = (a, b) => {
    const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
    return (x + 0.05) / (y + 0.05);
};

const themes = { dark: tokensIn(':root'), light: tokensIn('[data-theme="light"]') };

describe('palette contrast', () => {
    it.each(['dark', 'light'])('reads the %s palette from index.css', (name) => {
        expect(themes[name].bg).toMatch(/^#[0-9a-f]{6}$/i);
    });

    // WCAG 2.1 SC 1.4.11: boundaries that identify a control need 3:1. The
    // outline Button, filter chips, sort select, quantity stepper and footer
    // socials are all identified by nothing but their border.
    describe.each(['dark', 'light'])('%s theme', (name) => {
        const t = () => themes[name];

        it.each(['bg', 'surface', 'raised'])(
            'interactive borders clear 3:1 against --%s',
            (surface) => {
                expect(contrast(t()['border-interactive'], t()[surface])).toBeGreaterThanOrEqual(3);
            }
        );

        it('hover borders are at least as strong as the resting state', () => {
            expect(contrast(t().accent, t().surface))
                .toBeGreaterThanOrEqual(contrast(t()['border-interactive'], t().surface));
        });

        it.each(['bg', 'surface'])('body text clears 4.5:1 against --%s', (surface) => {
            expect(contrast(t().text, t()[surface])).toBeGreaterThanOrEqual(4.5);
        });

        it.each(['bg', 'surface'])('muted text clears 4.5:1 against --%s', (surface) => {
            expect(contrast(t()['text-muted'], t()[surface])).toBeGreaterThanOrEqual(4.5);
        });

        it('button labels clear 4.5:1 against the accent fill', () => {
            expect(contrast(t()['on-accent'], t().accent)).toBeGreaterThanOrEqual(4.5);
        });
    });
});
