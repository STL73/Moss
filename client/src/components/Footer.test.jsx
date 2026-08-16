import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

const renderFooter = () => render(<MemoryRouter><Footer /></MemoryRouter>);

describe('Footer', () => {
    it('credits the studio with a link that actually goes there', () => {
        renderFooter();

        const credit = screen.getByRole('link', { name: /spireforge/i });
        expect(credit).toHaveAttribute('href', 'https://spireforge.co.uk');
    });

    // The shop's own line and the build credit are different statements. Merged
    // into one sentence the credit reads as part of the shop's copy.
    it('keeps the shop line and the build credit apart', () => {
        renderFooter();

        expect(screen.getByText(/handmade in manchester/i)).toBeInTheDocument();
        expect(screen.getByText(/site by/i)).toBeInTheDocument();
    });

    it('shows the current year in the copyright', () => {
        renderFooter();

        expect(screen.getByText(new RegExp(`${new Date().getFullYear()} MossArt`))).toBeInTheDocument();
    });
});
