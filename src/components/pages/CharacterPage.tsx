import PersonDetails from '../UI/personDetails/PersonDetails';
import { ICharacter } from '../../types/types';
import { ListItems } from '../UI/listItems/ListItems';

interface SearchResultsProps {
	items: ICharacter[];
	isLoading: boolean;
	onItemSelected: (id: string) => void;
	personId: string | null;
	setIsRightSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isRightSectionOpen: boolean;
}

export const CharacterPage: React.FC<SearchResultsProps> = ({
	items,
	isLoading,
	onItemSelected,
	personId,
	setIsRightSectionOpen,
	isRightSectionOpen,
}) => {
	const closePersonDetails = () => {
		setIsRightSectionOpen(!isRightSectionOpen);
	};

	const getURL = () => {
		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		searchParams.delete('details');
		url.search = searchParams.toString();
		const modifiedURL = url.toString();
		window.history.replaceState({}, document.title, modifiedURL);
	};

	const handleItemSelection = (id: string) => {
		if (id === personId) {
			closePersonDetails();
			getURL();
		} else {
			onItemSelected(id);
		}
	};

	return (
		<div className='app__content'>
			<ListItems items={items} isLoading={isLoading} onItemSelected={handleItemSelection} />
			{personId && isRightSectionOpen && (
				<PersonDetails
					personId={personId}
					setIsRightSectionOpen={setIsRightSectionOpen}
					closePersonDetails={closePersonDetails}
				/>
			)}
		</div>
	);
};
