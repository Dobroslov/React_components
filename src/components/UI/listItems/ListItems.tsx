import { ClipLoader } from 'react-spinners';
import { ItemList } from '../itemList/ItemList';
import { useSelector } from 'react-redux';
import { selectCharacters } from '../../../store/StarWarsSlice';

import './ListItems.css';

export const ListItems = () => {
	const { searchResults, isLoading } = useSelector(selectCharacters);

	if (isLoading) {
		return (
			<div className='spinner' data-testid='spinner-list'>
				<ClipLoader color={'#7ce6aa'} loading={isLoading} size={50} />
			</div>
		);
	}

	if (!searchResults || searchResults.length === 0) {
		return <div>No items to display.</div>;
	}

	return (
		<ul className='items-list rounded'>
			{searchResults.map((item) => (
				<ItemList key={item.name} item={item} />
			))}
		</ul>
	);
};
