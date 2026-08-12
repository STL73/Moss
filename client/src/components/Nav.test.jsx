import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ThemeProvider } from '../context/ThemeContext';
import { CartProvider } from '../context/CartContext';
import { navLinks } from '../constants';
import Nav from './Nav';

const navLinkCount = navLinks.length;

const renderNav = () =>
    render(
        <MemoryRouter>
            <ThemeProvider>
                <CartProvider><Nav /></CartProvider>
            </ThemeProvider>
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

    // aria-modal="true" is a claim the browser does not enforce; without a trap
    // keyboard users tab straight out into the inert page behind the overlay.
    it('keeps Tab inside the mobile menu', async () => {
        const user = userEvent.setup();
        renderNav();
        await user.click(screen.getByRole('button', { name: /open menu/i }));

        const close = screen.getByRole('button', { name: /close menu/i });
        await user.tab();
        expect(close).toHaveFocus();

        // Tab through every link, then once more off the end.
        for (let i = 0; i < navLinkCount + 1; i += 1) await user.tab();
        expect(close).toHaveFocus();
    });

    it('returns focus to the toggle when the menu closes', async () => {
        const user = userEvent.setup();
        renderNav();

        const toggle = screen.getByRole('button', { name: /open menu/i });
        await user.click(toggle);
        await user.click(screen.getByRole('button', { name: /close menu/i }));

        await waitFor(() => expect(toggle).toHaveFocus());
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
