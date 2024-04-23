import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/images/logo.webp';
import avatarIcon from '@/assets/icons/avatar.svg';

export default function Header() {
	return (
		<header className='bg-dark-blue p-4 text-white'>
			<div className='w-full px-20 flex justify-between items-center'>
				<Link href='/'>
					<Image src={logo} alt='logo buscante' className='hover:opacity-50 cursor-pointer' />
				</Link>
				<nav className='flex items-center'>
					<div>
						<Link href='/my-shelf'>
							<p className='text-white hover:opacity-50 mx-2 cursor-pointer text-lg font-normal'>
								Minha estante
							</p>
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
