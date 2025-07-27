import { API_URL } from '../config.js';

/**
 * API service for making requests to the backend
 */
class ApiService {
  constructor(baseURL = API_URL) {
    this.baseURL = baseURL;
    this.useMockData = false;
  }

  /**
   * Enable mock data mode for testing
   */
  enableMockData() {
    this.useMockData = true;
  }

  /**
   * Get mock data for testing
   */
  async getMockData(endpoint) {
    // Import mock data dynamically to avoid circular dependencies
    const { mockApiService } = await import('../features/person/services/mockApiService.js');
    return mockApiService.get(endpoint);
  }

  /**
   * Make a GET request to the API
   * @param {string} endpoint - The API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise<Object>} The response data
   */
  async get(endpoint, params = {}) {
    // If mock data is enabled, use mock data
    if (this.useMockData) {
      console.log('🧪 Using mock data for:', endpoint);
      return this.getMockData(endpoint);
    }

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
        console.error('❌ Network error - Using mock data as fallback');
        // Use mock data as fallback
        return this.getMockData(endpoint);
      }
      
      // Check if this is a person profile endpoint and fallback to mock data
      if (endpoint.includes('/person/')) {
        console.error('❌ API request failed, using mock data as fallback:', error);
        return this.getMockData(endpoint);
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
