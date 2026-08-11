import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import FilterBar from './FilterBar';

const props = {
    active: 'all',
    onCategoryChange: vi.fn(),
    sort: 'newest',
    onSortChange: vi.fn(),
    count: 8,
};

describe('FilterBar', () => {
    it('marks the active category', () => {
        render(<FilterBar {...props} />);
        expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
        expect(screen.getByRole('button', { name: 'Wreaths' })).toHaveAttribute('aria-pressed', 'false');
    });

    it('reports a category change', async () => {
        const onCategoryChange = vi.fn();
        const user = userEvent.setup();
        render(<FilterBar {...props} onCategoryChange={onCategoryChange} />);
        await user.click(screen.getByRole('button', { name: 'Wall Art' }));
        expect(onCategoryChange).toHaveBeenCalledWith('wall-art');
    });

    it('shows the item count', () => {
        render(<FilterBar {...props} />);
        expect(screen.getByText('8 pieces')).toBeInTheDocument();
    });

    it('reports a sort change', async () => {
        const onSortChange = vi.fn();
        const user = userEvent.setup();
        render(<FilterBar {...props} onSortChange={onSortChange} />);
        await user.selectOptions(screen.getByLabelText('Sort by'), 'price-asc');
        expect(onSortChange).toHaveBeenCalledWith('price-asc');
    });
});
