/**
 * Get current year for copyright
 */
export const getCurrentYear = () => {
  try {
    return new Date().getFullYear();
  } catch (error) {
    console.warn('Error getting current year:', error);
    return 2024; // Fallback year
  }
};

/**
 * Format email for display
 * @param {string} email - The email address to format
 * @returns {string} - Formatted email address
 */
export const formatEmail = (email) => {
  if (!email || typeof email !== 'string') {
    console.warn('Invalid email provided to formatEmail:', email);
    return '';
  }
  return email.toLowerCase().trim();
};

/**
 * Check if link is external
 * @param {string} href - The URL to check
 * @returns {boolean} - True if external link
 */
export const isExternalLink = (href) => {
  if (!href || typeof href !== 'string') {
    return false;
  }
  return href.startsWith('http://') || href.startsWith('https://');
};

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - True if valid email format
 */
export const isValidEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Safely parse JSON with error handling
 * @param {string} jsonString - JSON string to parse
 * @param {*} fallback - Fallback value if parsing fails
 * @returns {*} - Parsed object or fallback
 */
export const safeJsonParse = (jsonString, fallback = null) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.warn('Error parsing JSON:', error);
    return fallback;
  }
};
