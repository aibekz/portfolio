// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// Cache Configuration
export const CACHE_CONFIG = {
  POSTS_DURATION: 5 * 60 * 1000, // 5 minutes
  USER_DURATION: 10 * 60 * 1000, // 10 minutes
  STATIC_DURATION: 60 * 60 * 1000, // 1 hour
};

// Pagination Configuration
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  ADMIN_PAGE_SIZE: 20,
};

// Animation Configuration
export const ANIMATION_CONFIG = {
  TYPEWRITER_DELAY: 75,
  TYPEWRITER_PAUSE: 4000,
  TYPEWRITER_DELETE_SPEED: 30,
  FADE_DURATION: 800,
  TRANSITION_DURATION: 300,
};

// Theme Configuration
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#111213',
    SECONDARY: '#1f2937',
    ACCENT: '#39FF14',
    TEXT_PRIMARY: '#d6d6d6',
    TEXT_MUTED: '#9ca3af',
    BORDER: '#374151',
  },
  FONTS: {
    MONO: "'IBM Plex Mono', monospace",
    SANS: 'system-ui, -apple-system, sans-serif',
  },
  SIZES: {
    HEADER: '27px',
    BODY: '18px',
    SMALL: '14px',
  },
};

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MESSAGE: 'Please enter a valid email address',
  },
  PASSWORD: {
    MIN_LENGTH: 8,
    PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    MESSAGE: 'Password must be at least 8 characters with uppercase, lowercase, and number',
  },
  POST_TITLE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 200,
    MESSAGE: 'Title must be between 3 and 200 characters',
  },
  POST_CONTENT: {
    MIN_LENGTH: 10,
    MESSAGE: 'Content must be at least 10 characters',
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_FAILED: 'Please check your input and try again.',
  GENERIC: 'Something went wrong. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'Logged out successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  DRAFT_POST: 'draft_post',
  THEME: 'theme_preference',
};

// Route Paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
  POSTS: '/posts',
  POST_DETAIL: '/posts/:slug',
  ADMIN: {
    LOGIN: '/admin/login',
    DASHBOARD: '/admin',
    CREATE_POST: '/admin/posts/create',
    EDIT_POST: '/admin/posts/:id/edit',
    SIGNUP: '/admin/signup',
  },
  NOT_FOUND: '*',
};

// SEO Configuration
export const SEO_CONFIG = {
  DEFAULT_TITLE: 'Aibek Z. - Software Engineer',
  TITLE_TEMPLATE: '%s | Aibek Z.',
  DEFAULT_DESCRIPTION: 'Full-stack developer passionate about building meaningful web applications',
  KEYWORDS: [
    'software developer',
    'full-stack developer',
    'web development',
    'react',
    'javascript',
    'node.js',
    'portfolio',
  ],
  AUTHOR: 'Aibek Zhumabekov',
  SITE_URL: 'https://aibekz.com',
  OG_IMAGE: 'https://aibekz.com/og-image.png',
};

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  ENABLE_COMMENTS: import.meta.env.VITE_ENABLE_COMMENTS === 'true',
  ENABLE_SEARCH: import.meta.env.VITE_ENABLE_SEARCH === 'true',
  ENABLE_DARK_MODE_TOGGLE: false, // Always dark mode
  ENABLE_ADMIN_SIGNUP: import.meta.env.VITE_ENABLE_ADMIN_SIGNUP === 'true',
};

// Performance Configuration
export const PERFORMANCE_CONFIG = {
  LAZY_LOAD_THRESHOLD: '100px',
  IMAGE_QUALITY: 85,
  CHUNK_SIZE_WARNING: 500 * 1024, // 500KB
  BUNDLE_SIZE_WARNING: 2 * 1024 * 1024, // 2MB
};

// Development Configuration
export const DEV_CONFIG = {
  LOG_LEVEL: import.meta.env.DEV ? 'debug' : 'error',
  ENABLE_REDUX_DEVTOOLS: import.meta.env.DEV,
  MOCK_API_DELAY: 500,
};
