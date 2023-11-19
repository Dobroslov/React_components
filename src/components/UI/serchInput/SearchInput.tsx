import React, { useCallback, useEffect } from 'react';
import './SearchInput.css';
import ErrorButton from '../../errorButton/ErrorButton';
import Services from '../../../API/Services';
import { useDispatch, useSelector } from 'react-redux';
import {
	setSearchTerm,
	setIsLoading,
	setTotalPages,
	setSearchResults,
	selectCharacters,
} from '../../../store/StarWarsSlice';

const SearchInput: React.FC = () => {
	const dispatch = useDispatch();
	const { searchTerm, page } = useSelector(selectCharacters);
	const itemsPerPage = 10;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchTerm(e.target.value));
	};

	const handleSearchClick = () => {
		if (searchTerm.trim() === '') {
			handleEmptySearch();
		} else {
			handleSearch(searchTerm);
		}
	};

	const handleSearch = useCallback(
		async (term: string) => {
			const swapi = new Services();
			dispatch(setIsLoading(true));
			swapi.searchPeople(term.trim().toLowerCase()).then((body) => {
				dispatch(setTotalPages(Math.ceil(body.pageNumber / itemsPerPage)));
				dispatch(setSearchResults(body.results));
				dispatch(setIsLoading(false));
			});

			localStorage.setItem('searchTerm', term);
		},
		[dispatch]
	);

	const handleEmptySearch = useCallback(() => {
		const swapi = new Services();
		dispatch(setIsLoading(true));

		swapi.getAllPeople(page).then((body) => {
			dispatch(setSearchResults(body.arrItems));
			dispatch(setTotalPages(Math.ceil(body.pageNumber / itemsPerPage)));
			dispatch(setIsLoading(false));
		});

		localStorage.removeItem('searchTerm');
	}, [dispatch, page]);

	useEffect(() => {
		dispatch(setIsLoading(true));
		const savedSearchTerm = localStorage.getItem('searchTerm');
		if (savedSearchTerm) {
			dispatch(setSearchTerm(savedSearchTerm));
			dispatch(setIsLoading(false));
		} else {
			const swapi = new Services();
			swapi.getAllPeople(page).then((body) => {
				const arrPeople = body.arrItems;
				dispatch(setSearchResults(arrPeople));
				dispatch(setTotalPages(Math.ceil(body.pageNumber / itemsPerPage)));
				dispatch(setIsLoading(false));
			});
		}
	}, [dispatch, page]);

	return (
		<div className='input__field'>
			<input
				className='input-style'
				type='text'
				placeholder='Поиск...'
				value={searchTerm}
				onChange={handleInputChange}
			/>
			<button className='btn' type='button' onClick={handleSearchClick}>
				Поиск
			</button>
			<ErrorButton />
		</div>
	);
};

export default SearchInput;
