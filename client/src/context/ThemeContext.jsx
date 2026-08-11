import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ThemeContext } from '../hooks/useTheme';

// Dark is the design default. A stored choice always wins; otherwise we follow
// the OS, falling back to dark when the OS expresses no preference.
const systemPreference = () =>
    window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useLocalStorage('theme', systemPreference());

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
