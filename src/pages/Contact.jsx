import { siteConfig } from '../constants/siteConfig';
import { formatEmail } from '../utils';
import SEO from '../components/SEO';
import { useState } from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineClipboard, HiOutlineClipboardCheck } from 'react-icons/hi'; // Heroicons

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleEmailClick = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getEmailIcon = () => {
    if (copied) return <HiOutlineClipboardCheck />;
    if (hovered) return <HiOutlineClipboard />;
    return <HiOutlineMail />;
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: getEmailIcon(),
      onClick: handleEmailClick,
      isCopy: true,
    },
    {
      name: 'LinkedIn',
      icon: <FaLinkedin />,
      href: siteConfig.linkedin,
    },
    {
      name: 'GitHub',
      icon: <FaGithub />,
      href: siteConfig.github,
    },
  ];

  return (
    <>
      <SEO 
        title="Contact - Aibek Z."
        description="Get in touch with Aibek Z for collaboration opportunities, project inquiries, or just to say hello."
        url={`${siteConfig.url}contact`}
      />
      <div className="flex-1">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <h1 className="text-header font-mono font-semibold mb-8 text-primary">
            Contact
          </h1>
<p className="text-body mb-6 leading-relaxed font-mono text-primary">
              I'm always interested in hearing about new opportunities, 
              collaborating on exciting projects, or just having a conversation 
              about technology and development.
            </p>
          <div className="space-y-6">
            {socialLinks.map((item) => (
              <div key={item.name}>
                {item.isCopy ? (
                  <button
                    onClick={item.onClick}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    className="flex items-center gap-2 font-mono text-body nav-link underline cursor-pointer"
                    title="Click to copy email to clipboard"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {copied ? "Copied!" : formatEmail(siteConfig.email)}
                  </button>
                ) : (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-mono text-body nav-link underline"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    {item.name}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
