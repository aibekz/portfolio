import { siteConfig } from '../constants/siteConfig';
import { formatEmail } from '../utils';
import SEO from '../components/SEO';
import Button from '../components/ui/Button';

const Contact = () => {
  const contactDescription = "Get in touch with Aibek Zhumabekov for collaboration opportunities, project inquiries, or just to say hello.";
  
  return (
    <>
      <SEO 
        title="Contact"
        description={contactDescription}
        url={`${siteConfig.url}contact`}
      />
      <div className="flex-grow flex items-center justify-center px-6 py-16 sm:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-mono mb-8 text-gray-900">
            Get In Touch
          </h1>
          
          <div className="bg-gray-50 p-8 rounded-lg mb-8">
            <p className="text-lg mb-6 text-gray-700 leading-relaxed">
              I'm always interested in hearing about new opportunities, 
              collaborating on exciting projects, or just having a conversation 
              about technology and development.
            </p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-gray-900">Email</h2>
                <a 
                  href={`mailto:${siteConfig.email}`}
                  className="font-mono text-xl text-blue-600 hover:text-blue-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  aria-label={`Send email to ${siteConfig.email}`}
                >
                  {formatEmail(siteConfig.email)}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
