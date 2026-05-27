import { api } from './api';
import { CartItem } from '../@types/type';

export const orderService = {

  async create(
    items: CartItem[],
    shippingAddress: object,
    paymentMethodId: number
  ) {
    const response = await api.post('orders/', {
      items: items.map(i => ({
        book: i.book.id,
        quantity: i.quantity,
      })),
      shipping_address: shippingAddress,
      payment_method: paymentMethodId,
    });
    return response.data;
  },

  async list() {
    const response = await api.get('orders/');
    return response.data;
  },

  async detail(id: string) {
    const response = await api.get(`orders/${id}/`);
    return response.data;
  },

  async cancel(id: string) {
    const response = await api.post(`orders/${id}/cancel/`);
    return response.data;
  },

};