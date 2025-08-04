/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { useState, useEffect, createContext, useContext } from 'react';

// Authentication context
const AuthContext = createContext(null);

/**
 * Authentication provider component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user_id: null,
    access_token: null,
    isLoading: true, // Loading on initial load to check stored auth
  });

  // Check for stored authentication on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('matiq_access_token');
    const storedUserId = localStorage.getItem('matiq_user_id');
    
    if (storedToken && storedUserId) {
      setAuthState({
        isAuthenticated: true,
        user_id: storedUserId,
        access_token: storedToken,
        isLoading: false,
      });
    } else {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
      }));
    }
  }, []);

  /**
   * Login function - stores auth data and updates state
   * @param {string} access_token - JWT access token from backend
   * @param {string} user_id - User ID from backend
   */
  const login = (access_token, user_id) => {
    // Store in localStorage for development
    // NOTE: In production, consider using httpOnly cookies for better security
    localStorage.setItem('matiq_access_token', access_token);
    localStorage.setItem('matiq_user_id', user_id);
    
    setAuthState({
      isAuthenticated: true,
      user_id,
      access_token,
      isLoading: false,
    });
  };

  /**
   * Logout function - clears auth data and updates state
   */
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem('matiq_access_token');
    localStorage.removeItem('matiq_user_id');
    
    setAuthState({
      isAuthenticated: false,
      user_id: null,
      access_token: null,
      isLoading: false,
    });
  };

  /**
   * Get authorization header for API requests
   * @returns {Object} Authorization header object
   */
  const getAuthHeader = () => {
    if (authState.access_token) {
      return {
        'Authorization': `Bearer ${authState.access_token}`
      };
    }
    return {};
  };

  const value = {
    ...authState,
    login,
    logout,
    getAuthHeader,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 * @returns {Object} Authentication state and methods
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;