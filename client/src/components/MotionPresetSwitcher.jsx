import { useEffect } from 'react';
import { MOTION_PRESETS, DEFAULT_PRESET, getMotionPreset, setMotionPreset } from '../lib/motion';
import { useMotionPreset } from '../hooks/useMotionPreset';

const STORAGE_KEY = 'moss:motion-preset';

/**
 * Dev-only. Flips the site between the three motion presets so the loudness of
 * the page transitions gets chosen by looking at the real site rather than by
 * describing it in a document.
 *
 * Delete this file, the hook, the store in lib/motion.js and the two losing
 * presets once the choice is made.
 *
 * It is rendered behind import.meta.env.DEV in RootLayout, so Vite removes the
 * whole branch from the production build — the same arrangement PaletteSwitcher
 * used, which is why the shipped bundle never carried it.
 */
const MotionPresetSwitcher = () => {
    const active = useMotionPreset();

    // Restored on mount rather than held in React state, because the preset
    // outlives the component: a reload during a comparison should not silently
    // put the site back to the default and make the last thing judged the wrong
    // one.
    useEffect(() => {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (stored) setMotionPreset(stored);
    }, []);

    const choose = (name) => {
        setMotionPreset(name);
        window.localStorage.setItem(STORAGE_KEY, getMotionPreset());
    };

    return (
        <div className="fixed bottom-4 left-4 z-100 flex items-center gap-1 rounded-full
                        border border-border bg-surface/90 p-1 text-xs backdrop-blur-md">
            {Object.entries(MOTION_PRESETS).map(([name, preset]) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => choose(name)}
                    className={`rounded-full px-3 py-1.5 cursor-pointer transition-colors duration-150 ${
                        active === preset ? 'bg-accent text-on-accent' : 'text-text-muted hover:text-text'
                    }`}
                >
                    {name} <span className="opacity-60">{preset.duration}ms</span>
                </button>
            ))}
            <button
                type="button"
                onClick={() => {
                    window.localStorage.removeItem(STORAGE_KEY);
                    setMotionPreset(DEFAULT_PRESET);
                }}
                className="rounded-full px-2 py-1.5 text-text-muted hover:text-text cursor-pointer"
                aria-label="Reset the motion preset"
            >
                ×
            </button>
        </div>
    );
};

export default MotionPresetSwitcher;
