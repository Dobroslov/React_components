import { fireEvent, render, screen } from '@testing-library/react';
import { vitest } from 'vitest';
import { ICharacter } from '../../../types/types';
import { ItemList } from './ItemList';

describe('ItemList component', () => {
	const character: ICharacter = {
		name: 'Luke Skywalker',
		id: '1',
		url: 'https://swapi.dev/api/planets/1/',
	};
	it('renders list item with character name', () => {
		const onItemSelected = vitest.fn();

		render(<ItemList item={character} onItemSelected={onItemSelected} />);

		const listItem = screen.getByText('Luke Skywalker');
		expect(listItem).toBeInTheDocument();
	});

	it('calls onItemSelected prop when list item is clicked', () => {
		const character: ICharacter = {
			name: 'Han Solo',
			id: '2',
			url: 'https://swapi.dev/api/planets/2/',
		};
		const onItemSelected = vitest.fn();

		render(<ItemList item={character} onItemSelected={onItemSelected} />);

		const listItem = screen.getByText('Han Solo');
		fireEvent.click(listItem);

		expect(onItemSelected).toHaveBeenCalledTimes(1);
		expect(onItemSelected).toHaveBeenCalledWith(character.id);
	});

	it('renders without errors', () => {
		const onItemSelected = vitest.fn();
		render(<ItemList item={character} onItemSelected={onItemSelected} />);
	});

	it('renders the correct content', () => {
		const onItemSelected = vitest.fn();
		const { getByText } = render(<ItemList item={character} onItemSelected={onItemSelected} />);
		const listItem = getByText(character.name);

		expect(listItem).toBeInTheDocument();
	});
});
