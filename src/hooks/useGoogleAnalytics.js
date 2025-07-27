import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available (Google Analytics loaded)
    if (typeof window.gtag !== 'undefined') {
      // Track page view
      window.gtag('config', 'G-2GTTL0NPD1', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};

export default useGoogleAnalytics;
