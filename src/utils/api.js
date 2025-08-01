import { API_CONFIG, ERROR_MESSAGES } from '../constants/index.js';

/**
 * Enhanced fetch wrapper with retry logic, timeout, and error handling
 */
class ApiClient {
  constructor(baseURL = API_CONFIG.BASE_URL) {
    this.baseURL = baseURL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.retryAttempts = API_CONFIG.RETRY_ATTEMPTS;
  }

  /**
   * Create request with timeout
   */
  createRequestWithTimeout(url, options = {}) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timeout')), this.timeout)
      ),
    ]);
  }

  /**
   * Retry logic for failed requests
   */
  async retryRequest(url, options, attempt = 1) {
    try {
      const response = await this.createRequestWithTimeout(url, options);
      return response;
    } catch (error) {
      if (attempt < this.retryAttempts && this.shouldRetry(error)) {
        console.warn(`Request failed, retrying... (${attempt}/${this.retryAttempts})`);
        await this.delay(1000 * attempt); // Exponential backoff
        return this.retryRequest(url, options, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Determine if request should be retried
   */
  shouldRetry(error) {
    return (
      error.message === 'Request timeout' ||
      error.message === 'Failed to fetch' ||
      (error.status >= 500 && error.status < 600)
    );
  }

  /**
   * Delay utility for retry logic
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Build full URL
   */
  buildUrl(endpoint) {
    return `${this.baseURL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  }

  /**
   * Prepare request options
   */
  prepareOptions(options = {}) {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    // Convert body to JSON if it's an object
    if (defaultOptions.body && typeof defaultOptions.body === 'object') {
      defaultOptions.body = JSON.stringify(defaultOptions.body);
    }

    return defaultOptions;
  }

  /**
   * Handle response
   */
  async handleResponse(response) {
    if (!response.ok) {
      const error = await this.extractError(response);
      throw error;
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return response.json();
    }

    return response.text();
  }

  /**
   * Extract error from response
   */
  async extractError(response) {
    let errorMessage = ERROR_MESSAGES.GENERIC;
    let errorData = null;

    try {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
        errorMessage = errorData.error || errorData.message || errorMessage;
      } else {
        errorMessage = await response.text() || errorMessage;
      }
    } catch {
      // Use default error message if parsing fails
    }

    // Map status codes to user-friendly messages
    switch (response.status) {
      case 401:
        errorMessage = ERROR_MESSAGES.UNAUTHORIZED;
        break;
      case 404:
        errorMessage = ERROR_MESSAGES.NOT_FOUND;
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        errorMessage = ERROR_MESSAGES.SERVER_ERROR;
        break;
      default:
        break;
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = errorData;
    return error;
  }

  /**
   * Generic request method
   */
  async request(url, options = {}) {
    const requestOptions = this.prepareOptions(options);

    try {
      const response = await this.retryRequest(url, requestOptions);
      return this.handleResponse(response);
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  /**
   * GET request
   */
  async get(endpoint, params = {}) {
    const baseUrl = this.buildUrl(endpoint);
    
    // Handle query parameters
    if (Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          searchParams.append(key, params[key]);
        }
      });
      const queryString = searchParams.toString();
      const finalUrl = `${baseUrl}${queryString ? `?${queryString}` : ''}`;
      return this.request(finalUrl, { method: 'GET' });
    }

    return this.request(baseUrl, { method: 'GET' });
  }

  /**
   * POST request
   */
  async post(endpoint, data = {}) {
    return this.request(this.buildUrl(endpoint), {
      method: 'POST',
      body: data,
    });
  }

  /**
   * PUT request
   */
  async put(endpoint, data = {}) {
    return this.request(this.buildUrl(endpoint), {
      method: 'PUT',
      body: data,
    });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, data = {}) {
    return this.request(this.buildUrl(endpoint), {
      method: 'PATCH',
      body: data,
    });
  }

  /**
   * DELETE request
   */
  async delete(endpoint) {
    return this.request(this.buildUrl(endpoint), { method: 'DELETE' });
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient();

// Export class for testing or custom instances
export { ApiClient };

/**
 * Utility function to handle API errors consistently
 */
export const handleApiError = (error, fallbackMessage = ERROR_MESSAGES.GENERIC) => {
  console.error('API Error:', error);
  
  if (error.message) {
    return error.message;
  }
  
  return fallbackMessage;
};

/**
 * Utility function to check if error is network related
 */
export const isNetworkError = (error) => {
  return (
    error.message === 'Failed to fetch' ||
    error.message === 'Request timeout' ||
    error.message === ERROR_MESSAGES.NETWORK
  );
};

/**
 * Utility function to check if user is unauthorized
 */
export const isUnauthorizedError = (error) => {
  return error.status === 401 || error.message === ERROR_MESSAGES.UNAUTHORIZED;
};
