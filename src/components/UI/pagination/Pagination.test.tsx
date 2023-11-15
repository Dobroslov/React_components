import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Pagination from './Pagination';
import { AppProvider } from '../../../providers/appContext/AppContext';

describe('Pagination component', () => {
	it('should render pagination list', () => {
		render(
			<BrowserRouter>
				<AppProvider>
					<Pagination />
				</AppProvider>
			</BrowserRouter>
		);

		expect(screen.queryByRole('list')).toBeInTheDocument();
	});
});
