import { api } from './api';

export const addressService = {

  async list() {
    const response = await api.get('addresses/');
    return response.data;
  },

  // Campos exatos do model Address
  async create(data: {
    street_address: string; 
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default?: boolean;
  }) {
    const response = await api.post('addresses/', data);
    return response.data;
  },

  async update(id: number, data: Partial<{
    street_address: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
  }>) {
    const response = await api.patch(`addresses/${id}/`, data);
    return response.data;
  },

  async remove(id: number) {
    await api.delete(`addresses/${id}/`);
  },
};