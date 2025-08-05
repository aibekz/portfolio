import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="max-w-3xl mx-auto p-6 flex items-center justify-center">
        <p className="tracking-wide text-gray-300">
          git commit -m "<Link to="/" className="font-mono text-sm text-accent hover:underline">Built by {siteConfig.author.logo}</Link>"
        </p>
      </div>
    </footer>
  );
}
