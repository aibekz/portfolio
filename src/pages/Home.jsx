import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="p-6 text-gray-900">
      <h1 className="text-6xl font-semibold font-mono mb-4">
        {siteConfig.author.greeting}
        <Link to="/about" className="hover:text-blue-600 underline ml-1">
          {siteConfig.author.name}
        </Link>
      </h1>

      <h2 className="text-6xl font-semibold font-mono mb-6 text-gray-800">
        {siteConfig.author.title}
      </h2>

      <p className="text-base md:text-lg max-w-xl font-mono leading-relaxed text-gray-600">
        {siteConfig.author.subtitle}
      </p>
    </div>
  );
}
