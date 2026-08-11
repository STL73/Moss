import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        });
    });

    it('is a real button with an accessible name', () => {
        render(<ThemeProvider><ThemeToggle /></ThemeProvider>);
        expect(screen.getByRole('button', { name: /switch to light theme/i })).toBeInTheDocument();
    });

    it('updates its label after toggling', async () => {
        const user = userEvent.setup();
        render(<ThemeProvider><ThemeToggle /></ThemeProvider>);
        await user.click(screen.getByRole('button'));
        expect(screen.getByRole('button', { name: /switch to dark theme/i })).toBeInTheDocument();
    });
});
