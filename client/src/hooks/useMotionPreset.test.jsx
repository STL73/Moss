import { describe, it, expect, afterEach } from 'vitest';
import { act } from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { useMotionPreset } from './useMotionPreset';
import { setMotionPreset, DEFAULT_PRESET, MOTION_PRESETS } from '../lib/motion';

const Probe = () => {
    const preset = useMotionPreset();
    return <span data-testid="duration">{preset.duration}</span>;
};

describe('useMotionPreset', () => {
    afterEach(() => {
        cleanup();
        setMotionPreset(DEFAULT_PRESET);
    });

    it('returns the active preset object, not its name', () => {
        render(<Probe />);
        expect(screen.getByTestId('duration')).toHaveTextContent(String(MOTION_PRESETS.quiet.duration));
    });

    it('re-renders the consumer when the preset changes', () => {
        render(<Probe />);

        act(() => setMotionPreset('cinematic'));

        expect(screen.getByTestId('duration')).toHaveTextContent(String(MOTION_PRESETS.cinematic.duration));
    });
});
