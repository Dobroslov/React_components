import { ClipLoader } from 'react-spinners';
import { ItemList } from '../itemList/ItemList';
import { useAppContext } from '../../../providers/appContext/AppContext';

import './ListItems.css';

interface SearchResultsProps {
	onItemSelected: (id: string) => void;
}

export const ListItems = ({ onItemSelected }: SearchResultsProps) => {
	const { searchResults, isLoading } = useAppContext();
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
				<ItemList key={item.name} item={item} onItemSelected={onItemSelected} />
			))}
		</ul>
	);
};
