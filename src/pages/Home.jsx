import { siteConfig } from '../constants/siteConfig.js';
import { SEO_CONFIG, ANIMATION_CONFIG } from '../constants/index.js';
import SEO from '../components/SEO.jsx';
import TypewriterText from '../components/TypewriterText.jsx';

export default function Home() {
  return (
    <>
      <SEO 
        title={SEO_CONFIG.DEFAULT_TITLE}
        description={siteConfig.author.subtitle}
        url={siteConfig.url}
      />
      <div className="flex-1 flex items-center justify-center text-center px-6">
        <div className="text-primary">
          <h1 className="text-4xl font-semibold font-mono mb-4">
            <TypewriterText
              strings={[`${siteConfig.author.greeting}${siteConfig.author.name}`]}
              delay={ANIMATION_CONFIG.TYPEWRITER_DELAY}
              pauseFor={ANIMATION_CONFIG.TYPEWRITER_PAUSE}
              loop={true}
              deleteSpeed={ANIMATION_CONFIG.TYPEWRITER_DELETE_SPEED}
              className="inline-block"
            />
          </h1>

          <h2 className="text-4xl font-semibold font-mono mb-6 text-primary">
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
