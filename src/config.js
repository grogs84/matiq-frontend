export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const config = {
  apiUrl: API_URL,
  environment: import.meta.env.MODE, // 'development' or 'production'
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Debug logging to help troubleshoot
if (import.meta.env.DEV) {
  console.log('🔧 Config Debug:');
  console.log('API_URL:', API_URL);
  console.log('Environment:', import.meta.env.MODE);
  console.log('All env vars:', import.meta.env);
}

export default config;
