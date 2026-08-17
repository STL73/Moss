/**
 * The site's motion vocabulary, as data.
 *
 * Two consumers read the same numbers and would otherwise drift apart: the
 * view-transition rules in index.css, which need CSS values, and Reveal, which
 * needs numbers Motion can interpolate. Storing the numbers once and deriving
 * the CSS from them is what keeps a 180ms page transition and a 180ms section
 * reveal actually the same 180ms.
 *
 * `duration` is milliseconds because CSS wants milliseconds; Reveal divides by
 * 1000, because Motion wants seconds. `ease` is the control points of a cubic
 * bezier, which both sides can express.
 *
 * No stagger. The product grid is the only place one would have applied, and a
 * grid that deals itself out card by card makes a page feel slower than it is.
 */
export const MOTION_PRESETS = {
    // Noticeable as smoothness rather than as an effect, and short enough that
    // it cannot make a navigation feel slower than it already is.
    quiet: { duration: 180, shift: 10, ease: [0.16, 1, 0.3, 1] },
    // Visible direction. A reader registers a designed transition.
    deliberate: { duration: 320, shift: 24, ease: [0.16, 1, 0.3, 1] },
    // The hero's camera language applied to the whole page.
    cinematic: { duration: 520, shift: 40, ease: [0.16, 1, 0.3, 1] },
};

export const DEFAULT_PRESET = 'quiet';

/**
 * The shared name for the product photograph that morphs from a card into the
 * detail page.
 *
 * One generic name rather than one per slug, and deliberately so: two elements
 * holding the same view-transition-name at the same moment abort the entire
 * transition, so exactly one photograph is ever allowed to carry it. Which one
 * is decided by useViewTransitionState — see ProductCard.
 */
export const PRODUCT_PHOTO_VT = 'product-photo';

const toCssEase = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;

/**
 * Writes a preset onto the document element.
 *
 * The defaults also live in index.css on :root, so production never has to call
 * this — the CSS is correct before any JavaScript runs. This exists for the
 * dev-only switcher, and goes when the switcher goes.
 */
export const applyMotionPreset = (name) => {
    const preset = MOTION_PRESETS[name];
    if (!preset) return;

    const { style } = document.documentElement;
    style.setProperty('--motion-duration', `${preset.duration}ms`);
    style.setProperty('--motion-shift', `${preset.shift}px`);
    style.setProperty('--motion-ease', toCssEase(preset.ease));
};

// A three-line store rather than a Context: Reveal is the only subscriber, and
// a provider around the whole tree would be more machinery to unpick when the
// switcher is deleted.
let current = DEFAULT_PRESET;
const listeners = new Set();

export const getMotionPreset = () => current;

export const subscribeMotionPreset = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
};

export const setMotionPreset = (name) => {
    if (!MOTION_PRESETS[name]) return;
    current = name;
    applyMotionPreset(name);
    listeners.forEach((listener) => listener());
};
