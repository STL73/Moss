import { LuSun, LuMoon } from 'react-icons/lu';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
    const next = theme === 'dark' ? 'light' : 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${next} theme`}
            className="p-2 rounded-full text-text-muted hover:text-text
                       transition-colors duration-200 cursor-pointer"
        >
            {theme === 'dark' ? <LuSun size={18} /> : <LuMoon size={18} />}
        </button>
    );
};

export default ThemeToggle;
