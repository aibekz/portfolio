import { siteConfig } from '../constants/siteConfig';
import { formatEmail } from '../utils';
import SEO from '../components/SEO';
import { useState } from 'react';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const contactDescription = "Get in touch with Aibek Zhumabekov for collaboration opportunities, project inquiries, or just to say hello.";
  
  return (
    <>
      <SEO 
        title="Contact - Aibek Z."
        description={contactDescription}
        url={`${siteConfig.url}contact`}
      />
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-header font-mono font-semibold mb-8 text-primary">
            Contact
          </h1>
          
          <div>
            
            <p className="text-body mb-6 leading-relaxed font-mono text-primary">
              I'm always interested in hearing about new opportunities, 
              collaborating on exciting projects, or just having a conversation 
              about technology and development.
            </p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-header font-semibold mb-2 font-mono text-primary">Email</h3>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(siteConfig.email);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="font-mono text-body nav-link underline cursor-pointer"
                  title="Click to copy email to clipboard"
                >
                  {formatEmail(siteConfig.email)}
                </button>
                {copied && (
                  <p className="text-sm font-mono text-accent mt-2">
                    Email copied to clipboard!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
