import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import DigitalRain from '../components/DigitalRain';
import { Link } from 'react-router-dom';

export default function About() {
  const aboutDescription = "Learn more about Aibek Zhumabekov, a full-stack developer passionate about building meaningful web applications.";

  return (
    <>
      <SEO
        title="About - Aibek Z."
        description={aboutDescription}
        url={`${siteConfig.url}about`}
      />
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="h-[500px] rounded-lg bg-gradient-to-br from-slate-900 to-slate-800">
              <DigitalRain />
            </div>
          </div>

          <div className="space-y-8">
            <div className="">
              <p className="text-body mb-6 text-center font-mono text-primary">
                Hello, I'm a software engineer based in USA!
              </p>
              <h1 className="text-header font-bold font-mono mb-3 text-primary">
                {siteConfig.name}
              </h1>
              <p className="text-body mb-8 font-mono text-primary">
                Software Engineer ( Front-end Developer )
              </p>
            </div>

            <section className="prose prose-lg max-w-none">
              <div>
                <p className="text-body leading-relaxed mb-4 font-mono text-primary">
                  Aibek is a software engineer based in Texas, mainly focused on front-end development. He is passionate about building meaningful, engaging, accessible, and user-centric web applications. He has a knack for launching products—from planning and design to solving real-life problems with code.
                </p>
                <p className="text-body leading-relaxed mb-4 font-mono text-primary">
                  His approach combines technical expertise with creative problem-solving, ensuring that
                  every project not only functions flawlessly but also delivers an exceptional user experience.
                </p>
                <p className="text-body leading-relaxed mb-6 font-mono text-primary">
                  Aibek also writes tech-related <Link
                    to="/posts"
                    className='text-accent hover:underline'
                  >posts</Link> sharing insights,
                  tutorials, and thoughts on software development, emerging technologies, and industry trends.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
