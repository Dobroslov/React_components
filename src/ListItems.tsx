import React, { Component } from 'react';

interface Character {
	name: string;
	gender: string;
	birth_year: string;
}

interface SearchResultsProps {
	items: Character[];
	error: string | null;
}

class ListItems extends Component<SearchResultsProps> {
	render() {
		const { items, error } = this.props;
		console.log('file: ListItems.tsx:17 ~ ListItems ~ render ~ items:', items);

		if (error) {
			return <div>Error: {error}</div>;
		}

		return (
			<div>
				{items.map((item) => (
					<div
						key={item.name}
						style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
					>
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
