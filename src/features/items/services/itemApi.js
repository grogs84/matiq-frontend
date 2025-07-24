import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const itemApi = {
  // Get all items
  getAll: async () => {
    const response = await api.get('/items');
    return response.data;
  },

  // Get item by ID
  getById: async (id) => {
    const response = await api.get(`/items/${id}`);
    return response.data;
  },

  // Create new item
  create: async (item) => {
    const response = await api.post('/items', item);
    return response.data;
  },

  // Update item
  update: async (id, item) => {
    const response = await api.put(`/items/${id}`, item);
    return response.data;
  },

  // Delete item
  delete: async (id) => {
    const response = await api.delete(`/items/${id}`);
    return response.data;
  },
};
