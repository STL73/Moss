import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import PageHeader from './PageHeader';

describe('PageHeader', () => {
    it('renders eyebrow, title and accent word', () => {
        render(<PageHeader eyebrow="All pieces" title="The" accent="collection" />);
        expect(screen.getByText('All pieces')).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('The collection');
    });

    it('renders a lead paragraph when given', () => {
        render(<PageHeader title="The" accent="collection" lead="Preserved Nordic moss." />);
        expect(screen.getByText('Preserved Nordic moss.')).toBeInTheDocument();
    });
});
