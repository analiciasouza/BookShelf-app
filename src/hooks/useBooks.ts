import { useState, useEffect } from 'react';
import { Book } from '../@types/type';

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const mock = [
  { id: '1', title: 'She who became the sun', price: 24.99, author: 'Fiona Charles', coverImage: 'https://covers.openlibrary.org/b/id/11505297-L.jpg' , description: "LOREM IPSUM DOLOR SIT AMET, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor."},
  { id: '2', title: 'This is how you lose the Time War', price: 24.99, author: 'James S.A. Corey', coverImage: 'https://covers.openlibrary.org/b/id/9255920-L.jpg' , description: "LOREM IPSUM DOLOR SIT AMET, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor."},
  { id: '3', title: 'She who became the sun', price: 24.99, author: 'Fiona Charles', coverImage: 'https://covers.openlibrary.org/b/id/11505297-L.jpg' , description: "LOREM IPSUM DOLOR SIT AMET, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor."},
  { id: '4', title: 'This is how you lose the Time War', price: 24.99, author: 'James S.A. Corey', coverImage: 'https://covers.openlibrary.org/b/id/9255920-L.jpg' , description: "LOREM IPSUM DOLOR SIT AMET, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor."},
  { id: '5', title: 'She who became the sun', price: 24.99, author: 'Fiona Charles', coverImage: 'https://covers.openlibrary.org/b/id/11505297-L.jpg' , description: "LOREM IPSUM DOLOR SIT AMET, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor."},
  { id: '6', title: 'This is how you lose the Time War', price: 24.99, author: 'James S.A. Corey', coverImage: 'https://covers.openlibrary.org/b/id/9255920-L.jpg' , description: "LOREM IPSUM DOLOR SIT AMET, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor."},
];
    setBooks(mock);
    setIsLoading(false);
  }, []);

  return { books, isLoading };
}