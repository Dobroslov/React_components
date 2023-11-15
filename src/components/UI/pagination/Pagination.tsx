import React from 'react';
import './Pagination.css';
import { useAppContext } from '../../../providers/appContext/AppContext';
import { useNavigate } from 'react-router-dom';

const Pagination: React.FC = () => {
	const navigate = useNavigate();
	const { page, setPage, totalPages, setURL } = useAppContext();

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		const updatedURL = `/character/?page=${newPage}`;
		setURL(updatedURL);
		navigate(updatedURL);
	};

	const generatePageNumbers = () => {
		const pages = [];
		for (let i = 1; i <= totalPages; i++) {
			pages.push(
				<li
					key={i}
					className={`page__numbers ${page === i ? 'active' : ''}`}
					onClick={() => handlePageChange(i)}
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
