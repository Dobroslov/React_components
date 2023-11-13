import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListItems } from './ListItems';
import { vitest } from 'vitest';
import { ICharacter, IPerson } from '../../../types/types';

describe('ListItems component', () => {
	const items: IPerson[] = [
		{
			name: 'Luke Skywalker',
			gender: 'male',
			birth_year: '19BBY',
			eyeColor: 'blue',
			id: '1',
			url: 'https://swapi.dev/api/planets/1/',
		},
		{
			name: 'Han Solo',
			gender: 'male',
			birth_year: '11BBY',
			eyeColor: 'brown',
			id: '2',
			url: 'https://swapi.dev/api/planets/2/',
		},
	];
	const isLoading = true;
	const onItemSelected = vitest.fn();

	it('renders loading spinner when isLoading is true', () => {
		render(<ListItems items={[]} isLoading={isLoading} onItemSelected={onItemSelected} />);

		const spinner = screen.getByTestId('spinner-list');
		expect(spinner).toBeInTheDocument();
	});

	it('renders no items to display message when items array is empty', () => {
		const items: ICharacter[] = [];
		const isLoading = false;
		const onItemSelected = vitest.fn();

		render(<ListItems items={items} isLoading={isLoading} onItemSelected={onItemSelected} />);

		const noItemsMessage = screen.getByText('No items to display.');
		expect(noItemsMessage).toBeInTheDocument();
	});

	it('renders list of items when items array is not empty', () => {
		const isLoading = false;
		const onItemSelected = vitest.fn();

		render(<ListItems items={items} isLoading={isLoading} onItemSelected={onItemSelected} />);

		const listItems = screen.getAllByRole('listitem');
		expect(listItems).toHaveLength(2);
	});

	it('renders ItemList component for each item', () => {
		const isLoading = false;
		const onItemSelected = vitest.fn();

		render(<ListItems items={items} isLoading={isLoading} onItemSelected={onItemSelected} />);

		items.forEach((item) => {
			const itemComponent = screen.getByText(item.name);
			expect(itemComponent).toBeInTheDocument();
		});
	});

	it('calls onItemSelected callback when an item is selected', () => {
		const isLoading = false;
		const onItemSelected = vitest.fn();

		render(<ListItems items={items} isLoading={isLoading} onItemSelected={onItemSelected} />);

		const firstItem = screen.getByText(items[0].name);
		fireEvent.click(firstItem);

		expect(onItemSelected).toHaveBeenCalledWith(items[0].id);
	});

	it('renders a message when no items are available and isLoading is false', () => {
		const items: ICharacter[] = [];
		const isLoading = false;
		const onItemSelected = vitest.fn();

		render(<ListItems items={items} isLoading={isLoading} onItemSelected={onItemSelected} />);

		const noItemsMessage = screen.getByText('No items to display.');
		expect(noItemsMessage).toBeInTheDocument();
	});
});
