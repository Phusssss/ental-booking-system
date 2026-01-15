import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ==================== AUTH ====================
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
};

// ==================== SERVICES ====================
export const serviceAPI = {
  getAll: (isActive?: boolean) =>
    api.get('/services', { params: { isActive } }),
  create: (data: any) => api.post('/admin/services', data),
  update: (id: number, data: any) => api.put(`/admin/services/${id}`, data),
  delete: (id: number) => api.delete(`/admin/services/${id}`),
};

// ==================== DOCTORS ====================
export const doctorAPI = {
  getAll: (isActive?: boolean) =>
    api.get('/doctors', { params: { isActive } }),
  create: (data: any) => api.post('/admin/doctors', data),
  update: (id: number, data: any) => api.put(`/admin/doctors/${id}`, data),
  delete: (id: number) => api.delete(`/admin/doctors/${id}`),
};

// ==================== TIME SLOTS ====================
export const timeSlotAPI = {
  getAll: () => api.get('/time-slots'),
  checkAvailability: (date: string, doctorId?: number) =>
    api.get('/time-slots/availability', { params: { date, doctorId } }),
};

// ==================== APPOINTMENTS ====================
export const appointmentAPI = {
  create: (data: any) => api.post('/appointments', data),
  getAll: (params?: any) => api.get('/admin/appointments', { params }),
  getById: (id: number) => api.get(`/admin/appointments/${id}`),
  update: (id: number, data: any) =>
    api.put(`/admin/appointments/${id}`, data),
  delete: (id: number) => api.delete(`/admin/appointments/${id}`),
  getDashboardStats: () => api.get('/admin/dashboard'),
};
