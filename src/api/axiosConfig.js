import axios from 'axios';

// Production: uses Vercel backend URL from .env.production
// Development: uses localhost:5000 directly
const BASE = process.env.REACT_APP_API_URL
  ? `${process.env.REACT_APP_API_URL}`
  : 'http://localhost:5000/api';

console.log('🔗 API Base URL:', BASE);

const axiosInstance = axios.create({
  baseURL: BASE,
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('ssp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', err.message);
    
    if (err.response?.status === 401) {
      const token = localStorage.getItem('ssp_token');
      if (token) {
        localStorage.removeItem('ssp_token');
        localStorage.removeItem('ssp_user');
        const path = window.location.hash || window.location.pathname;
        if (!path.includes('/login') && !path.includes('/register')) {
          window.location.href = '/#/login';
        }
      }
    }
    
    // Network error handling
    if (!err.response) {
      console.error('Network Error - Backend not responding');
      err.message = 'Network Error: Backend not responding. Please check if backend is deployed.';
    }
    
    return Promise.reject(err);
  }
);

export default axiosInstance;
