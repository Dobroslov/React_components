import React, { Component } from 'react';
import './SearchInput.css';

interface SearchInputProps {
	searchTerm: string;
	onSearch: () => void;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<SearchInputProps> {
	render() {
		const { searchTerm, onSearch, onInputChange } = this.props;

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
			</div>
		);
	}
}

export default SearchInput;
