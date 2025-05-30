import axios from 'axios';

const API_URL = 'http://localhost:3000/collab/v1/auth';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false
});

// Add request interceptor to handle errors
api.interceptors.request.use(
  (config) => {
    // Log the request
    console.log('Making request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    // Log the response
    console.log('Received response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const authService = {
  // Login
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Signup
  signup: async (email, password) => {
    try {
      const response = await api.post('/signup', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify OTP
  verifyOTP: async (email, otp) => {
    try {
      const response = await api.post('/verifyOTP', { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Resend OTP
  resendOTP: async (email) => {
    try {
      const response = await api.post('/resendOTP', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService; 