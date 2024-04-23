import { Book } from '@/context/books';
import BookCard from '../book-card';

interface BooksListProps {
	books: Book[];
	isMyShelf?: boolean;
}

const BooksList: React.FC<BooksListProps> = ({ books, isMyShelf = false }) => (
	<div className='mx-4 md:mx-10 xl:mx-60'>
		<p className='mt-4 text-dark-gray font-normal text-base opacity-50'>
			{books.length} Resultados encontrados
		</p>
		<div className='grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3'>
			{books.map((book) => (
				<BookCard key={book.id} book={book} variant='small' isRemoveButton={isMyShelf} />
			))}
		</div>
	</div>
);

export default BooksList;
