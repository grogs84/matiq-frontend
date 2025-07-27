import { API_URL } from '../config.js';

/**
 * API service for making requests to the backend
 */
class ApiService {
  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
  }

  /**
   * Make a GET request to the API
   * @param {string} endpoint - The API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} The response data
   */
  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    // Add query parameters
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        url.searchParams.append(key, params[key]);
      }
    });

    console.log('🌐 Making API request to:', url.toString());

    try {
      const response = await fetch(url);
      
      console.log('📡 Response status:', response.status, response.statusText);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`API endpoint not found: ${endpoint}. Make sure the backend server is running on ${this.baseURL}`);
        } else if (response.status === 500) {
          throw new Error(`Server error (${response.status}). Check backend logs.`);
        } else {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
      }
      
      const data = await response.json();
      console.log('✅ API response data:', data);
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('❌ Network error - Backend server may not be running');
        throw new Error(`Cannot connect to backend server at ${this.baseURL}. Is the server running?`);
      }
      console.error('❌ API request failed:', error);
      throw error;
    }
  }

  /**
   * Search for wrestlers, schools, and tournaments
   * @param {string} query - The search query
   * @param {number} limit - Maximum number of results (default: 20)
   * @returns {Promise<Object>} Search results
   */
  async search(query, limit = 20) {
    return this.get('/api/v1/search/', { q: query, limit });
  }

  /**
   * Check API health
   * @returns {Promise<Object>} Health status
   */
  async healthCheck() {
    return this.get('/health');
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();
export default apiService;
