import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api';

// axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add authentication header to every request
api.interceptors.request.use((config) => {

  const username = 'admin';
  const password = 'password123';
  const token = btoa(`${username}:${password}`); 
  
  config.headers.Authorization = `Basic ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Authentication failed');
    }
    return Promise.reject(error);
  }
);

// Task API calls
export const taskAPI = {
    
  // Get all tasks with pagination and search
  getTasks: (page = 1, limit = 5, search = '') => {
    return api.get('/tasks', {
      params: { page, limit, search }
    });
  },

  // Create new task
  createTask: (taskData) => {
    return api.post('/tasks', taskData);
  },

  // Update task
  updateTask: (id, taskData) => {
    return api.put(`/tasks/${id}`, taskData);
  },

  // Delete task
  deleteTask: (id) => {
    return api.delete(`/tasks/${id}`);
  },
};

// Logs API calls
export const logsAPI = {
  getLogs: (page = 1, limit = 20) => {
    return api.get('/logs', {
      params: { page, limit }
    });
  },
};

export default api;