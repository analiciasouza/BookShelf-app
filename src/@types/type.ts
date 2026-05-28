// ─── Tipos sincronizados com a API Django ────────────────────────

export type BookGenre =
  | 'fiction' | 'non_fiction' | 'mystery' | 'romance'
  | 'science_fiction' | 'fantasy' | 'biography' | 'history'
  | 'self_help' | 'poetry' | 'other';

export type BookStatus = 'available' | 'out_of_stock';

export type Book = {
  id: number;
  title: string;
  author: string;
  description: string | null;
  genre: BookGenre;
  pages: number | null;
  price: string;          // DecimalField vem como string do Django
  stock_quantity: number;
  status: BookStatus;
  cover_image: string | null;   // campo original da API
  coverImage?: string | null;   // alias mapeado pelo bookService (cover_image → coverImage)
  rating: string;
  created_at: string;
  updated_at: string;
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
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  avatar: string | null;
};

export type Address = {
  id: number;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
};

export type PaymentType = 'credit_card' | 'debit_card' | 'pix';

export type PaymentMethod = {
  id: number;
  type: PaymentType;
  last_four_digits: string;
  card_brand: string;
  holder_name: string;
  is_default: boolean;
};

export type OrderStatus = 'pending' | 'confirmed' | 'delivering' | 'delivered' | 'cancelled';

export type OrderItem = {
  id: number;
  book: number;
  book_title: string;
  book_cover: string | null;
  quantity: number;
  unit_price: string;
};

export type Order = {
  id: number;
  order_number: string;
  status: OrderStatus;
  status_display: string;
  total: string;
  shipping_fee: string;
  shipping_address: Address;
  payment_method: number;
  items: OrderItem[];
  created_at: string;
};

export type AuthResponse = {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
};