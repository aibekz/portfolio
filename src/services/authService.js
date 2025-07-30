const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class AuthService {
  constructor() {
    this.isRefreshing = false;
    this.authListeners = [];
  }

  // Add listener for authentication events
  addAuthListener(callback) {
    this.authListeners.push(callback);
  }

  // Remove listener for authentication events
  removeAuthListener(callback) {
    this.authListeners = this.authListeners.filter(listener => listener !== callback);
  }

  // Notify all listeners of authentication changes
  notifyAuthChange(isAuthenticated) {
    this.authListeners.forEach(callback => {
      try {
        callback(isAuthenticated);
      } catch (error) {
        console.error('Error in auth listener:', error);
      }
    });
  }

  async signup(username, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include HttpOnly cookies
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      // With HttpOnly cookies, no token handling needed on frontend
      this.notifyAuthChange(true);
      return { success: true, user: data.user };

    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  }

  async login(username, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include HttpOnly cookies
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // With HttpOnly cookies, no token handling needed on frontend
      this.notifyAuthChange(true);
      return { success: true, user: data.user };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  async verifyToken() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include HttpOnly cookies
      });

      const data = await response.json();

      if (!response.ok) {
        // Only logout if it's an authentication error (401/403)
        if (response.status === 401 || response.status === 403) {
          this.notifyAuthChange(false);
        }
        return { valid: false };
      }

      return { valid: true, user: data.user };

    } catch (error) {
      console.error('Token verification error:', error);
      // Don't logout on network errors - let the context handle it
      return { valid: false, networkError: true };
    }
  }

  async logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include HttpOnly cookies
      });

      // Always notify logout regardless of response
      this.notifyAuthChange(false);

      if (!response.ok) {
        console.warn('Logout request failed, but cleared local state');
      }

    } catch (error) {
      console.error('Logout error:', error);
      // Still notify logout to clear local state
      this.notifyAuthChange(false);
    }
  }

  // With HttpOnly cookies, we can't check authentication status locally
  // We need to verify with the server
  async isAuthenticated() {
    try {
      const result = await this.verifyToken();
      return result.valid;
    } catch (error) {
      return false;
    }
  }

  // Helper method to make authenticated API requests
  async makeAuthenticatedRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'include', // Always include cookies
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      // If we get a 401/403, the user is not authenticated
      if (response.status === 401 || response.status === 403) {
        this.notifyAuthChange(false);
        throw new Error('Authentication failed');
      }

      return response;
    } catch (error) {
      // Re-throw the error for the caller to handle
      throw error;
    }
  }

  // Method to check if we should attempt to refresh auth state
  shouldRefreshAuth() {
    return !this.isRefreshing;
  }
}

export default new AuthService();
