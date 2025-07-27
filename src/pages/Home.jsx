import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        description={siteConfig.author.subtitle}
        url={siteConfig.url}
      />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div className="text-gray-900">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-mono mb-4">
            {siteConfig.author.greeting}
            <Link 
              to="/about" 
              className="hover:text-linkblue underline ml-1 focus:outline-none focus:ring-2 focus:ring-linkblue focus:ring-offset-2 rounded"
              aria-label={`Learn more about ${siteConfig.author.name}`}
            >
              {siteConfig.author.name}
            </Link>
          </h1>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold font-mono mb-6 text-gray-800">
            {siteConfig.author.title}
          </h2>

          <p className="text-base md:text-lg max-w-xl mx-auto font-mono leading-relaxed text-gray-600">
            {siteConfig.author.subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
