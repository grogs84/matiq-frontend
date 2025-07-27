export const API_URL = import.meta.env.VITE_API_URL || 'https://matiq-backend-production.up.railway.app';

export const config = {
  apiUrl: API_URL,
  environment: import.meta.env.MODE, // 'development' or 'production'
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Debug logging for both dev and production to troubleshoot
console.log('🔧 Config Debug:');
console.log('API_URL:', API_URL);
console.log('Environment:', import.meta.env.MODE);
console.log('VITE_API_URL env var:', import.meta.env.VITE_API_URL);

export default config;
