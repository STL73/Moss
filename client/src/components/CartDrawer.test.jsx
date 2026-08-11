import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider } from '../context/CartContext';
import { useCart } from '../hooks/useCart';
import CartDrawer from './CartDrawer';

const sample = {
    id: '1', slug: 'kivi-sphere', name: 'Kivi Sphere', species: 'Cladonia stellaris',
    price: 8500, images: ['a.jpg'],
};

const Trigger = () => {
    const { addItem } = useCart();
    return <button onClick={() => addItem(sample)}>trigger add</button>;
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

    it('opens when an item is added', async () => {
        const user = userEvent.setup();
        setup();
        await user.click(screen.getByText('trigger add'));
        expect(screen.getByRole('dialog', { name: /basket/i })).toBeInTheDocument();
        expect(screen.getByText('Kivi Sphere')).toBeInTheDocument();
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
});
