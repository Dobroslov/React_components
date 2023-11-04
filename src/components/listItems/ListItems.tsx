import { ClipLoader } from 'react-spinners';
import { ICharacter } from '../../types/types';
import { ItemList } from '../itemList/ItemList';

import './ListItems.css';

interface SearchResultsProps {
	items: ICharacter[];
	isLoading: boolean;
	onItemSelected: (id: number) => void;
}

export const ListItems = ({ items, isLoading, onItemSelected }: SearchResultsProps) => {
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
		<ul className='items-list rounded'>
			{items.map((item) => (
				<ItemList key={item.name} item={item} onItemSelected={onItemSelected} />
			))}
		</ul>
	);
};
