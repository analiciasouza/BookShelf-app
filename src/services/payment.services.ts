import { api } from './api';
import { Address, PaymentMethod } from '../@types/api';

export const UserSettingsService = {
  // --- Gestão de Endereços ---
  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get<Address[]>('/addresses/');
    return response.data;
  },

  createAddress: async (addressData: Omit<Address, 'id'>): Promise<Address> => {
    const response = await api.post<Address>('/addresses/', addressData);
    return response.data;
  },

  // --- Gestão de Cartões / Métodos de Pagamento ---
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    const response = await api.get<PaymentMethod[]>('/payment-methods/'); // Ajuste a rota de acordo com o router do Django
    return response.data;
  },

  createPaymentMethod: async (paymentData: any): Promise<PaymentMethod> => {
    const response = await api.post<PaymentMethod>('/payment-methods/', paymentData);
    return response.data;
  }
};