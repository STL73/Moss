import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, useViewTransitionState } from 'react-router';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from './ProductCard';

// ProductCard calls useViewTransitionState, which asserts it is inside a data
// router — these tests render through MemoryRouter, which is not one. Only that
// hook is replaced; the rest of react-router stays real, so Link, useLocation
// and the routing these tests actually exercise behave normally.
vi.mock('react-router', async (importOriginal) => ({
    ...(await importOriginal()),
    useViewTransitionState: vi.fn(() => false),
}));

const product = {
    id: '1', slug: 'glass-sphere', name: 'Glass Sphere', species: 'Cladonia stellaris',
    price: 8500, images: ['a.jpg'], category: 'moss-pots', stock: 6, isAvailable: true,
};

const renderCard = (onAdd = vi.fn(), props = {}) =>
    render(<MemoryRouter><ProductCard product={product} onAdd={onAdd} {...props} /></MemoryRouter>);

describe('ProductCard', () => {
    beforeEach(() => window.localStorage.clear());

    it('links to the product page', () => {
        renderCard();
        expect(screen.getByRole('link', { name: /glass sphere/i })).toHaveAttribute('href', '/products/glass-sphere');
    });

    // The product page reads this query back into its breadcrumb, so a customer
    // who filters, opens a piece and goes back lands on the list they left
    // rather than the full catalogue.
    it('carries the current filter query into the product link', () => {
        render(
            <MemoryRouter initialEntries={['/products?category=wreaths&sort=price-asc']}>
                <ProductCard product={product} onAdd={vi.fn()} />
            </MemoryRouter>
        );

        expect(screen.getByRole('link', { name: /glass sphere/i }))
            .toHaveAttribute('href', '/products/glass-sphere?category=wreaths&sort=price-asc');
    });

    it('shows the formatted price', () => {
        renderCard();
        expect(screen.getByText('£85.00')).toBeInTheDocument();
    });

    it('shows the species', () => {
        renderCard();
        expect(screen.getByText('Cladonia stellaris')).toBeInTheDocument();
    });

    it('calls onAdd without navigating', async () => {
        const onAdd = vi.fn();
        const user = userEvent.setup();
        renderCard(onAdd);
        await user.click(screen.getByRole('button', { name: /add glass sphere/i }));
        expect(onAdd).toHaveBeenCalledWith(product);
    });

    it('gives the image meaningful alt text', () => {
        renderCard();
        expect(screen.getByAltText('Glass Sphere')).toBeInTheDocument();
    });

    // An <a> may not contain interactive descendants. The card stays clickable
    // via a stretched pseudo-element on the title link instead.
    it('keeps the add button outside the link', () => {
        renderCard();
        const link = screen.getByRole('link', { name: /glass sphere/i });
        const addButton = screen.getByRole('button', { name: /add glass sphere/i });
        expect(link.contains(addButton)).toBe(false);
    });

    // The whole shared-element morph rests on exactly one photograph carrying
    // the name at a time. Two would abort the transition outright, and the
    // failure is silent — the page just changes with no animation — so it is
    // asserted here rather than left to a browser check.
    describe('the shared product photograph', () => {
        it('names the photograph while a transition involves this card', () => {
            vi.mocked(useViewTransitionState).mockReturnValue(true);

            renderCard();

            expect(screen.getByAltText('Glass Sphere')).toHaveStyle({
                viewTransitionName: 'product-photo',
            });
        });

        it('leaves the photograph unnamed the rest of the time', () => {
            vi.mocked(useViewTransitionState).mockReturnValue(false);

            renderCard();

            expect(screen.getByAltText('Glass Sphere').style.viewTransitionName).toBe('');
        });

        // Related products on the detail page sit alongside the gallery, which
        // is itself named. Without this opt-out both would carry the name and
        // the transition would abort.
        it('never names the photograph when sharing is switched off', () => {
            vi.mocked(useViewTransitionState).mockReturnValue(true);

            renderCard(vi.fn(), { sharePhoto: false });

            expect(screen.getByAltText('Glass Sphere').style.viewTransitionName).toBe('');
        });
    });
});
