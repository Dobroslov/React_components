import PersonDetails from '../UI/personDetails/PersonDetails';
import { ListItems } from '../UI/listItems/ListItems';
import { useAppContext } from '../../providers/appContext/AppContext';

export const CharacterPage: React.FC = () => {
	const { isRightSectionOpen, selectedPerson } = useAppContext();

	return (
		<div className='app__content'>
			<ListItems />
			{selectedPerson && isRightSectionOpen && <PersonDetails />}
		</div>
	);
};
