import { api } from './api';

export const addressService = {
  async create(addressData: { city: string; block: string; streetName: string; avenue?: string }): Promise<any> {
    const payload = {
      city: addressData.city,
      block: addressData.block,
      street_name: addressData.streetName, 
      avenue: addressData.avenue || undefined,
    };

    const response = await api.post('addresses/', payload);
    return response.data;
  }
};