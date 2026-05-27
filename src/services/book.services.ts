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
  }
};