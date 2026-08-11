import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeContext';

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
});
