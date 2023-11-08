import React, { FC, useState } from 'react';
import './SearchInput.css';
import ErrorButton from '../../errorButton/ErrorButton';

interface SearchInputProps {
	onSearch: (searchTerm: string) => void;
}

const SearchInput: FC<SearchInputProps> = ({ onSearch }: SearchInputProps) => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSearchClick = () => {
		onSearch(searchTerm);
	};

	return (
		<div className='input__field'>
			<input
				className='input-style'
				type='text'
				placeholder='Поиск...'
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<button className='btn' type='button' onClick={handleSearchClick}>
				Поиск
			</button>
			<ErrorButton />
		</div>
	);
};

export default SearchInput;
