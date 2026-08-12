import { useId } from 'react';

// Eight rays at 45 degree steps, drawn from the disc outward.
const RAYS = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * Math.PI) / 4;
    return {
        x1: 12 + Math.cos(angle) * 8,
        y1: 12 + Math.sin(angle) * 8,
        x2: 12 + Math.cos(angle) * 10.5,
        y2: 12 + Math.sin(angle) * 10.5,
    };
});

/**
 * A sun or a moon, drawn from one disc.
 *
 * These deliberately do not morph into each other. An earlier version animated
 * between the two shapes, which looked good and was wrong: the sun means light
 * and the moon means dark, so a sun that turns into a moon makes the control
 * state a falsehood halfway through. The motion in the toggle is travel only.
 *
 * The crescent is a masked-out circle rather than a second path, so both shapes
 * share one geometry and stay optically consistent.
 */
const SunMoon = ({ shape, size = 18 }) => {
    // Masks are referenced by id, so two of these on one page would collide.
    const maskId = useId();
    const isMoon = shape === 'moon';

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        >
            {isMoon && (
                <defs>
                    <mask id={maskId}>
                        {/* White keeps, black removes. */}
                        <rect x="0" y="0" width="24" height="24" fill="white" />
                        <circle cx="18" cy="6" r="8" fill="black" />
                    </mask>
                </defs>
            )}

            <circle
                cx="12"
                cy="12"
                // The moon has no rays, so its disc carries the whole icon and
                // has to be larger to keep the optical weight even.
                r={isMoon ? 9 : 5}
                fill="currentColor"
                stroke="none"
                mask={isMoon ? `url(#${maskId})` : undefined}
            />

            {!isMoon && (
                <g>
                    {RAYS.map((ray) => (
                        <line key={`${ray.x1}-${ray.y1}`} {...ray} />
                    ))}
                </g>
            )}
        </svg>
    );
};

export default SunMoon;
