import { siteConfig } from '../constants/siteConfig';
import { useEffect } from 'react';

const SEO = ({ 
  title, 
  description = siteConfig.description, 
  url = siteConfig.url,
  image = siteConfig.ogImage,
  type = 'website'
}) => {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Helper function to update or create meta tags
    const updateMetaTag = (selector, content, property = 'content') => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          element.setAttribute('property', selector.match(/property="([^"]+)"/)[1]);
        } else if (selector.includes('name=')) {
          element.setAttribute('name', selector.match(/name="([^"]+)"/)[1]);
        }
        document.head.appendChild(element);
      }
      element.setAttribute(property, content);
    };

    // Update meta tags
    updateMetaTag('meta[name="description"]', description);
    updateMetaTag('meta[name="author"]', siteConfig.name);
    
    // Open Graph tags
    updateMetaTag('meta[property="og:title"]', fullTitle);
    updateMetaTag('meta[property="og:description"]', description);
    updateMetaTag('meta[property="og:url"]', url);
    updateMetaTag('meta[property="og:type"]', type);
    updateMetaTag('meta[property="og:site_name"]', siteConfig.name);
    
    if (image) {
      updateMetaTag('meta[property="og:image"]', image);
    }
    
    // Twitter Card tags
    updateMetaTag('meta[name="twitter:card"]', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', fullTitle);
    updateMetaTag('meta[name="twitter:description"]', description);
    
    if (image) {
      updateMetaTag('meta[name="twitter:image"]', image);
    }

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

  }, [fullTitle, description, url, image, type]);

  // This component doesn't render anything
  return null;
};

export default SEO;
