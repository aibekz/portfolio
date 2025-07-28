import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import DigitalRain from '../components/DigitalRain';
import { Link } from 'react-router-dom';

export default function About() {
  const aboutDescription = "Learn more about Aibek Zhumabekov, a full-stack developer passionate about building meaningful web applications.";

  return (
    <>
      <SEO
        title="About"
        description={aboutDescription}
        url={`${siteConfig.url}about`}
      />
      <div className="px-6 py-20 max-w-4xl mx-auto">
        <div className="mb-8">
          <div style={{ height: '500px' }} className="rounded-lg bg-gradient-to-br from-slate-900 to-slate-800">
            <DigitalRain />
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="">
            <p className="text-body mb-6 text-darktext text-center font-mono">
              Hello, I'm a software developer based in the USA!
            </p>
            <h1 className="text-header font-bold font-mono mb-3 text-darktext">
              {siteConfig.name}
            </h1>
            <p className="text-body mb-8 text-darktext font-mono">
              Digital Craftsman ( Artist / Developer / Designer )
            </p>
          </div>

          <section className="prose prose-lg max-w-none">
            <div>
              <h2 className="text-header font-semibold mb-4 text-darktext font-mono">About</h2>
              <p className="text-body leading-relaxed text-darktext mb-4 font-mono">
                Aibek is a full-stack developer based in Austin, TX, passionate about building meaningful,
                engaging, accessible, and user-centric web applications. He has a knack for launching products—from planning and design to solving real-world problems through code.
              </p>
              <p className="text-body leading-relaxed text-darktext mb-4 font-mono">
                His approach combines technical expertise with creative problem-solving, ensuring that
                every project not only functions flawlessly but also delivers an exceptional user experience.
              </p>
              <p className="text-body leading-relaxed text-darktext mb-6 font-mono">
                Aibek also writes tech-related <Link to="/posts" className='text-linkblue underline'>Posts</Link> sharing insights, 
                tutorials, and thoughts on software development, emerging technologies, and industry trends.
              </p>
              <p className="text-body leading-relaxed text-darktext mb-4 font-mono">
                When he's not online, he enjoys spending time behind the lens with his camera.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
