import { describe, it, expect } from 'vitest';
import { getProducts, getProduct } from './api';

describe('api', () => {
    it('returns every product', async () => {
        const result = await getProducts();
        expect(result).toHaveLength(8);
        expect(result[0]).toHaveProperty('slug');
    });

    it('filters by category', async () => {
        const result = await getProducts({ category: 'wall-art' });
        expect(result).toHaveLength(2);
        expect(result.every((p) => p.category === 'wall-art')).toBe(true);
    });

    it('treats the "all" category as no filter', async () => {
        const result = await getProducts({ category: 'all' });
        expect(result).toHaveLength(8);
    });

    it('sorts by price ascending', async () => {
        const result = await getProducts({ sort: 'price-asc' });
        expect(result[0].price).toBeLessThanOrEqual(result[1].price);
    });

    it('returns one product by slug', async () => {
        const result = await getProduct('lampi-jar');
        expect(result.name).toBe('Lampi Jar');
    });

    it('rejects for an unknown slug', async () => {
        await expect(getProduct('does-not-exist')).rejects.toThrow('Product not found');
    });
});
