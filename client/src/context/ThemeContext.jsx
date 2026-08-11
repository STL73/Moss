import { createContext, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext(null);

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

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used inside a ThemeProvider');
    return context;
};
