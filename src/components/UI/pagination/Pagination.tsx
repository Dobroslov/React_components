import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectCharacters, setPage } from '../../../store/StarWarsSlice';

import './Pagination.css';

const Pagination: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { page, totalPages } = useSelector(selectCharacters);

	const handlePageChange = (newPage: number) => {
		dispatch(setPage(newPage));
		const updatedURL = `/character/?page=${newPage}`;
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
