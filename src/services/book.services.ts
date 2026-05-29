import { api } from './api';
import { Book } from '../@types/type';

export const bookService = {
  async list(): Promise<Book[]> {
    const response = await api.get('/books/');
    
    // Pegamos a URL base que você configurou no seu .env através do Axios
    const baseUrl = api.defaults.baseURL || ''; 
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

    return response.data.map((book: any) => {
      let rawImage = book.cover_image;
      let correctedImageUrl = '';

      if (rawImage) {
        if (rawImage.startsWith('http')) {

          correctedImageUrl = rawImage;
        } else {
          const path = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
          correctedImageUrl = `${cleanBaseUrl}${path}`;
        }
      }

      return {
        ...book,
        coverImage: correctedImageUrl, 
      };
    });
  },

  async detail(id: string): Promise<Book> {
    const response = await api.get(`/books/${id}/`);
    const baseUrl = api.defaults.baseURL || '';
    const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    
    let rawImage = response.data.cover_image;
    let correctedImageUrl = '';

    if (rawImage) {
      if (rawImage.startsWith('http')) {
        correctedImageUrl = rawImage;
      } else {
        const path = rawImage.startsWith('/') ? rawImage : `/${rawImage}`;
        correctedImageUrl = `${cleanBaseUrl}${path}`;
      }
    }

    return {
      ...response.data,
      coverImage: correctedImageUrl,
    };
  }
};