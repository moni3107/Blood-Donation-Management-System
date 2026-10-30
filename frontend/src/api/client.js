import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('blood_bank_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for consistent error messaging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired, clear invalid session
      if (localStorage.getItem('blood_bank_token')) {
        console.warn('Session expired or unauthorized. Clearing credentials.');
      }
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  donorLogin: (data) => api.post('/auth/donor/login', data),
  adminLogin: (data) => api.post('/auth/admin/login', data),
  forgotPassword: (data) => api.post('/auth/forgot-password', data),
  verifyOtp: (data) => api.post('/auth/verify-otp', data),
  resetPassword: (data) => api.post('/auth/reset-password', data),
};

export const donorApi = {
  register: (data) => api.post('/donors/register', data),
  getProfile: () => api.get('/donors/me'),
  updateProfile: (data) => api.put('/donors/me', data),
  updateAvailability: (data) => api.patch('/donors/me/availability', data),
  search: (params) => api.get('/donors/search', { params }),
};

export const adminApi = {
  getDonors: () => api.get('/admin/donors'),
  getCount: () => api.get('/admin/donors/count'),
  getStatistics: () => api.get('/admin/donors/statistics'),
  deleteDonor: (id) => api.delete(`/admin/donors/${id}`),
};

export default api;
