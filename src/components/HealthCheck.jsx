import { useState } from 'react';
import { API_URL } from '../config.js';

// Health Check Component
function HealthCheck() {
  const [status, setStatus] = useState('unknown');
  const [isLoading, setIsLoading] = useState(false);

  const checkHealth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/health`);
      if (response.ok) {
        setStatus('healthy');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusClass = () => {
    if (isLoading) return 'loading';
    return status;
  };

  return (
    <div className="dev-health-check">
      <button 
        className="health-check-button" 
        onClick={checkHealth}
        disabled={isLoading}
      >
        <span className={`health-status ${getStatusClass()}`}></span>
        {isLoading ? 'Checking...' : 'Health Check'}
      </button>
    </div>
  );
}

export default HealthCheck;