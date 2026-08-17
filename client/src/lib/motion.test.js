import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    MOTION_PRESETS,
    DEFAULT_PRESET,
    PRODUCT_PHOTO_VT,
    applyMotionPreset,
    getMotionPreset,
    setMotionPreset,
    subscribeMotionPreset,
} from './motion';

describe('motion presets', () => {
    beforeEach(() => {
        setMotionPreset(DEFAULT_PRESET);
    });

    it('gives every preset the same shape', () => {
        const names = Object.keys(MOTION_PRESETS);
        expect(names).toEqual(['quiet', 'deliberate', 'cinematic']);

        names.forEach((name) => {
            const preset = MOTION_PRESETS[name];
            expect(typeof preset.duration).toBe('number');
            expect(typeof preset.shift).toBe('number');
            expect(Array.isArray(preset.ease)).toBe(true);
            expect(preset.ease).toHaveLength(4);
        });
    });

    it('ships quiet as the default', () => {
        expect(DEFAULT_PRESET).toBe('quiet');
        expect(getMotionPreset()).toBe('quiet');
    });

    // The CSS rules and the JS reveal have to read the same numbers. This is
    // the seam where they could drift apart, so it is asserted.
    it('writes the active preset onto the document element as custom properties', () => {
        applyMotionPreset('cinematic');

        const style = document.documentElement.style;
        expect(style.getPropertyValue('--motion-duration')).toBe('520ms');
        expect(style.getPropertyValue('--motion-shift')).toBe('40px');
        expect(style.getPropertyValue('--motion-ease')).toBe('cubic-bezier(0.16, 1, 0.3, 1)');
    });

    it('notifies subscribers when the preset changes', () => {
        const listener = vi.fn();
        const unsubscribe = subscribeMotionPreset(listener);

        setMotionPreset('deliberate');

        expect(listener).toHaveBeenCalledOnce();
        expect(getMotionPreset()).toBe('deliberate');

        unsubscribe();
        setMotionPreset('quiet');
        expect(listener).toHaveBeenCalledOnce();
    });

    it('ignores a preset name it does not know', () => {
        setMotionPreset('nonsense');
        expect(getMotionPreset()).toBe('quiet');
    });

    it('exports one shared name for the product photograph', () => {
        expect(PRODUCT_PHOTO_VT).toBe('product-photo');
    });
});
