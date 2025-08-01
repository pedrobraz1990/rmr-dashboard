/**
 * Configuration for the RMR Dashboard
 */

// Backend API URL - will be different for development vs production
const getApiBaseUrl = () => {
  // In production (Vercel), use the Railway backend URL
  if (process.env.NODE_ENV === 'production') {
    // This will be set as an environment variable in Vercel
    return process.env.REACT_APP_API_URL || 'https://rmr-dashboard-production.up.railway.app/api/data';
  }
  
  // In development, use localhost
  return 'http://localhost:8000/api/data';
};

export const config = {
  API_BASE_URL: getApiBaseUrl(),
  APP_NAME: 'RMR Emissions Intelligence Dashboard',
  VERSION: '1.0.0'
};

export default config; 