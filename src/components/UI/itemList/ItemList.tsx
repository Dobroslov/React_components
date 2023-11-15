import React from 'react';
import { ICharacter } from '../../../types/types';
import { useNavigate } from 'react-router-dom';

import './ItemList.css';
import { useAppContext } from '../../../providers/appContext/AppContext';
import { getNewURL } from '../../../helpers/helpers';

interface ItemListProps {
	item: ICharacter;
}

export const ItemList: React.FC<ItemListProps> = ({ item }) => {
	const navigate = useNavigate();
	const {
		setSelectedPerson,
		selectedPerson,
		setIsRightSectionOpen,
		page,
		isRightSectionOpen,
		setURL,
	} = useAppContext();

	const onItemSelected = (id: string) => {
		const updatedURL = `/character/?page=${page}&details=${id}`;
		setIsRightSectionOpen(true);
		setURL(updatedURL);
		navigate(updatedURL);
	};

	const closeItemDetails = () => {
		setIsRightSectionOpen(!isRightSectionOpen);
		getNewURL();
		setURL(`/character/?page=${page}`);
	};

	const handleItemSelection = (id: string) => {
		if (id === selectedPerson) {
			closeItemDetails();
		}

		if (id !== selectedPerson) {
			setSelectedPerson(id);
			onItemSelected(id);
		}
	};

	const { name, id } = item;

	if (id) {
		return (
			<li className='list-group__item' onClick={() => handleItemSelection(id)}>
				<p>{name}</p>
			</li>
		);
	}
};
