export type BookStatus = 'read' | 'currently-reading' | 'want-to-read';


export type Book = {
    id: string;
    title: string;
    author: string;
    description: string;
    createdAt: string;
}


export type UserBook = {
    book: Book;
    status: BookStatus;
    review?: Review;
}
export type User = {
    id: string;
    name: string;  
    email: string;
    books: UserBook[];}

export type Review = {
    id: string;
    bookId: number;
    userId: number;
    rating: number;
    review: string;
    createdAt: string;
}

