import { api } from './api';
import { Book } from '../@types/type';

export const bookService = {
  async list(): Promise<Book[]> {
    const response = await api.get('books/');
    return response.data;
  },

  async detail(id: string): Promise<Book> {
    const response = await api.get(`books/${id}/`);
    return response.data;
  },
};