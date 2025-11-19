// API Configuration - Uses environment variable or falls back to production URL
// In Vercel: Set VITE_API_BASE_URL in environment variables
// Locally: Set in .env file
// Production default: https://web-service-application.onrender.com/api

// Get API URL with fallbacks for different environments
const getApiUrl = () => {
  // 1. Check environment variable (set in Vercel/Render dashboard)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // 2. For development
  if (import.meta.env.DEV) {
    return 'http://localhost:5000/api';
  }
  
  // 3. Production default
  return 'https://web-service-application.onrender.com/api';
};

const API_BASE_URL = getApiUrl();

console.log('🌐 API Base URL:', API_BASE_URL);
console.log('📱 Environment:', import.meta.env.MODE);

export default API_BASE_URL;
