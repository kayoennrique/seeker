'use client';
import { NotificationProps } from '@/components/notification';
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
	myShelf: Book[];
	addToShelf: (book: Book) => void;
	notification: NotificationProps;
	removeFromShelf: (book: Book) => void;
}

interface BooksProviderProps {
	children: ReactNode;
}

export const BooksContext = createContext<BooksContextData | undefined>(undefined);

export const BooksProvider: React.FC<BooksProviderProps> = ({ children }) => {
	const [results, setResults] = useState<Book[]>([]);
	const [myShelf, setMyShelf] = useState<Book[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [selectedBook, setSelectedBook] = useState<Book | undefined>(undefined);
	const [notification, setNotification] = useState<NotificationProps>({
		title: '',
		message: '',
		showNotification: false,
	});

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

	const addToShelf = (book: Book) => {
		const isDuplicate = myShelf.some((item) => item.id === book.id);
		if (isDuplicate) {
			setNotification({
				title: 'Oops! Ocorreu um erro',
				message: 'Este livro já está na sua estante. Adicione outro livro.',
				showNotification: true,
			});
			setTimeout(() => {
				setNotification({ title: '', message: '', showNotification: false });
			}, 2500);
			return;
		}
		setMyShelf((previousBooks) => [...previousBooks, book]);
		setNotification({
			title: 'Sucesso!',
			message: 'Livro adicionado com sucesso na sua estante.',
			showNotification: true,
		});
		setTimeout(() => {
			setNotification({ title: '', message: '', showNotification: false });
		}, 2500);
		return;
	};

	const removeFromShelf = (book: Book) => {
		setMyShelf((previousBooks) => previousBooks.filter((item) => item.id !== book.id));
		setNotification({
			title: 'Sucesso!',
			message: 'O livro foi removido com sucesso da sua estante.',
			showNotification: true,
		});
		setTimeout(() => {
			setNotification({ title: '', message: '', showNotification: false });
		}, 2500);
	};

	return (
		<BooksContext.Provider
			value={{
				results,
				searchBooks,
				loading,
				selectedBook,
				setSelectedBook,
				myShelf,
				addToShelf,
				notification,
				removeFromShelf,
			}}
		>
			{children}
		</BooksContext.Provider>
	);
};
