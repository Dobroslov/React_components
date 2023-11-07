import React from 'react';
import { ICharacter } from '../../../types/types';

import './ItemList.css';

interface ItemListProps {
	item: ICharacter;
	onItemSelected: (id: string) => void;
}

export const ItemList: React.FC<ItemListProps> = ({ item, onItemSelected }) => {
	const { name, id } = item;
	if (id) {
		return (
			<li className='list-group__item' onClick={() => onItemSelected(id)}>
				<p>{name}</p>
			</li>
		);
	}
};
