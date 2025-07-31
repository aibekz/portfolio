import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const useDynamicFavicon = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Create SVG content based on theme
    const createFaviconSVG = (isDark) => {
      const bgColor = isDark ? '#000' : '#ffffff';
      const textColor = isDark ? '#39FF14' : '#000000';
      
      return `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64">
        <rect width="100%" height="100%" fill="${bgColor}"/>
        <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle"
              font-family="IBM Plex Mono, monospace"
              font-size="48" fill="${textColor}" font-weight="bold">Z</text>
      </svg>`;
    };

    // Convert SVG to data URL
    const svgContent = createFaviconSVG(isDarkMode);
    const dataUrl = `data:image/svg+xml,${encodeURIComponent(svgContent)}`;

    // Update favicon
    const updateFavicon = () => {
      // Find existing favicon link
      let faviconLink = document.querySelector('link[rel="icon"]');
      
      if (!faviconLink) {
        // Create favicon link if it doesn't exist
        faviconLink = document.createElement('link');
        faviconLink.rel = 'icon';
        faviconLink.type = 'image/svg+xml';
        document.head.appendChild(faviconLink);
      }
      
      // Update the href
      faviconLink.href = dataUrl;
    };

    // Update apple-touch-icon as well
    const updateAppleTouchIcon = () => {
      let appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
      
      if (!appleTouchIcon) {
        appleTouchIcon = document.createElement('link');
        appleTouchIcon.rel = 'apple-touch-icon';
        document.head.appendChild(appleTouchIcon);
      }
      
      appleTouchIcon.href = dataUrl;
    };

    updateFavicon();
    updateAppleTouchIcon();

  }, [isDarkMode]);
};

export default useDynamicFavicon;
