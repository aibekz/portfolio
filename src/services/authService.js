const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class AuthService {
  constructor() {
    this.token = localStorage.getItem('admin_token');
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
    if (!this.token) {
      return { valid: false };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        this.logout();
        return { valid: false };
      }

      return { valid: true, user: data.user };

    } catch (error) {
      console.error('Token verification error:', error);
      this.logout();
      return { valid: false };
    }
  }

  logout() {
    this.token = null;
    localStorage.removeItem('admin_token');
  }

  getToken() {
    return this.token;
  }

  isAuthenticated() {
    return !!this.token;
  }

  getAuthHeaders() {
    return this.token ? {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    } : {
      'Content-Type': 'application/json',
    };
  }
}

export default new AuthService();
