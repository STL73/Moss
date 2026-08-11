import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import Nav from './Nav';

const renderNav = () =>
    render(
        <MemoryRouter>
            <ThemeProvider><Nav /></ThemeProvider>
        </MemoryRouter>
    );

describe('Nav', () => {
    beforeEach(() => {
        window.localStorage.clear();
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(),
        });
    });

    it('renders the primary links', () => {
        renderNav();
        expect(screen.getByRole('link', { name: 'Shop' })).toHaveAttribute('href', '/products');
    });

    it('opens the mobile menu when the toggle is pressed', async () => {
        const user = userEvent.setup();
        renderNav();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /open menu/i }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('closes the mobile menu on Escape', async () => {
        const user = userEvent.setup();
        renderNav();
        await user.click(screen.getByRole('button', { name: /open menu/i }));
        await user.keyboard('{Escape}');
        // AnimatePresence keeps the panel mounted until its exit animation
        // finishes, so the removal is asynchronous.
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });
});
