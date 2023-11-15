import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchInput from './SearchInput';
import { AppProvider } from '../../../providers/appContext/AppContext';

describe('SearchInput component', () => {
	it('should render input field', () => {
		render(
			<BrowserRouter>
				<AppProvider>
					<SearchInput />
				</AppProvider>
			</BrowserRouter>
		);

		expect(screen.getByText(/Поиск/i)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(/поиск.../i)).toBeInTheDocument();
	});

	it('onChange works', () => {
		render(
			<BrowserRouter>
				<AppProvider>
					<SearchInput />
				</AppProvider>
			</BrowserRouter>
		);

		const inputElement = screen.getByPlaceholderText(/поиск.../i);

		fireEvent.change(inputElement, { target: { value: 'test' } });

		expect(inputElement).toHaveValue('test');
	});
});
