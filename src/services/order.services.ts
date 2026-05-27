import { api } from './api';

export const orderService = {
  async create(orderData: { items: any[]; total: number; paymentMethod: string }): Promise<any> {
    const payload = {
      items: orderData.items.map(item => ({
        book_id: item.book.id,
        quantity: item.quantity
      })),
      total: orderData.total,
      payment_method: orderData.paymentMethod,
    };

    const response = await api.post('orders/', payload);
    return response.data;
  },

  
  async sendFeedback(feedbackData: { orderId: string; rating: number; comment: string }): Promise<any> {
    const payload = {
      order_id: feedbackData.orderId,
      rating: feedbackData.rating,
      comment: feedbackData.comment
    };

    const response = await api.post('feedback/', payload);
    return response.data;
  }
};