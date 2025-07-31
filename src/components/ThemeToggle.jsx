import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext.jsx';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle p-2 rounded-lg focus:outline-none focus:ring-2"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <HiSun className="w-5 h-5 icon-theme" />
      ) : (
        <HiMoon className="w-5 h-5 icon-theme" />
      )}
    </button>
  );
};

export default ThemeToggle;
