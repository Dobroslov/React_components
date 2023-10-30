import React, { Component } from 'react';
import './ListItems.css';

interface Character {
	name: string;
	gender: string;
	birth_year: string;
}

interface SearchResultsProps {
	items: Character[];
}

class ListItems extends Component<SearchResultsProps> {
	render() {
		const { items } = this.props;

		if (items && items.length > 0) {
			return (
				<div>
					{items.map((item) => (
						<div className='list__item' key={item.name}>
							<p>Name: {item.name}</p>
							<p>Gender: {item.gender}</p>
							<p>Birth year: {item.birth_year}</p>
						</div>
					))}
				</div>
			);
		} else {
			return <div>No items to display.</div>;
		}
	}
}

export default ListItems;
