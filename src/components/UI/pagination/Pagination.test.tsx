import { render, screen, fireEvent } from '@testing-library/react';
import { vitest } from 'vitest';
import Pagination from './Pagination';

describe('Pagination component', () => {
	const onPageChange = vitest.fn();

	it('renders correct page numbers and buttons', () => {
		render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

		// Check if the correct page numbers are rendered
		for (let i = 1; i <= 5; i++) {
			const pageNumber = screen.getByText(i.toString());
			expect(pageNumber).toBeInTheDocument();
			if (i === 2) {
				expect(pageNumber).toHaveClass('active');
			}
		}

		// Check if previous and next buttons are rendered
		const previousButton = screen.getByText('←');
		const nextButton = screen.getByText('→');
		expect(previousButton).toBeInTheDocument();
		expect(nextButton).toBeInTheDocument();
	});

	it('calls onPageChange when a page number is clicked', () => {
		render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

		const pageNumber3 = screen.getByText('3');
		fireEvent.click(pageNumber3);

		expect(onPageChange).toHaveBeenCalledWith(3);
	});

	it('calls onPageChange with the correct page when previous button is clicked', () => {
		render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

		const previousButton = screen.getByText('←');
		fireEvent.click(previousButton);

		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it('calls onPageChange with the correct page when next button is clicked', () => {
		render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

		const nextButton = screen.getByText('→');
		fireEvent.click(nextButton);

		expect(onPageChange).toHaveBeenCalledWith(4);
	});
});
