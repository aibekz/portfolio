import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // With HttpOnly cookies, we need to verify authentication with the server
    const checkAuth = async () => {
      try {
        const result = await authService.verifyToken();
        setIsAuthenticated(result.valid);
      } catch (error) {
        console.warn('Token verification failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    // Listen for authentication changes from the auth service
    const handleAuthChange = (isAuth) => {
      setIsAuthenticated(isAuth);
    };

    authService.addAuthListener(handleAuthChange);
    checkAuth();

    // Cleanup listener on unmount
    return () => {
      authService.removeAuthListener(handleAuthChange);
    };
  }, []);

  const login = async (username, password) => {
    try {
      const result = await authService.login(username, password);
      if (result.success) {
        setIsAuthenticated(true);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const result = await authService.signup(username, email, password);
      if (result.success) {
        setIsAuthenticated(true);
        return { success: true, user: result.user };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  // Method to refresh authentication state
  const refreshAuth = async () => {
    if (!authService.isAuthenticated()) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const result = await authService.verifyToken();
      setIsAuthenticated(result.valid);
    } catch (error) {
      console.warn('Auth refresh failed:', error);
      // Don't change auth state on network errors
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout,
    refreshAuth
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
