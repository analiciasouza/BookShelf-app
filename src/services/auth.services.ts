import { api } from './api';

export const authService = {
  async login(credentials: { email: string; password: string }): Promise<any> {
    const response = await api.post('auth/login/', credentials);
    return response.data;
  },

 
  async register(userData: any): Promise<any> {
    const response = await api.post('auth/register/', userData);
    return response.data;
  }
};