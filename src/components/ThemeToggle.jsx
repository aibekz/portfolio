import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../contexts/ThemeContext.jsx';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2"
      style={{
        backgroundColor: 'transparent',
        ':hover': { backgroundColor: 'var(--hover-bg)' },
        ':focus': { 
          ringColor: isDarkMode ? 'var(--color-matrix-green)' : 'var(--color-linkblue)'
        }
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--hover-bg)'}
      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <HiSun className="w-5 h-5" style={{ color: 'var(--color-fg-light)' }} />
      ) : (
        <HiMoon className="w-5 h-5" style={{ color: 'var(--color-darktext)' }} />
      )}
    </button>
  );
};

export default ThemeToggle;
