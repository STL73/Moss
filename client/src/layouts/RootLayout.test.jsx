import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi } from 'vitest';

// Stand MotionConfig up as a marker element so its props can be asserted. The
// real one only writes to context, which jsdom gives us no way to read back.
vi.mock('motion/react', async (importOriginal) => ({
    ...(await importOriginal()),
    MotionConfig: ({ reducedMotion, children }) => (
        <div data-testid="motion-config" data-reduced-motion={reducedMotion}>{children}</div>
    ),
}));

// The layout's children each pull in router and context dependencies that this
// test has no interest in; stub them so the assertion stays on the layout.
vi.mock('../components/Nav', () => ({ default: () => <nav /> }));
vi.mock('../components/Footer', () => ({ default: () => <footer /> }));
vi.mock('../components/CartDrawer', () => ({ default: () => null }));
vi.mock('../components/Toast', () => ({ default: () => null }));
vi.mock('../components/ScrollToHash', () => ({ default: () => null }));

const RootLayout = (await import('./RootLayout')).default;

describe('RootLayout', () => {
    it('hands the reduced-motion preference to every Motion animation', () => {
        render(<MemoryRouter><RootLayout /></MemoryRouter>);

        // "user" defers to the OS setting, which is what makes the JS-driven
        // animations honour prefers-reduced-motion. The CSS block in index.css
        // cannot reach them.
        expect(screen.getByTestId('motion-config')).toHaveAttribute('data-reduced-motion', 'user');
    });

    it('keeps the page content inside the reduced-motion boundary', () => {
        render(<MemoryRouter><RootLayout /></MemoryRouter>);

        expect(screen.getByTestId('motion-config')).toContainElement(screen.getByRole('main'));
    });
});
