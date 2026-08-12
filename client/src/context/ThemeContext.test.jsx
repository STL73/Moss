import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from './ThemeContext';
import { useTheme } from '../hooks/useTheme';

const Probe = () => {
    const { theme, toggleTheme } = useTheme();
    return <button onClick={toggleTheme}>{theme}</button>;
};

const renderWithProvider = () =>
    render(
        <ThemeProvider>
            <Probe />
        </ThemeProvider>
    );

describe('ThemeContext', () => {
    beforeEach(() => {
        window.localStorage.clear();
        document.documentElement.removeAttribute('data-theme');
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        });
    });

    it('defaults to dark when nothing is stored', () => {
        renderWithProvider();
        expect(screen.getByRole('button')).toHaveTextContent('dark');
    });

    it('uses the stored preference', () => {
        window.localStorage.setItem('theme', JSON.stringify('light'));
        renderWithProvider();
        expect(screen.getByRole('button')).toHaveTextContent('light');
    });

    it('toggles and writes the attribute to the document', () => {
        renderWithProvider();
        act(() => screen.getByRole('button').click());
        expect(screen.getByRole('button')).toHaveTextContent('light');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });

    // jsdom has no startViewTransition, so the tests above already prove the
    // unsupported-browser path works. These cover the rest of the matrix.
    describe('view transition', () => {
        const withViewTransitions = () => {
            const spy = vi.fn((callback) => {
                callback();
                return { finished: Promise.resolve(), ready: Promise.resolve() };
            });
            document.startViewTransition = spy;
            return spy;
        };

        it('crossfades the swap where the browser supports it', () => {
            const spy = withViewTransitions();
            renderWithProvider();

            act(() => screen.getByRole('button').click());

            expect(spy).toHaveBeenCalledOnce();
            expect(screen.getByRole('button')).toHaveTextContent('light');
            expect(document.documentElement.getAttribute('data-theme')).toBe('light');

            delete document.startViewTransition;
        });

        // Animating a whole-page colour change is exactly what someone with a
        // vestibular trigger has asked not to see.
        it('swaps instantly when reduced motion is requested', () => {
            const spy = withViewTransitions();
            window.matchMedia = vi.fn().mockImplementation((query) => ({
                matches: query.includes('reduced-motion'),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
            }));
            renderWithProvider();

            act(() => screen.getByRole('button').click());

            expect(spy).not.toHaveBeenCalled();
            expect(screen.getByRole('button')).toHaveTextContent('light');

            delete document.startViewTransition;
        });
    });
});
