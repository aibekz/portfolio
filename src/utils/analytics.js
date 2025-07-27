// Google Analytics utility functions

/**
 * Track a custom event
 * @param {string} action - The action that was performed
 * @param {string} category - The category of the event
 * @param {string} label - Optional label for the event
 * @param {number} value - Optional numeric value for the event
 */
export const trackEvent = (action, category, label = null, value = null) => {
  if (typeof window.gtag !== 'undefined') {
    const eventParams = {
      event_category: category,
      event_label: label,
      value: value,
    };

    // Remove null values
    Object.keys(eventParams).forEach(key => {
      if (eventParams[key] === null) {
        delete eventParams[key];
      }
    });

    window.gtag('event', action, eventParams);
  }
};

/**
 * Track page view manually (useful for dynamic content)
 * @param {string} pagePath - The page path to track
 * @param {string} pageTitle - Optional page title
 */
export const trackPageView = (pagePath, pageTitle = null) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-2GTTL0NPD1', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

/**
 * Track contact form submission
 */
export const trackContactForm = () => {
  trackEvent('submit', 'contact', 'contact_form');
};

/**
 * Track external link clicks
 * @param {string} url - The external URL that was clicked
 */
export const trackExternalLink = (url) => {
  trackEvent('click', 'external_link', url);
};

/**
 * Track file downloads
 * @param {string} fileName - The name of the downloaded file
 */
export const trackDownload = (fileName) => {
  trackEvent('download', 'file', fileName);
};
