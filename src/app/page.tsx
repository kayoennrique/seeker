'use client';
import Image from 'next/image';
import { KeyboardEvent, useContext, useRef, useState } from 'react';
import searchIcon from '@/assets/icons/search.svg';
import googleSearchLogo from '@/assets/images/google-search.webp';
import homeIllustration from '@/assets/images/home-illustration.webp';
import { BooksContext } from '@/context/books';
import BooksList from '@/components/books-list';
import Loading from '@/assets/images/loading.gif';

export default function Home() {
	const [search, setSearch] = useState('');
	const inputRef = useRef<HTMLInputElement>(null);
	const context = useContext(BooksContext);

	if (!context) {
		throw new Error('useContext must be used within a BooksProvider');
	}

	const { results, searchBooks, loading } = context;

	const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			searchBooks(search);
		}
	};

	return (
		<main className='w-full mt-[84px] flex-row justify-center items-center self-center'>
			<div className='flex-row justify-center items-center mx-4'>
				<h1 className='text-light-blue font-semibold text-2xl text-center'>
					Que livro você procura?
				</h1>
				<div className='flex items-center justify-center'>
					<div
						className='flex justify-between absolute sm:w-1/2 md:w-1/2 lg:w-1/3 mt-3 px-6 sm:px-3 cursor-pointer z-10'
						onClick={() => inputRef.current?.focus()}
					>
						<Image
							src={googleSearchLogo}
							alt='ícone do google'
							className={`w-16 h-5  ${search.length !== 0 ? 'opacity-0' : 'opacity-35'}`}
						/>
						<Image
							src={searchIcon}
							alt='ícone de busca'
							className='w-5 h-5 z-10'
							onClick={() => searchBooks(search)}
						/>
					</div>
					<input
						ref={inputRef}
						id='search-input'
						type='text'
						className='p-2 pl-8 mt-3 border-2 border-light-blue rounded-[10px] sm:w-1/2 md:w-1/2 lg:w-1/3'
						onChange={(e) => setSearch(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
				<p className='text-dark-gray font-normal text-base text-center mt-2'>
					Busque por assunto, autoria, nome...
				</p>
				{loading && (
					<div className='flex items-center w-full justify-center mt-4'>
						<Image src={Loading} alt='carregando...' />
					</div>
				)}
				{!loading && !results.length && (
					<div className='flex flex-col sm:flex-row justify-between w-full md:px-[80px] lg:px-[100px] xl:px-[200px] 2xl:px-[600px] items-center sm:items-start'>
						<h2 className='text-dark-blue font-semibold text-4xl text-center mt-8 mr-8'>
							Busque o livro que quiser na nossa estante!
						</h2>
						<Image
							src={homeIllustration}
							alt='ilustração da página inicial'
							className='mt-8 sm:mt-2'
						/>
					</div>
				)}
			</div>
			{!loading && !!results.length && <BooksList books={results} />}
		</main>
	);
}
