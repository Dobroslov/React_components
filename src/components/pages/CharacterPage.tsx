import { ListItems } from '../UI/listItems/ListItems';
import PersonDetails from '../UI/personDetails/PersonDetails';
import { ICharacter } from '../../types/types';

interface SearchResultsProps {
	items: ICharacter[];
	isLoading: boolean;
	onItemSelected: (id: string) => void;
	personId: string | null;
	setIsRightSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isRightSectionOpen: boolean;
}

export const CharacterPage = ({
	items,
	isLoading,
	onItemSelected,
	personId,
	setIsRightSectionOpen,
	isRightSectionOpen,
}: SearchResultsProps) => {
	const closePersonDetails = () => {
		setIsRightSectionOpen(!isRightSectionOpen);
	};

	const handleItemSelection = (id: string) => {
		if (id === personId) {
			closePersonDetails();
		} else {
			onItemSelected(id);
		}
	};

	return (
		<div className='app__content'>
			<ListItems items={items} isLoading={isLoading} onItemSelected={handleItemSelection} />
			{/* <PersonDetails personId={personId} setIsRightSectionOpen={setIsRightSectionOpen} /> */}
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
