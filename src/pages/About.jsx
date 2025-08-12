import React, { Suspense, lazy } from 'react';
import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';
import { Link } from 'react-router-dom';

const DigitalRain = lazy(() => import('../components/DigitalRain'));

export default function About() {
  const aboutDescription = "Learn more about Aibek Zhumabekov, a full-stack developer passionate about building meaningful web applications.";

  return (
    <>
      <SEO
        title="About — Aibek Zhumabekov"
        description={aboutDescription}
        url={`${siteConfig.url}about`}
      />
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="mb-8">
            <div className="h-[500px] rounded-lg bg-gradient-to-br from-slate-900 to-slate-800">
              <Suspense fallback={<div className="w-full h-full bg-black" />}>
                <DigitalRain />
              </Suspense>
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-accent text-sm md:text-base mb-6 text-center font-mono bg-black p-4">
              &gt; Hello, I'm a software engineer based in USA!<span className="blinking-cursor">_</span>
            </p>
            <div className="flex flex-col md:flex-row items-start my-12 gap-6">
              <div className="flex-1 text-left">
                <h1 className="text-2xl font-bold font-mono text-primary mb-2">
                  {siteConfig.name}
                </h1>
                <p className="text-lg font-mono text-primary">
                  Software Engineer (Frontend Developer)
                </p>
              </div>

              <div className="relative w-28 h-28 mx-auto md:mx-0">
                <div className="w-28 h-28 overflow-hidden rounded-full">
                  <img
                    src="/img/aibek.webp"
                    alt="Aibek"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 border-2 border-black rounded-full"></div>
              </div>
            </div>

            <section className="prose prose-lg max-w-none">
              <div>
                <p className="text-body leading-relaxed mb-4 font-mono text-primary">
                  Aibek is a software engineer based in Texas, mainly focused on frontend development. He is passionate about building meaningful, engaging, accessible, and user-centric web applications. He has a knack for launching products—from planning and design to solving real-life problems with code.
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
