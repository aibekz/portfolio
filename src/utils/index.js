// Re-export all utilities from their respective modules
export * from './api.js';
export * from './validation.js';
export * from './format.js';

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
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
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

/**
 * Deep clone an object
 * @param {*} obj - Object to clone
 * @returns {*} - Cloned object
 */
export const deepClone = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }
  
  if (obj instanceof Array) {
    return obj.map(item => deepClone(item));
  }
  
  if (typeof obj === 'object') {
    const clonedObj = {};
    Object.keys(obj).forEach(key => {
      clonedObj[key] = deepClone(obj[key]);
    });
    return clonedObj;
  }
  
  return obj;
};

/**
 * Check if object is empty
 * @param {*} obj - Object to check
 * @returns {boolean} - True if empty
 */
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (typeof obj === 'string') return obj.trim().length === 0;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

/**
 * Generate random ID
 * @param {number} length - Length of ID
 * @returns {string} - Random ID
 */
export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} - Promise that resolves after delay
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Retry function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} maxAttempts - Maximum retry attempts
 * @param {number} delay - Initial delay in milliseconds
 * @returns {Promise} - Promise that resolves with function result
 */
export const retry = async (fn, maxAttempts = 3, delay = 1000) => {
  let lastError;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      await sleep(delay * Math.pow(2, attempt - 1)); // Exponential backoff
    }
  }
  
  throw lastError;
};

/**
 * Create a cancelable promise
 * @param {Promise} promise - Promise to make cancelable
 * @returns {Object} - Object with promise and cancel function
 */
export const makeCancelable = (promise) => {
  let isCanceled = false;
  
  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then(value => (isCanceled ? reject(new Error('Canceled')) : resolve(value)))
      .catch(error => (isCanceled ? reject(new Error('Canceled')) : reject(error)));
  });
  
  return {
    promise: wrappedPromise,
    cancel: () => {
      isCanceled = true;
    },
  };
};

/**
 * Compose functions from right to left
 * @param {...Function} fns - Functions to compose
 * @returns {Function} - Composed function
 */
export const compose = (...fns) => {
  return (value) => fns.reduceRight((acc, fn) => fn(acc), value);
};

/**
 * Pipe functions from left to right
 * @param {...Function} fns - Functions to pipe
 * @returns {Function} - Piped function
 */
export const pipe = (...fns) => {
  return (value) => fns.reduce((acc, fn) => fn(acc), value);
};
