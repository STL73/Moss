import { flushSync } from 'react-dom';
import { useVariant, setVariant, isPinned } from '../hooks/useVariant';

/**
 * TEMPORARY, development only. Flips every redesigned component between the
 * version that ships and the proposed one, on whatever page you are looking at.
 *
 * Deliberately unstyled beyond the minimum, and deliberately monospace: it must
 * not be mistaken for part of the design being judged. The palette switcher it
 * replaces made that mistake — it used the brand's own tokens and read as a
 * component of the site.
 *
 * Delete with useVariant.js, the dispatchers and whichever variant loses.
 */
const LABELS = {
    a: 'Current',
    b: 'Redesigned',
};

const VariantSwitcher = () => {
    const variant = useVariant();
    const pinned = isPinned();

    const choose = (next) => {
        if (next === variant) return;
        // Same reasoning as ThemeContext: startViewTransition snapshots the
        // frame before the callback and expects the change to have been applied
        // by the time it returns, and React batches by default.
        if (typeof document.startViewTransition !== 'function') {
            setVariant(next);
            return;
        }
        document.startViewTransition(() => flushSync(() => setVariant(next)));
    };

    return (
        <div
            className="fixed bottom-6 left-6 z-30 flex items-center gap-1 rounded-full
                       border border-white/25 bg-black/85 p-1 font-mono text-xs text-white/90
                       backdrop-blur-sm"
        >
            {Object.entries(LABELS).map(([id, label]) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => choose(id)}
                    disabled={pinned}
                    aria-pressed={id === variant}
                    className={`min-h-9 cursor-pointer rounded-full px-3 transition-colors duration-200
                                disabled:cursor-not-allowed
                                ${id === variant ? 'bg-white text-black' : 'hover:bg-white/15'}`}
                >
                    {label}
                </button>
            ))}
            {pinned && <span className="px-2 text-white/50">URL</span>}
        </div>
    );
};

export default VariantSwitcher;
