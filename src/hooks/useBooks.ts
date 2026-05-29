import { useState, useEffect } from 'react';
import { Book } from '../@types/type';
import { bookService } from '../services/book.services';

export function useBooks() {
  const [books, setBooks]       = useState<Book[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await bookService.list();
        setBooks(data);
      } catch (e) {
        setError('Não foi possível carregar os livros.');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { books, isLoading, error };
}