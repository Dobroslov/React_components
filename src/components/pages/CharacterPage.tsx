import React from 'react';
import { ListItems } from '../UI/listItems/ListItems';
import PersonDetails from '../UI/personDetails/PersonDetails';
import { ICharacter } from '../../types/types';

interface SearchResultsProps {
	items: ICharacter[];
	isLoading: boolean;
	onItemSelected: (id: string) => void;
	personId: string | null;
}

export const CharacterPage = ({
	items,
	isLoading,
	onItemSelected,
	personId,
}: SearchResultsProps) => {
	return (
		<div className='app__content'>
			<ListItems items={items} isLoading={isLoading} onItemSelected={onItemSelected} />

			<PersonDetails personId={personId} />
		</div>
	);
};
