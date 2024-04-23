'use client';
import { createContext, useState, FunctionComponent, ReactNode } from 'react';

export interface Book {
	id: string;
	volumeInfo: {
		title: string;
		authors: string[];
		description: string;
		pageCount: number;
		publishedDate: string;
		publisher: string;
		imageLinks: {
			thumbnail: string;
		};
	};
}

interface BooksContextData {
	results: Book[];
	searchBooks: (query: string) => Promise<void>;
	loading: boolean;
	selectedBook?: Book;
	setSelectedBook: (book: Book) => void;
}

interface BooksProviderProps {
	children: ReactNode;
}

export const BooksContext = createContext<BooksContextData | undefined>(undefined);

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
	const [results, setResults] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);

	const searchBooks = async (query: string) => {
		setLoading(true);
		try {
			const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
			const data = await response.json();
			setResults(data.items);
			console.log(data.items);
		} catch (error) {
			console.error('Error fetching data: ', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<BooksContext.Provider value={{ results, searchBooks, loading, selectedBook, setSelectedBook }}>
			{children}
		</BooksContext.Provider>
	);
};
