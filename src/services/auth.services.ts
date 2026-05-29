import { api } from './api';

export const authService = {

  async login(credentials: { email: string; password: string }) {
    const response = await api.post('auth/login/', credentials);
    return response.data; 
  },

  async register(userData: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
    password: string;
    password2: string;
  }) {
    const response = await api.post('auth/register/', userData);
    return response.data; // { user, tokens: { access, refresh } }
  },

  
  async getCurrentUser() {
    const response = await api.get('auth/user/');
    return response.data;
  },
};