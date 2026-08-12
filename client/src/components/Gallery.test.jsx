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

    // Inspecting the product is the point of this component, so the zoom
    // cannot be mouse-only. An onClick on a bare <img> is unreachable by
    // keyboard and invisible to assistive tech.
    it('exposes the zoom as a keyboard-reachable control', async () => {
        const user = userEvent.setup();
        render(<Gallery images={images} alt="Lampi Jar" />);

        const zoom = screen.getByRole('button', { name: /zoom lampi jar/i });
        expect(zoom).toHaveAttribute('aria-pressed', 'false');

        await user.tab();
        expect(zoom).toHaveFocus();
    });

    it('toggles zoom from the keyboard', async () => {
        const user = userEvent.setup();
        render(<Gallery images={images} alt="Lampi Jar" />);

        const zoom = screen.getByRole('button', { name: /zoom lampi jar/i });
        zoom.focus();

        await user.keyboard('{Enter}');
        expect(zoom).toHaveAttribute('aria-pressed', 'true');

        await user.keyboard(' ');
        expect(zoom).toHaveAttribute('aria-pressed', 'false');
    });
});
