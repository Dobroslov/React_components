import React, { Component } from 'react';
import './ListItems.css';
import { ClipLoader } from 'react-spinners';

interface Character {
	name: string;
	gender: string;
	birth_year: string;
}

interface SearchResultsProps {
	items: Character[];
	isLoading: boolean;
}

class ListItems extends Component<SearchResultsProps> {
	render() {
		const { items, isLoading } = this.props;
		console.log('file: ListItems.tsx:19 ~ ListItems ~ render ~ isLoading:', isLoading);
		if (isLoading) {
			return (
				<div className='spinner'>
					<ClipLoader color={'#000'} loading={isLoading} size={50} />
				</div>
			);
		}

		if (!items || items.length === 0) {
			return <div>No items to display.</div>;
		}

		return (
			<div className='list'>
				{items.map((item) => (
					<div className='list__item' key={item.name}>
						<p>Name: {item.name}</p>
						<p>Gender: {item.gender}</p>
						<p>Birth year: {item.birth_year}</p>
					</div>
				))}
			</div>
		);
	}
}

export default ListItems;
