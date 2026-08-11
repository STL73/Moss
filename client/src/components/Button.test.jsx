import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from './Button';

describe('Button', () => {
    it('renders the label', () => {
        render(<Button label="Shop now" />);
        expect(screen.getByRole('button', { name: 'Shop now' })).toBeInTheDocument();
    });

    it('applies the full-width class when fullWidth is true', () => {
        render(<Button label="Shop now" fullWidth />);
        expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('does not apply the full-width class by default', () => {
        render(<Button label="Shop now" />);
        expect(screen.getByRole('button')).not.toHaveClass('w-full');
    });
});
