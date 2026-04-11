import React, { createContext, useContext, useState } from 'react';
import { Cart, Book } from '../@types/type';

interface CartContextData {
  cart: Cart;
  handleAddToCart: (book: Book, quantity?: number) => void;
  handleRemoveFromCart: (bookId: string) => void;
  handleClearCart: () => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });

  function handleAddToCart(book: Book, quantity = 1) {
    setCart(prev => {
      const existing = prev.items.find(i => i.book.id === book.id);
      const items = existing
        ? prev.items.map(i =>
            i.book.id === book.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [...prev.items, { book, quantity }];
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

  return (
    <CartContext.Provider
      value={{ cart, handleAddToCart, handleRemoveFromCart, handleClearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}