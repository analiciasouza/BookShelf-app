// ─── Livro ────────────────────────────────────────────────────────────────────
export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price: number;         // preço em reais
  coverImage: string;    // URL da capa
  stock: number;         // quantidade disponível
  category: string;
  createdAt: string;
};

// ─── Carrinho ─────────────────────────────────────────────────────────────────
export type CartItem = {
  book: Book;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;         // calculado na hora de exibir
};

// ─── Usuário ──────────────────────────────────────────────────────────────────
export type User = {
  id: string;
  name: string;
  email: string;
  cart: Cart;
};