import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const apiWithAuth = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiWithAuth.interceptors.request.use((config) => {
  const username = 'admin';
  const password = 'password123';
  const token = btoa(`${username}:${password}`);
  config.headers.Authorization = `Basic ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const taskAPI = {
  getTasks: (page = 1, limit = 5, search = '') => {
    return api.get('/tasks', {
      params: { page, limit, search }
    });
  },

  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },
};

export const logsAPI = {
  getLogs: (page = 1, limit = 20) => {
    return apiWithAuth.get('/logs', {
      params: { page, limit }
    });
  },
};

export default api;