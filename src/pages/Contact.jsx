import { siteConfig } from '../constants/siteConfig';
import { formatEmail } from '../utils';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

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
          <h1 className="text-header font-bold font-mono mb-8" style={{ color: 'var(--text-color)' }}>
            Get In Touch
          </h1>
          
          <div className="mb-8">
            <p className="text-body mb-6 leading-relaxed font-mono" style={{ color: 'var(--text-color)' }}>
              I'm always interested in hearing about new opportunities, 
              collaborating on exciting projects, or just having a conversation 
              about technology and development.
            </p>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-header font-semibold mb-2 font-mono" style={{ color: 'var(--text-color)' }}>Email</h2>
                <Link 
                  to={`mailto:${siteConfig.email}`}
                  className="font-mono text-body nav-link underline focus:outline-none focus:ring-2 focus:ring-offset-2 rounded"
                >
                  {formatEmail(siteConfig.email)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
