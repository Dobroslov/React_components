import React from 'react';
import './Pagination.css';

interface IPaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
	const generatePageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<li
					key={i}
					className={`page__numbers ${currentPage === i ? 'active' : ''}`}
					onClick={() => onPageChange(i)}
				>
					{i}
				</li>
			);
		}
		return pages;
	};

	return (
		<div className='pagination__container'>
			<ul className='pagination__list'>
				<li className='page__btn' onClick={() => onPageChange(currentPage - 1)}>
					&larr;
				</li>
				{generatePageNumbers()}
				<li className='page__btn' onClick={() => onPageChange(currentPage + 1)}>
					&rarr;
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
