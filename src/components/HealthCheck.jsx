import useHealthCheck from '../hooks/useHealthCheck.js';

/**
 * HealthCheck component - displays system health status with a floating button
 * @component
 * @returns {JSX.Element} The HealthCheck component
 */
function HealthCheck() {
  const { healthStatus, isLoading, checkHealth } = useHealthCheck();

  const getStatusStyles = () => {
    switch (healthStatus) {
      case 'healthy': 
        return {
          dot: 'bg-success-500 shadow-success-500/50',
          text: 'text-success-700 dark:text-success-400',
          bg: 'bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800/30'
        };
      case 'unhealthy': 
        return {
          dot: 'bg-error-500 shadow-error-500/50',
          text: 'text-error-700 dark:text-error-400',
          bg: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800/30'
        };
      default: 
        return {
          dot: 'bg-warning-500 shadow-warning-500/50',
          text: 'text-warning-700 dark:text-warning-400',
          bg: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800/30'
        };
    }
  };

  const styles = getStatusStyles();

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <button 
        className={`flex items-center space-x-2 ${styles.bg} border rounded-lg px-3 py-2 shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm`}
        onClick={checkHealth}
        disabled={isLoading}
      >
        <span className={`w-2 h-2 rounded-full ${styles.dot} ${isLoading ? 'animate-pulse' : 'shadow-lg'}`}></span>
        <span className={`text-sm font-medium ${styles.text}`}>
          {isLoading ? 'Checking...' : 'Health Check'}
        </span>
      </button>
    </div>
  );
}

export default HealthCheck;