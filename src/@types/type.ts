
export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;         
  coverImage: string;          
};


export type CartItem = {
  book: Book;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;         
};


export type User = {
  id: string;
  name: string;
  email: string;
  cart: Cart;
};