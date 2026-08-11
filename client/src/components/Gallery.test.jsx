import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Gallery from './Gallery';

const images = ['one.jpg', 'two.jpg'];

describe('Gallery', () => {
    it('shows the first image by default', () => {
        render(<Gallery images={images} alt="Lampi Jar" />);
        expect(screen.getByAltText('Lampi Jar')).toHaveAttribute('src', 'one.jpg');
    });

    it('switches image when a thumbnail is chosen', async () => {
        const user = userEvent.setup();
        render(<Gallery images={images} alt="Lampi Jar" />);
        await user.click(screen.getByRole('button', { name: /view image 2/i }));
        expect(screen.getByAltText('Lampi Jar')).toHaveAttribute('src', 'two.jpg');
    });

    it('marks the active thumbnail', async () => {
        const user = userEvent.setup();
        render(<Gallery images={images} alt="Lampi Jar" />);
        await user.click(screen.getByRole('button', { name: /view image 2/i }));
        expect(screen.getByRole('button', { name: /view image 2/i })).toHaveAttribute('aria-pressed', 'true');
    });
});
