import AsyncStorage from "@react-native-async-storage/async-storage";   
import { Book, User, UserBook, Review } from "../@types";

const BOOKS_KEY ='@bookslog:books';
const USERS_KEY = '@bookslog:user';


// Buscar todos os livros armazenados
export async function getBooks(): Promise<Book[]> {
    const data = await AsyncStorage.getItem(BOOKS_KEY);
    return data ? JSON.parse(data) : [];
}

// Salvar um novo livro
export async function saveBook(book: Book): Promise<void> {
    const books = await getBooks();
    books.push(book);
    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(books));
}

// Remover um livro pelo ID
export async function deleteBook(id: string): Promise<void> {
    const books = await getBooks();
    const updatedBooks = books.filter(book => book.id !== id);
    await AsyncStorage.setItem(BOOKS_KEY, JSON.stringify(updatedBooks));
}

// Usuário
export async function getUser(): Promise<User | null> {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : null;
}

export async function saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(user));
}

export async function addBookToUser(userBook: UserBook): Promise<void> {
    const user = await getUser()
    if (!user) return

    user.books.push(userBook);
    await saveUser(user);
}

export async function updateBookStatus(bookId: string, status: UserBook['status']): Promise<void> {
    const user = await getUser();
    if (!user) return; 

    user.books = user.books.map(ub => ub.book.id === bookId ? { ...ub, status } : ub);
    await saveUser(user);
}

export async function removeBookFromUser(bookId: string): Promise<void> {
    const user = await getUser();
    if (!user) return;

    user.books = user.books.filter(ub => ub.book.id !== bookId);
    await saveUser(user);
}

export async function saveReview(bookId: string, review: Review): Promise<void> {
    const user = await getUser();
    if (!user) return;

    user.books = user.books.map(ub => ub.book.id === bookId ? { ...ub, review } : ub);
    await saveUser(user);
}