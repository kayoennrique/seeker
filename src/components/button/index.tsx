interface ButtonProps {
	title: string;
	onClick: () => void;
	variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ title, onClick, variant = 'primary' }) => {
	const bgColor =
		variant === 'primary'
			? 'bg-light-blue text-white hover:bg-dark-blue'
			: 'bg-transparent border-light-blue border-2 text-light-blue hover:border-dark-blue';
	return (
		<button
			className={`h-10 px-4 font-semibold rounded-xl ${bgColor} text-center`}
			onClick={onClick}
		>
			{title}
		</button>
	);
};

export default Button;
