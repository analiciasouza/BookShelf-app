import { api } from './api';

export const orderService = {

 
  async create(data: {
    items: { book: number; quantity: number }[];
    shipping_address: object;
    payment_method: number;
  }) {
    const response = await api.post('orders/', data);
    return response.data;
  },

  async list() {
    const response = await api.get('orders/');
    return response.data;
  },

  async detail(orderId: string) {
    const response = await api.get(`orders/${orderId}/`);
    return response.data;
  },

  // POST /orders/{id}/cancel/
  async cancel(orderId: string) {
    const response = await api.post(`orders/${orderId}/cancel/`);
    return response.data;
  },

  // POST /orders/{id}/feedback/
  async sendFeedback(orderId: string, rating: number, comment: string) {
    const response = await api.post(`orders/${orderId}/feedback/`, { rating, comment });
    return response.data;
  },
};