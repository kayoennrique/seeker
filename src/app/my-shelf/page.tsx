'use client';

import BooksList from '@/components/books-list';
import Notification from '@/components/notification';
import { BooksContext } from '@/context/books';
import { useContext } from 'react';

export default function MyShelf() {
	const context = useContext(BooksContext);

	if (!context) {
		throw new Error('useContext must be used within a BooksProvider');
	}

	const { myShelf, notification } = context;

	return (
		<div>
			<h1 className='text-light-blue font-semibold text-4xl text-center mt-10'>Minha Estante</h1>
			<BooksList books={myShelf} isMyShelf />
			{notification.showNotification && <Notification {...notification} />}
		</div>
	);
}
