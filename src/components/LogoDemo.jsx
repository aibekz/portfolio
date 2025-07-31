import { useTheme } from '../contexts/ThemeContext';
import DynamicLogo from './DynamicLogo';
import DynamicLogoCSS from './DynamicLogoCSS';

const LogoDemo = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-theme">Dynamic Logo Demo</h1>
        <p className="text-theme-muted mb-6">
          Current theme: <span className="font-semibold">{isDarkMode ? 'Dark' : 'Light'}</span>
        </p>
        <button 
          onClick={toggleTheme}
          className="px-4 py-2 bg-hover border border-theme rounded-lg text-theme hover:bg-opacity-80 transition-all"
        >
          Toggle Theme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-theme">React Hook Version</h2>
          <div className="flex justify-center">
            <DynamicLogo width={128} height={128} />
          </div>
          <p className="text-sm text-theme-muted">
            Uses useTheme hook to dynamically change colors
          </p>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold text-theme">CSS Variables Version</h2>
          <div className="flex justify-center">
            <DynamicLogoCSS width={128} height={128} />
          </div>
          <p className="text-sm text-theme-muted">
            Uses CSS custom properties for theme-aware styling
          </p>
        </div>
      </div>

      <div className="mt-8 p-4 border border-theme rounded-lg bg-hover">
        <h3 className="text-lg font-semibold text-theme mb-2">Color Scheme:</h3>
        <div className="space-y-2 text-sm text-theme">
          <p><strong>Dark Mode:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>Background: Black (#000)</li>
            <li>Text: Matrix Green (#39FF14)</li>
          </ul>
          <p><strong>Light Mode:</strong></p>
          <ul className="ml-4 space-y-1">
            <li>Background: White (#ffffff)</li>
            <li>Text: Black (#000000)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LogoDemo;
