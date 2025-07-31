import { siteConfig } from '../constants/siteConfig';
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
        <div className="text-primary">
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
