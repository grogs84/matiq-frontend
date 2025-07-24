export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const config = {
  apiUrl: API_URL,
  environment: import.meta.env.MODE, // 'development' or 'production'
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

export default config;
