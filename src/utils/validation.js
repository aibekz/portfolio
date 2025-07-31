import { VALIDATION_RULES } from '../constants/index.js';

/**
 * Validation utility functions
 */

/**
 * Validate email address
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { isValid: false, message: 'Email is required' };
  }

  const trimmedEmail = email.trim();
  if (!trimmedEmail) {
    return { isValid: false, message: 'Email is required' };
  }

  if (!VALIDATION_RULES.EMAIL.PATTERN.test(trimmedEmail)) {
    return { isValid: false, message: VALIDATION_RULES.EMAIL.MESSAGE };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate password
 */
export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return { isValid: false, message: 'Password is required' };
  }

  if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
    return { 
      isValid: false, 
      message: `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters long` 
    };
  }

  if (!VALIDATION_RULES.PASSWORD.PATTERN.test(password)) {
    return { isValid: false, message: VALIDATION_RULES.PASSWORD.MESSAGE };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate post title
 */
export const validatePostTitle = (title) => {
  if (!title || typeof title !== 'string') {
    return { isValid: false, message: 'Title is required' };
  }

  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return { isValid: false, message: 'Title is required' };
  }

  if (trimmedTitle.length < VALIDATION_RULES.POST_TITLE.MIN_LENGTH) {
    return { 
      isValid: false, 
      message: `Title must be at least ${VALIDATION_RULES.POST_TITLE.MIN_LENGTH} characters long` 
    };
  }

  if (trimmedTitle.length > VALIDATION_RULES.POST_TITLE.MAX_LENGTH) {
    return { 
      isValid: false, 
      message: `Title must be no more than ${VALIDATION_RULES.POST_TITLE.MAX_LENGTH} characters long` 
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate post content
 */
export const validatePostContent = (content) => {
  if (!content || typeof content !== 'string') {
    return { isValid: false, message: 'Content is required' };
  }

  const trimmedContent = content.trim();
  if (!trimmedContent) {
    return { isValid: false, message: 'Content is required' };
  }

  if (trimmedContent.length < VALIDATION_RULES.POST_CONTENT.MIN_LENGTH) {
    return { 
      isValid: false, 
      message: `Content must be at least ${VALIDATION_RULES.POST_CONTENT.MIN_LENGTH} characters long` 
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate post slug
 */
export const validatePostSlug = (slug) => {
  if (!slug || typeof slug !== 'string') {
    return { isValid: false, message: 'Slug is required' };
  }

  const trimmedSlug = slug.trim();
  if (!trimmedSlug) {
    return { isValid: false, message: 'Slug is required' };
  }

  // Slug should only contain lowercase letters, numbers, and hyphens
  const slugPattern = /^[a-z0-9-]+$/;
  if (!slugPattern.test(trimmedSlug)) {
    return { 
      isValid: false, 
      message: 'Slug can only contain lowercase letters, numbers, and hyphens' 
    };
  }

  // Slug should not start or end with hyphen
  if (trimmedSlug.startsWith('-') || trimmedSlug.endsWith('-')) {
    return { 
      isValid: false, 
      message: 'Slug cannot start or end with a hyphen' 
    };
  }

  // Slug should not have consecutive hyphens
  if (trimmedSlug.includes('--')) {
    return { 
      isValid: false, 
      message: 'Slug cannot contain consecutive hyphens' 
    };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate required field
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  if (typeof value === 'string' && !value.trim()) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  if (Array.isArray(value) && value.length === 0) {
    return { isValid: false, message: `${fieldName} is required` };
  }

  return { isValid: true, message: '' };
};

/**
 * Validate URL
 */
export const validateUrl = (url) => {
  if (!url || typeof url !== 'string') {
    return { isValid: false, message: 'URL is required' };
  }

  try {
    new URL(url);
    return { isValid: true, message: '' };
  } catch {
    return { isValid: false, message: 'Please enter a valid URL' };
  }
};

/**
 * Validate form data
 */
export const validateForm = (data, rules) => {
  const errors = {};
  let isValid = true;

  Object.keys(rules).forEach(field => {
    const rule = rules[field];
    const value = data[field];

    if (rule.required) {
      const requiredValidation = validateRequired(value, rule.label || field);
      if (!requiredValidation.isValid) {
        errors[field] = requiredValidation.message;
        isValid = false;
        return;
      }
    }

    if (value && rule.type) {
      let validation;
      switch (rule.type) {
        case 'email':
          validation = validateEmail(value);
          break;
        case 'password':
          validation = validatePassword(value);
          break;
        case 'url':
          validation = validateUrl(value);
          break;
        default:
          validation = { isValid: true, message: '' };
      }

      if (!validation.isValid) {
        errors[field] = validation.message;
        isValid = false;
      }
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      errors[field] = `${rule.label || field} must be at least ${rule.minLength} characters long`;
      isValid = false;
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `${rule.label || field} must be no more than ${rule.maxLength} characters long`;
      isValid = false;
    }

    if (value && rule.pattern && !rule.pattern.test(value)) {
      errors[field] = rule.message || `${rule.label || field} format is invalid`;
      isValid = false;
    }

    if (rule.custom && typeof rule.custom === 'function') {
      const customValidation = rule.custom(value, data);
      if (!customValidation.isValid) {
        errors[field] = customValidation.message;
        isValid = false;
      }
    }
  });

  return { isValid, errors };
};

/**
 * Sanitize input to prevent XSS
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

/**
 * Generate slug from title
 */
export const generateSlug = (title) => {
  if (!title || typeof title !== 'string') return '';
  
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Check if string is empty or only whitespace
 */
export const isEmpty = (str) => {
  return !str || typeof str !== 'string' || !str.trim();
};

/**
 * Truncate string to specified length
 */
export const truncate = (str, length = 100, suffix = '...') => {
  if (!str || typeof str !== 'string') return '';
  if (str.length <= length) return str;
  return str.substring(0, length).trim() + suffix;
};
