import React from 'react';
import { ICharacter } from '../../../types/types';
import { useNavigate } from 'react-router-dom';
import { getNewURL } from '../../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectCharacters,
	setIsRightSectionOpen,
	setSelectedPerson,
	setURL,
} from '../../../store/StarWarsSlice';

import './ItemList.css';

interface ItemListProps {
	item: ICharacter;
}

export const ItemList: React.FC<ItemListProps> = ({ item }) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const { selectedPerson, isRightSectionOpen, page } = useSelector(selectCharacters);

	const onItemSelected = (id: string) => {
		const updatedURL = `/character/?page=${page}&details=${id}`;
		dispatch(setIsRightSectionOpen(true));
		dispatch(setURL(updatedURL));
		navigate(updatedURL);
	};

	const closeItemDetails = () => {
		dispatch(setIsRightSectionOpen(!isRightSectionOpen));
		getNewURL();
		dispatch(setURL(`/character/?page=${page}`));
	};

	const handleItemSelection = (id: string) => {
		if (id === selectedPerson) {
			closeItemDetails();
		}

		if (id !== selectedPerson) {
			dispatch(setSelectedPerson(id));
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
