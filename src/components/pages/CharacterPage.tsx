import PersonDetails from '../UI/personDetails/PersonDetails';
import { ListItems } from '../UI/listItems/ListItems';
import { useSelector } from 'react-redux';
import { selectCharacters } from '../../store/StarWarsSlice';

export const CharacterPage: React.FC = () => {
	const { isRightSectionOpen, selectedPerson } = useSelector(selectCharacters);

	return (
		<div className='app__content'>
			<ListItems />
			{selectedPerson && isRightSectionOpen && <PersonDetails />}
		</div>
	);
};
