import { render, screen, fireEvent } from '@testing-library/react';
import { vitest } from 'vitest';
import Pagination from './Pagination';

describe('Pagination component', () => {
	const onPageChange = vitest.fn();

	it('renders correct page numbers and buttons', () => {
		render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />);

		for (let i = 1; i <= 5; i++) {
			const pageNumber = screen.getByText(i.toString());
			expect(pageNumber).toBeInTheDocument();
			if (i === 2) {
				expect(pageNumber).toHaveClass('active');
			}
		}

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
});
