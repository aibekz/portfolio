const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class AuthService {
  constructor() {
    this.token = null;
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

  getStoredToken() {
    if (!this.token) {
      this.token = localStorage.getItem('admin_token');
    }
    return this.token;
  }

  async signup(username, email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      this.token = data.token;
      localStorage.setItem('admin_token', data.token);
      return { success: true, token: data.token, user: data.user };

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
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      this.token = data.token;
      localStorage.setItem('admin_token', data.token);
      return { success: true, token: data.token, user: data.user };

    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  }

  async verifyToken() {
    const token = this.getStoredToken();
    if (!token) {
      return { valid: false };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        // Only logout if it's an authentication error (401/403)
        if (response.status === 401 || response.status === 403) {
          this.logout();
        }
        return { valid: false };
      }

      return { valid: true, user: data.user };

    } catch (error) {
      console.error('Token verification error:', error);
      // Don't logout on network errors - let the context handle it
      // Only logout if it's a clear authentication failure
      return { valid: false, networkError: true };
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('admin_token');
    this.notifyAuthChange(false);
  }

  getToken() {
    return this.getStoredToken();
  }

  isAuthenticated() {
    return !!this.getStoredToken();
  }

  getAuthHeaders() {
    const token = this.getStoredToken();
    return token ? {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    } : {
      'Content-Type': 'application/json',
    };
  }

  // Helper method to make authenticated API requests with error handling
  async makeAuthenticatedRequest(url, options = {}) {
    const headers = this.getAuthHeaders();
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      // If we get a 401/403, the token is invalid
      if (response.status === 401 || response.status === 403) {
        this.logout();
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
    return this.isAuthenticated() && !this.isRefreshing;
  }
}

export default new AuthService();
