import React, { FC } from 'react';
import './SearchInput.css';
import ErrorButton from '../errorButton/ErrorButton';

interface SearchInputProps {
	searchTerm: string;
	onSearch: () => void;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({
	searchTerm,
	onSearch,
	onInputChange,
}: SearchInputProps) => {
	return (
		<div className='input__field'>
			<input
				className='input-style'
				type='text'
				placeholder='Поиск...'
				value={searchTerm}
				onChange={onInputChange}
			/>
			<button className='btn' type='button' onClick={onSearch}>
				Поиск
			</button>
			<ErrorButton />
		</div>
	);
};

export default SearchInput;
