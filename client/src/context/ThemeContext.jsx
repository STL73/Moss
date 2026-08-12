import { useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeContext } from '../hooks/useTheme';

// Dark is the design default. A stored choice always wins; otherwise we follow
// the OS, falling back to dark when the OS expresses no preference.
const systemPreference = () =>
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('theme', systemPreference());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // Crossfading a whole page is the browser's job, not CSS's. Transitioning
    // the colour properties instead would mean putting a transition on every
    // element on the page, which is a well-known jank source and repaints the
    // lot. The View Transitions API takes one snapshot and crossfades it on the
    // compositor, so the cost is the same whether the page has ten elements or
    // ten thousand.
    //
    // Unsupported browsers and anyone who has asked for less motion get the
    // instant swap, which is exactly the old behaviour.
    const withTransition = useCallback((swap) => {
        if (typeof document.startViewTransition !== 'function' || prefersReducedMotion()) {
            swap();
            return;
        }

        // startViewTransition captures the "before" frame, then expects the
        // callback to have applied the change by the time it returns. React
        // batches by default, so without flushSync the snapshot would be taken
        // and released before the theme attribute ever changed.
        document.startViewTransition(() => flushSync(swap));
    }, []);

    const toggleTheme = useCallback(
        () => withTransition(() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))),
        [withTransition, setTheme]
    );

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
