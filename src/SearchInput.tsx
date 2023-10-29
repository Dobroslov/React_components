import React, { Component } from 'react';

interface SearchInputProps {
	searchTerm: string;
	onSearch: () => void;
	onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

class SearchInput extends Component<SearchInputProps> {
	render() {
		const { searchTerm, onSearch, onInputChange } = this.props;

		return (
			<div className='form-inline my-1 my-lg-0'>
				<input
					className='form-control mr-sm-3'
					type='text'
					placeholder='Поиск...'
					value={searchTerm}
					onChange={onInputChange}
				/>
				<button className='btn btn-info my-2 my-sm-0' type='button' onClick={onSearch}>
					Поиск
				</button>
			</div>
		);
	}
}

export default SearchInput;
