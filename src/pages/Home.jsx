import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import TypewriterText from '../components/TypewriterText';

export default function Home() {
  return (
    <>
      <SEO 
        title="Aibek Z. - Software Developer"
        description={siteConfig.author.subtitle}
        url={siteConfig.url}
      />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div className="text-theme">
          <h1 className="text-4xl font-semibold font-mono mb-4">
            <TypewriterText
              strings={[`Hi. I'm ${siteConfig.author.name}`]}
              delay={75}
              pauseFor={4000}
              loop={true}
              deleteSpeed={30}
              className="inline-block"
            />
          </h1>

          <h2 className="text-4xl font-semibold font-mono mb-6 text-theme">
            {siteConfig.author.title}
          </h2>

          <p className="text-body max-w-xl mx-auto font-mono leading-relaxed mb-6 text-theme">
            {siteConfig.author.subtitle}
          </p>

          <Link 
            to="/about" 
            className="nav-link focus:outline-none focus:ring-2 focus:ring-offset-2 rounded font-mono text-body"
            aria-label={`Learn more about ${siteConfig.author.name}`}
          >
            Learn more about me →
          </Link>
        </div>
      </div>
    </>
  );
}
