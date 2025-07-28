import { useState, useCallback } from 'react';
import apiService from '../services/api.js';

/**
 * Custom hook for API health check functionality
 * @returns {Object} { healthStatus, isLoading, checkHealth }
 */
export function useHealthCheck() {
  const [healthStatus, setHealthStatus] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiService.healthCheck();
      setHealthStatus(response.status === 'healthy' ? 'healthy' : 'unhealthy');
    } catch (error) {
      console.error('Health check failed:', error);
      setHealthStatus('unhealthy');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { 
    healthStatus, 
    isLoading, 
    checkHealth 
  };
}

export default useHealthCheck;