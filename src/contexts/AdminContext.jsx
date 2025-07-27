import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on app load
    const checkAuth = async () => {
      const result = await authService.verifyToken();
      setIsAuthenticated(result.valid);
      setIsLoading(false);
    };

    checkAuth();
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

  const value = {
    isAuthenticated,
    isLoading,
    login,
    signup,
    logout
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
