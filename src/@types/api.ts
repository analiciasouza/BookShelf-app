// Domínio de Usuário e Segurança
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string; 
  email: string;
  phone: string;
  avatar: string | null;
}

export interface AuthResponse {
  user: User;
  tokens: {
    access: string;
    refresh: string;
  };
}

// Domínio de Livros (Mapeado exatamente do seu book.py)
export type BookGenre = 
  | 'fiction' | 'non_fiction' | 'mystery' | 'romance' 
  | 'science_fiction' | 'fantasy' | 'biography' | 'history' 
  | 'self_help' | 'poetry' | 'other';

export type BookStatus = 'available' | 'out_of_stock';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string | null;
  genre: BookGenre;
  pages: number | null;
  price: string; // Django DecimalField costuma vir como string no JSON para evitar perda de precisão
  stock_quantity: number; 
  status: BookStatus;
  cover_image: string | null;
  rating: string;
  created_at: string;
  updated_at: string;
}

// Domínio de Pagamentos e Endereços (Mapeado de payment.py e order.py)
export type PaymentType = 'credit_card' | 'debit_card' | 'pix';

export interface PaymentMethod {
  id: number;
  user: number;
  type: PaymentType;
  gateway_token: string;
  last_four_digits: string;
  card_brand: string;
  holder_name: string;
  is_default: boolean;
}

export interface Address {
  id: number;
  street_address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  is_default: boolean;
}

// Domínio de Pedidos
export type OrderStatus = 'pending' | 'confirmed' | 'delivering' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: number;
  book: number;
  book_title: string; 
  book_cover: string | null;
  quantity: number;
  unit_price: string;
}

export interface Order {
  id: number;
  order_number: string;
  status: OrderStatus;
  status_display: string; // Ex: "Aguardando pagamento", "Confirmado"
  total: string;
  shipping_fee: string;
  shipping_address: Address; // O seu JSONField guardará a estrutura do endereço escolhido
  payment_method: number;
  items: OrderItem[];
  created_at: string;
}