import { getCurrentYear } from '../utils';
import { siteConfig } from '../constants/siteConfig';

export default function Footer() {
  return (
    <footer className="py-10">
      <div className="flex flex-col items-center space-y-3">
        <p className="tracking-wide">
          © {getCurrentYear()} <span className="font-mono">{siteConfig.author.logo}</span>
        </p>
      </div>
    </footer>
  );
}
