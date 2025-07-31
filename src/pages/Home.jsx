import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Aibek Z. - Software Developer"
        description={siteConfig.author.subtitle}
        url={siteConfig.url}
      />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div style={{ color: 'var(--text-color)' }}>
          <h1 className="text-4xl font-semibold font-mono mb-4">
            {siteConfig.author.greeting}
            <Link 
              to="/about" 
              className="ml-1 nav-link focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
              aria-label={`Learn more about ${siteConfig.author.name}`}
            >
              {siteConfig.author.name}
            </Link>
          </h1>

          <h2 className="text-4xl font-semibold font-mono mb-6" style={{ color: 'var(--text-color)' }}>
            {siteConfig.author.title}
          </h2>

          <p className="text-body max-w-xl mx-auto font-mono leading-relaxed mb-6" style={{ color: 'var(--text-color)' }}>
            {siteConfig.author.subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
