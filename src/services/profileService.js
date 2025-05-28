import axios from 'axios';

const API_URL = 'http://localhost:3000/collab/v1';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log('Received response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const profileService = {
  // Basic Info
  getBasicInfo: () => api.get('/info'),
  updateBasicInfo: (data) => api.put('/info', data),
  createBasicInfo: (data) => api.post('/info', data),

  // Technical Profile
  getTechProfile: () => api.get('/tech'),
  updateTechProfile: (data) => api.put('/tech', data),
  createTechProfile: (data) => api.post('/tech', data),

  // Bio
  getBio: () => api.get('/bio'),
  updateBio: (data) => api.put('/bio', data),
  createBio: (data) => api.post('/bio', data),

  // Experience
  getExperiences: () => api.get('/exp'),
  addExperience: (data) => api.post('/exp', data),
  updateExperience: (id, data) => api.put(`/exp/${id}`, data),
  deleteExperience: (id) => api.delete(`/exp/${id}`),

  // Academics
  getAcademics: () => api.get('/academics'),
  addAcademic: (data) => api.post('/academics', data),
  updateAcademic: (id, data) => api.put(`/academics/${id}`, data),
  deleteAcademic: (id) => api.delete(`/academics/${id}`),

  // Profile Images
  updateProfileImage: (formData) => api.post('/visuals/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
  updateCoverImage: (formData) => api.post('/visuals/cover', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

export default profileService; 