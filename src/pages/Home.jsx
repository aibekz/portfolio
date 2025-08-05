import { Link } from 'react-router-dom';
import { siteConfig } from '../constants/siteConfig.js';
import { SEO_CONFIG, ANIMATION_CONFIG } from '../constants/index.js';
import SEO from '../components/SEO.jsx';
export default function Home() {
  return (
    <>
      <SEO 
        title={SEO_CONFIG.DEFAULT_TITLE}
        description={siteConfig.author.subtitle}
        url={siteConfig.url}
      />
      <div className="flex-1 flex items-center justify-center text-center">
        <div className="text-primary max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-2xl md:text-4xl font-semibold font-mono mb-4">
            {siteConfig.author.greeting}
            <Link to="/about" className="text-accent hover:underline">
              {siteConfig.author.name}
            </Link>
          </h1>

          <h2 className="text-2xl  md:text-4xl font-semibold font-mono mb-6 text-primary">
            {siteConfig.author.title}
          </h2>

          <p className="text-body max-w-xl mx-auto font-mono leading-relaxed mb-6 text-primary">
            {siteConfig.author.subtitle}
          </p>
        </div>
      </div>
    </>
  );
}
