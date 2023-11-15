import React, { FC, useCallback, useEffect } from 'react';
import './SearchInput.css';
import ErrorButton from '../../errorButton/ErrorButton';
import Services from '../../../API/Services';
import { useAppContext } from '../../../providers/appContext/AppContext';

const SearchInput: FC = () => {
	const {
		searchTerm,
		setSearchTerm,
		setSearchResults,
		setIsLoading,
		page,
		setTotalPages,
		searchResults,
	} = useAppContext();
	const itemsPerPage = 10;

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
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
			setIsLoading(true);

			swapi.searchPeople(term.trim().toLowerCase()).then((body) => {
				setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
				setSearchResults(body.results);
				setIsLoading(false);
			});

			localStorage.setItem('searchTerm', term);
		},
		[setSearchResults, setIsLoading, setTotalPages]
	);

	const handleEmptySearch = useCallback(() => {
		const swapi = new Services();
		setIsLoading(true);

		swapi.getAllPeople(page).then((body) => {
			setSearchResults(body.arrItems);
			setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
			setIsLoading(false);
		});

		localStorage.removeItem('searchTerm');
	}, [setSearchResults, setIsLoading, setTotalPages, page]);

	useEffect(() => {
		setIsLoading(true);
		const savedSearchTerm = localStorage.getItem('searchTerm');
		if (savedSearchTerm) {
			setSearchTerm(savedSearchTerm);
			setIsLoading(false);
		} else {
			const swapi = new Services();
			swapi.getAllPeople(page).then((body) => {
				const arrPeople = body.arrItems;
				setSearchResults(arrPeople);
				setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
				setIsLoading(false);
			});
		}
	}, [setSearchTerm, setSearchResults, setIsLoading, setTotalPages, page]);

	useEffect(() => {
		console.log(searchResults);
	}, [searchResults]);

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
