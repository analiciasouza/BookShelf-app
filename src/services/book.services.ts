import { api } from './api';
import { Book } from '../@types/type';

export const bookService = {
  async list(): Promise<Book[]> {
    const response = await api.get('books/');
    return response.data.map((book: any) => ({
      ...book,
      coverImage: book.cover_image,
    }));
  },

  async detail(id: string): Promise<Book> {
    const response = await api.get(`books/${id}/`);
    return {
      ...response.data,
      coverImage: response.data.cover_image,
    };
  },

 
  async login(credentials: { email: string; password: string }): Promise<any> {
    const response = await api.post('auth/login/', credentials);
    return response.data; 
  },

  async register(userData: any): Promise<any> {
    const response = await api.post('auth/register/', userData);
    return response.data;
  },


  async saveAddress(addressData: { city: string; block: string; street_name: string; avenue?: string }): Promise<any> {
    const response = await api.post('addresses/', addressData);
    return response.data;
  },

  async createOrder(orderData: { items: any[]; total: number; payment_method: string }): Promise<any> {
    const response = await api.post('orders/', orderData);
    return response.data;
  }
};