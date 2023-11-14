import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vitest } from 'vitest';
import PersonDetails from './PersonDetails';

describe('Person details component', async () => {
	const personId = '1';
	const setIsRightSectionOpen = vitest.fn();
	const closePersonDetails = vitest.fn();

	it('renders loading spinner when isLoading is true', () => {
		render(
			<PersonDetails
				personId={personId}
				setIsRightSectionOpen={setIsRightSectionOpen}
				closePersonDetails={closePersonDetails}
			/>
		);
		const spinner = screen.getByTestId('spinner_person');
		expect(spinner).toBeInTheDocument();
	});
});
