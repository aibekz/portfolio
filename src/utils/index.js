/**
 * Get current year for copyright
 */
export const getCurrentYear = () => new Date().getFullYear();

/**
 * Format email for display
 */
export const formatEmail = (email) => email.toLowerCase();

/**
 * Check if link is external
 */
export const isExternalLink = (href) => href.startsWith('http');
