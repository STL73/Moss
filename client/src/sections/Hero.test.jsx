import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PLACEHOLDER_STATS } from '../constants';
import Hero from './Hero';

const renderHero = () => render(<MemoryRouter><Hero /></MemoryRouter>);

const warning = () => screen.queryByTestId('placeholder-warning');

describe('Hero', () => {
    beforeEach(() => {
        window.matchMedia = vi.fn().mockReturnValue({
            matches: false, addEventListener: vi.fn(), removeEventListener: vi.fn(),
        });
    });

    afterEach(() => vi.unstubAllEnvs());

    it('renders the stats band', () => {
        renderHero();
        expect(screen.getByText(PLACEHOLDER_STATS[0].label)).toBeInTheDocument();
    });

    // These figures were never verified with the client. The marker exists so
    // they cannot be demoed or shipped without someone noticing.
    it('flags the stats as sample data in development', () => {
        vi.stubEnv('DEV', true);
        renderHero();
        expect(warning()).toBeInTheDocument();
    });

    // ...but a warning banner must never reach a customer.
    it('strips the marker from production builds', () => {
        vi.stubEnv('DEV', false);
        renderHero();

        expect(warning()).not.toBeInTheDocument();
        // The stats themselves still render - the marker is the only thing
        // conditional on the build mode.
        expect(screen.getByText(PLACEHOLDER_STATS[0].label)).toBeInTheDocument();
    });
});
