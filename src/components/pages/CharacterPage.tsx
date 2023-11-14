import PersonDetails from '../UI/personDetails/PersonDetails';
import { ListItems } from '../UI/listItems/ListItems';
import { useAppContext } from '../../providers/appContext/AppContext';

interface SearchResultsProps {
	onItemSelected: (id: string) => void;
}

export const CharacterPage: React.FC<SearchResultsProps> = ({ onItemSelected }) => {
	const { isRightSectionOpen, setIsRightSectionOpen, selectedPerson } = useAppContext();

	const getURL = () => {
		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		searchParams.delete('details');
		url.search = searchParams.toString();
		const modifiedURL = url.toString();
		window.history.replaceState({}, document.title, modifiedURL);
	};

	// const onPersonSelected = (id: string) => {
	// 	setSelectedPerson(id);
	// 	setIsRightSectionOpen(true);
	// 	const updatedURL = `/character/?page=${page}&details=${id}`;
	// 	navigate(updatedURL);
	// };

	const closeItemDetails = () => {
		setIsRightSectionOpen(!isRightSectionOpen);
	};

	const handleItemSelection = (id: string) => {
		if (id === selectedPerson) {
			closeItemDetails();
			getURL();
		} else {
			onItemSelected(id);
		}
	};

	return (
		<div className='app__content'>
			<ListItems onItemSelected={handleItemSelection} />
			{selectedPerson && isRightSectionOpen && <PersonDetails />}
		</div>
	);
};
