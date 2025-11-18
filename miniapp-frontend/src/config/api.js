// API Configuration - Uses environment variable or falls back to production URL
// In Vercel: Set VITE_API_BASE_URL in environment variables
// Locally: Set in .env file
// Production default: https://web-service-application.onrender.com/api

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://web-service-application.onrender.com/api';

if (!API_BASE_URL) {
  console.error('VITE_API_BASE_URL is not configured. Please set it in environment variables.');
}

console.log('API Base URL:', API_BASE_URL);

export default API_BASE_URL;
