import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';

// The point of these assertions is the props handed to Motion, not the pixels —
// jsdom has no layout and no scrolling, so an intersection can never actually
// fire here. Standing motion.div up as a plain div lets the viewport config be
// inspected directly.
const captured = { viewport: null, initial: null };

vi.mock('motion/react', () => ({
    motion: {
        div: ({ children, className, viewport, initial }) => {
            captured.viewport = viewport;
            captured.initial = initial;
            return <div className={className}>{children}</div>;
        },
    },
}));

// A plain import is enough — vi.mock is hoisted above it by the transform.
import Reveal from './Reveal';

describe('Reveal', () => {
    afterEach(cleanup);

    it('renders its children', () => {
        render(<Reveal><p>Selected pieces</p></Reveal>);
        expect(screen.getByText('Selected pieces')).toBeInTheDocument();
    });

    // A section that re-animates every time it scrolls back into view turns a
    // page into a slideshow. Once is the whole behaviour, so it is pinned.
    it('animates once and never again', () => {
        render(<Reveal><p>Our process</p></Reveal>);
        expect(captured.viewport.once).toBe(true);
    });

    it('starts below its resting position by the preset shift', () => {
        render(<Reveal><p>Our process</p></Reveal>);
        expect(captured.initial).toEqual({ opacity: 0, y: 10 });
    });

    it('passes className through so the section keeps its own layout', () => {
        const { container } = render(<Reveal className="max-container"><p>x</p></Reveal>);
        expect(container.firstChild).toHaveClass('max-container');
    });
});
