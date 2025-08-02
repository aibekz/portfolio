import SEO from '../components/SEO';
import { siteConfig } from '../constants/siteConfig';

export default function Works() {
  const worksDescription = "Explore the works of Aibek Zhumabekov, a full-stack developer passionate about building meaningful web applications.";

  return (
    <>
      <SEO
        title="Works - Aibek Z."
        description={worksDescription}
        url={`${siteConfig.url}works`}
      />
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="space-y-8">
            <div className="">
              <h1 className="text-header font-bold font-mono mb-3 text-primary">
                Works
              </h1>
              <p className="text-body mb-8 font-mono text-primary">
                Coming soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
