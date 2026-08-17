import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { useCart } from '../hooks/useCart';
import CartDrawer from './CartDrawer';

const sample = {
    id: '1', slug: 'glass-sphere', name: 'Glass Sphere', species: 'Cladonia stellaris',
    price: 8500, images: ['a.jpg'],
};

const Trigger = () => {
    const { addItem, removeItem, openDrawer } = useCart();
    return (
        <>
            <button onClick={() => addItem(sample)}>trigger add</button>
            {/* Removing from outside the panel keeps the clicked button mounted,
                so focus afterwards is attributable to the drawer, not to the
                button vanishing from under the cursor. */}
            <button onClick={() => removeItem(sample.id)}>trigger remove</button>
            {/* What the basket icon in Nav does: opens the panel regardless of
                whether anything is in it. */}
            <button onClick={openDrawer}>trigger open</button>
        </>
    );
};

const setup = () =>
    render(
        <MemoryRouter>
            <CartProvider>
                <Trigger />
                <CartDrawer />
            </CartProvider>
        </MemoryRouter>
    );

describe('CartDrawer', () => {
    beforeEach(() => window.localStorage.clear());

    it('is closed initially', () => {
        setup();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    // Nav opens this panel whether or not anything is in the basket. Until
    // 2026-08-17 an empty one rendered a blank space between the header and a
    // "Subtotal £0.00" footer, above a button leading to /cart — which is also
    // empty. A dead end reached in one click from every page on the site.
    describe('with an empty basket', () => {
        it('says the basket is empty and offers a way out', async () => {
            const user = userEvent.setup();
            setup();
            await user.click(screen.getByText('trigger open'));

            expect(screen.getByRole('dialog', { name: /basket/i })).toBeInTheDocument();
            expect(screen.getByText(/basket is empty/i)).toBeInTheDocument();
            expect(screen.getByRole('link', { name: /browse the collection/i })).toBeInTheDocument();
        });

        it('hides the subtotal and the checkout path', async () => {
            const user = userEvent.setup();
            setup();
            await user.click(screen.getByText('trigger open'));

            expect(screen.queryByText(/subtotal/i)).not.toBeInTheDocument();
            expect(screen.queryByRole('link', { name: /view basket/i })).not.toBeInTheDocument();
        });
    });

    it('opens when an item is added', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));
        expect(screen.getByRole('dialog', { name: /basket/i })).toBeInTheDocument();
        expect(screen.getByText('Glass Sphere')).toBeInTheDocument();
        expect(screen.queryByText(/basket is empty/i)).not.toBeInTheDocument();
    });

    // AnimatePresence keeps the panel mounted until its exit animation
    // finishes, so every close assertion has to wait for the removal.
    it('closes on the close button', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));
        await user.click(screen.getByRole('button', { name: /close basket/i }));
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('closes on Escape', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));
        await user.keyboard('{Escape}');
        await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    });

    it('shows the running total', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));
        expect(screen.getByText('£85.00')).toBeInTheDocument();
    });

    it('moves focus into the panel when it opens', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));
        expect(screen.getByRole('dialog', { name: /basket/i })).toHaveFocus();
    });

    it('returns focus to whatever opened it', async () => {
        const user = userEvent.setup();
        setup();

        const trigger = screen.getByText('trigger add');
        await user.click(trigger);
        await user.click(screen.getByRole('button', { name: /close basket/i }));

        await waitFor(() => expect(trigger).toHaveFocus());
    });

    // The panel focuses itself on open. If the context hands back a fresh
    // closeDrawer on every cart change, that effect re-runs and drags focus
    // back to the panel mid-interaction — every removal, and again when the
    // toast clears.
    it('does not pull focus back to the panel when the cart changes', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));

        const removeTrigger = screen.getByText('trigger remove');
        await user.click(removeTrigger);

        expect(removeTrigger).toHaveFocus();
        expect(screen.getByRole('dialog', { name: /basket/i })).not.toHaveFocus();
    });
});
