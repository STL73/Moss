import { useSyncExternalStore } from 'react';
import { MOTION_PRESETS, getMotionPreset, subscribeMotionPreset } from '../lib/motion';

/**
 * The preset currently in force, as the object rather than the name.
 *
 * useSyncExternalStore rather than useState + an effect because the store lives
 * outside React and can be written by the dev switcher at any time; this is the
 * hook React provides for exactly that, and it does not tear under concurrent
 * rendering.
 *
 * The snapshot is the preset *name* — a string, so it is referentially stable
 * and the store does not have to hand back the same object identity each time.
 */
export const useMotionPreset = () =>
    MOTION_PRESETS[useSyncExternalStore(subscribeMotionPreset, getMotionPreset, getMotionPreset)];
