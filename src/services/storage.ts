import AsyncStorage from "@react-native-async-storage/async-storage";
import { Book, Cart, CartItem, User } from "../@types/type";

const USERS_KEY = '@bookshop:user';
const BOOKS_KEY = '@bookshop:books';

// ─── Usuário ──────────────────────────────────────────────────────────────────
export async function getUser(): Promise<User | null> {
  const data = await AsyncStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : null;
}

export async function saveUser(user: User): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(user));
}

// ─── Catálogo de livros (vindos da API ou mock local) ─────────────────────────
export async function getBooks(): Promise<Book[]> {
  const data = await AsyncStorage.getItem(BOOKS_KEY);
  return data ? JSON.parse(data) : [];
}

export async function saveBooks(books: Book[]): Promise<void> {
  await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

// ─── Carrinho ─────────────────────────────────────────────────────────────────
export async function getCart(): Promise<Cart> {
  const user = await getUser();
  return user?.cart ?? { items: [], total: 0 };
}

export async function addToCart(book: Book): Promise<void> {
  const user = await getUser();
  if (!user) return;

  const existingItem = user.cart.items.find(item => item.book.id === book.id);

  if (existingItem) {
    // Se já está no carrinho, aumenta a quantidade
    user.cart.items = user.cart.items.map(item =>
      item.book.id === book.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    user.cart.items.push({ book, quantity: 1 });
  }

  user.cart.total = calcTotal(user.cart.items);
  await saveUser(user);
}

export async function removeFromCart(bookId: string): Promise<void> {
  const user = await getUser();
  if (!user) return;

  user.cart.items = user.cart.items.filter(item => item.book.id !== bookId);
  user.cart.total = calcTotal(user.cart.items);
  await saveUser(user);
}

export async function updateCartItemQuantity(bookId: string, quantity: number): Promise<void> {
  const user = await getUser();
  if (!user) return;

  if (quantity <= 0) {
    await removeFromCart(bookId);
    return;
  }

  user.cart.items = user.cart.items.map(item =>
    item.book.id === bookId ? { ...item, quantity } : item
  );
  user.cart.total = calcTotal(user.cart.items);
  await saveUser(user);
}

export async function clearCart(): Promise<void> {
  const user = await getUser();
  if (!user) return;

  user.cart = { items: [], total: 0 };
  await saveUser(user);
}

// ─── Utilitário interno ───────────────────────────────────────────────────────
function calcTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
}