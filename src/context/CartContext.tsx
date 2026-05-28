import React, { createContext, useContext, useState } from 'react';

type Book = {
  id: number;
  title: string;
  author: string;
  price: string; // vem como string do Django DecimalField
  cover_image: string | null;
  coverImage?: string; // alias mapeado pelo bookService
  description: string | null;
  genre: string;
  status: string;
};

type CartItem = {
  book: Book;
  quantity: number;
};

type Cart = {
  items: CartItem[];
  total: number;
};

interface CartContextData {
  cart: Cart;
  handleAddToCart: (book: Book, quantity?: number) => void;
  handleRemoveFromCart: (bookId: number) => void;
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

      // price vem como string do backend — converte para number
      const total = items.reduce((sum, i) => sum + Number(i.book.price) * i.quantity, 0);
      return { items, total };
    });
  }

  function handleRemoveFromCart(bookId: number) {
    setCart(prev => {
      const items = prev.items.filter(i => i.book.id !== bookId);
      const total = items.reduce((sum, i) => sum + Number(i.book.price) * i.quantity, 0);
      return { items, total };
    });
  }

  function handleClearCart() {
    setCart({ items: [], total: 0 });
  }

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, handleClearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// ← estava faltando — causa o erro "CartProvider is not a function/hook"
export function useCart() {
  return useContext(CartContext);
}