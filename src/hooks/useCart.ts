import { useState, useEffect } from 'react';
import { Cart, Book } from '../@types/type';


export function useCart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

function handleAddToCart(book: Book) {
    setCart(prev => {
      const existing = prev.items.find(i => i.book.id === book.id);
      const items = existing
        ? prev.items.map(i => i.book.id === book.id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev.items, { book, quantity: 1 }];
      const total = items.reduce((sum, i) => sum + i.book.price * i.quantity, 0);
      return { items, total };
    });
  }


function handleRemoveFromCart(bookId: string) {
    setCart(prev => {
      const items = prev.items.filter(i => i.book.id !== bookId);
      const total = items.reduce((sum, i) => sum + i.book.price * i.quantity, 0);
      return { items, total };
    });
  }

  function handleClearCart() {
    setCart({ items: [], total: 0 });
  }

  return { cart, handleAddToCart, handleRemoveFromCart, handleClearCart };
}