import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="max-w-3xl mx-auto p-6 flex flex-col items-center justify-center space-y-4">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} {siteConfig.author.name}
        </p>
      </div>
    </footer>
  );
}
