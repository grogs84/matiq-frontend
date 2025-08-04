import { API_URL } from '../config.js';

/**
 * Authentication service for handling login/logout with the backend
 */
class AuthService {
  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Login user with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Login response with access_token and user_id
   * @throws {Error} Authentication error
   */
  async login(email, password) {
    const url = `${this.baseURL}/api/v1/auth/login`;
    
    console.log('🔐 Attempting login to:', url);
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      console.log('📡 Login response status:', response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (response.status === 401) {
          throw new Error(errorData.message || 'Invalid email or password');
        } else if (response.status === 400) {
          throw new Error(errorData.message || 'Invalid request. Please check your input.');
        } else if (response.status === 500) {
          throw new Error('Server error. Please try again later.');
        } else {
          throw new Error(errorData.message || `Authentication failed (${response.status})`);
        }
      }

      const data = await response.json();
      console.log('✅ Login successful:', { user_id: data.user_id, hasToken: !!data.access_token });
      
      return data;
    } catch (error) {
      console.error('❌ Login error:', error);
      
      // Handle network errors
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Network error. Please check your connection and try again.');
      }
      
      throw error;
    }
  }

  /**
   * Logout user (currently just client-side, but can be extended for server-side logout)
   * @returns {Promise<void>}
   */
  async logout() {
    // For now, just a client-side logout
    // In the future, this could call a backend logout endpoint to invalidate the token
    console.log('🚪 Logging out user');
    
    // Optional: Call backend logout endpoint
    // const url = `${this.baseURL}/api/v1/auth/logout`;
    // try {
    //   await fetch(url, {
    //     method: 'POST',
    //     headers: {
    //       'Authorization': `Bearer ${access_token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   });
    // } catch (error) {
    //   console.warn('Logout request failed, but proceeding with client-side logout:', error);
    // }
  }

  /**
   * Validate token with backend (optional feature for checking if token is still valid)
   * @param {string} access_token - Access token to validate
   * @returns {Promise<boolean>} Whether token is valid
   */
  async validateToken(access_token) {
    const url = `${this.baseURL}/api/v1/auth/validate`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${access_token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.warn('Token validation failed:', error);
      return false;
    }
  }
}

// Create and export a singleton instance
export const authService = new AuthService();
export default authService;