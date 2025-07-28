import { useState, useEffect } from 'react';
import apiService from '../services/api.js';

/**
 * Hook to handle health check functionality
 * @param {boolean} autoCheck - Whether to automatically check health on mount (default: true)
 * @returns {Object} { healthStatus, isLoading, checkHealth }
 */
export function useHealthCheck(autoCheck = true) {
  const [healthStatus, setHealthStatus] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Perform a health check
   */
  const checkHealth = async () => {
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
  };

  useEffect(() => {
    if (autoCheck) {
      checkHealth();
    }
  }, [autoCheck]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    healthStatus,
    isLoading,
    checkHealth
  };
}

export default useHealthCheck;