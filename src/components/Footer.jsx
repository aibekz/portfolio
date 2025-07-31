import { getCurrentYear } from '../utils';
import { siteConfig } from '../constants/siteConfig';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className="py-10">
      <div className="flex flex-col items-center space-y-3">
        <p className={`tracking-wide ${theme === 'dark' ? 'text-gray-300' : 'text-darktext'}`}>
          © {getCurrentYear()} <span className="font-mono">{siteConfig.author.logo}</span>
        </p>
      </div>
    </footer>
  );
}
