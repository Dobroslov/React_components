import { render } from '@testing-library/react';
import { Router } from 'react-router';
import { App } from '../components/app/App';
import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { store } from '../store';
import { Provider } from 'react-redux';

describe('Renders main page correctly', async () => {
	it('NotFound page open with wrong path', () => {
		const history = createMemoryHistory();
		render(
			<Provider store={store}>
				<Router navigator={history} location={'/non-existent-path'}>
					<App />
				</Router>
			</Provider>
		);
		expect(screen.getByText(/not found/i)).toBeInTheDocument();
	});
});
