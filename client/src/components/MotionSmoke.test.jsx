import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { motion, AnimatePresence } from 'motion/react';

// Smoke test: confirms Motion resolves and renders under React 19 + Vitest/jsdom.
// Deleted once real animated components carry their own coverage.
describe('motion/react', () => {
    it('renders a motion element', () => {
        render(<motion.div animate={{ opacity: 1 }}>Living texture</motion.div>);
        expect(screen.getByText('Living texture')).toBeInTheDocument();
    });

    it('renders children inside AnimatePresence', () => {
        render(
            <AnimatePresence>
                <motion.div key="a" exit={{ opacity: 0 }}>Basket</motion.div>
            </AnimatePresence>
        );
        expect(screen.getByText('Basket')).toBeInTheDocument();
    });
});
