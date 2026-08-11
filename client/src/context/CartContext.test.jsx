import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { CartProvider, useCart } from './CartContext';

const sample = { id: '1', slug: 'kivi-sphere', name: 'Kivi Sphere', price: 8500, images: ['a.jpg'] };

let cart;

const Probe = () => {
    cart = useCart();
    return <span data-testid="count">{cart.itemCount}</span>;
};

const setup = () => render(<CartProvider><Probe /></CartProvider>);

describe('CartContext', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('starts empty', () => {
        setup();
        expect(screen.getByTestId('count')).toHaveTextContent('0');
        expect(cart.total).toBe(0);
    });

    it('adds an item', () => {
        setup();
        act(() => cart.addItem(sample));
        expect(cart.itemCount).toBe(1);
        expect(cart.total).toBe(8500);
    });

    it('increments quantity when the same item is added twice', () => {
        setup();
        act(() => cart.addItem(sample));
        act(() => cart.addItem(sample));
        expect(cart.items).toHaveLength(1);
        expect(cart.itemCount).toBe(2);
        expect(cart.total).toBe(17000);
    });

    it('sets an explicit quantity', () => {
        setup();
        act(() => cart.addItem(sample));
        act(() => cart.setQuantity('1', 3));
        expect(cart.itemCount).toBe(3);
    });

    it('removes an item when quantity drops to zero', () => {
        setup();
        act(() => cart.addItem(sample));
        act(() => cart.setQuantity('1', 0));
        expect(cart.items).toHaveLength(0);
    });

    it('removes an item explicitly', () => {
        setup();
        act(() => cart.addItem(sample));
        act(() => cart.removeItem('1'));
        expect(cart.items).toHaveLength(0);
    });

    it('clears the cart', () => {
        setup();
        act(() => cart.addItem(sample));
        act(() => cart.clear());
        expect(cart.items).toHaveLength(0);
    });

    it('persists to localStorage', () => {
        setup();
        act(() => cart.addItem(sample));
        const stored = JSON.parse(window.localStorage.getItem('cart'));
        expect(stored).toHaveLength(1);
        expect(stored[0].quantity).toBe(1);
    });

    it('rehydrates from localStorage', () => {
        window.localStorage.setItem('cart', JSON.stringify([{ ...sample, quantity: 2 }]));
        setup();
        expect(cart.itemCount).toBe(2);
    });
});
