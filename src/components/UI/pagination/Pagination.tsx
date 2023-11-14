import React from 'react';
import './Pagination.css';
import { useAppContext } from '../../../providers/appContext/AppContext';

interface IPaginationProps {
	onPageChange: (page: number) => void;
}

const Pagination: React.FC<IPaginationProps> = ({ onPageChange }) => {
	const { page, totalPages } = useAppContext();
	const generatePageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<li
					key={i}
					className={`page__numbers ${page === i ? 'active' : ''}`}
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
			<ul className='pagination__list'>{generatePageNumbers()}</ul>
		</div>
	);
};

export default Pagination;
