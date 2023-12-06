// ... (imports and component definition)

import { useDispatch, useSelector } from 'react-redux';
import {
	selectCharacters,
	setIsLoading,
	setSearchResults,
	setSearchTerm,
	setTotalPages,
} from '../../../store/StarWarsSlice';
import { useGetAllPeopleQuery, useSearchPeopleQuery } from '../../../store/starWarsApi';

import './SearchInput.css';
import { useEffect } from 'react';

const SearchInput: React.FC = () => {
	const dispatch = useDispatch();
	const { searchTerm, page } = useSelector(selectCharacters);
	const itemsPerPage = 10;

	const {
		data: searchResults,
		refetch: refetchSearch,
		isLoading: isSearchFetching,
	} = useSearchPeopleQuery(searchTerm);
	const {
		data: getAllPeopleData,
		refetch: refetchAllPeople,
		isFetching: isAllPeopleFetching,
	} = useGetAllPeopleQuery(page);

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

	const handleSearch = async (term: string) => {
		dispatch(setIsLoading(isSearchFetching));

		const resultsWithId =
			searchResults?.results?.map((person) => ({
				...person,
				id: person.url.split('/').slice(-2, -1)[0],
			})) || [];
		dispatch(setSearchResults(resultsWithId));
		if (searchResults) {
			dispatch(setTotalPages(Math.ceil(searchResults.count / itemsPerPage)));
		}

		dispatch(setIsLoading(isSearchFetching));

		localStorage.setItem('searchTerm', term);
	};

	const handleEmptySearch = () => {
		dispatch(setIsLoading(isAllPeopleFetching));

		const allPeopleWithId =
			getAllPeopleData?.results?.map((person) => ({
				...person,
				id: person.url.split('/').slice(-2, -1)[0],
			})) || [];
		dispatch(setSearchResults(allPeopleWithId));
		if (getAllPeopleData) {
			dispatch(setTotalPages(Math.ceil(getAllPeopleData.count / itemsPerPage)));
		}

		dispatch(setIsLoading(isAllPeopleFetching));

		localStorage.removeItem('searchTerm');
	};

	useEffect(() => {
		dispatch(setIsLoading(true));
		refetchSearch();
		refetchAllPeople();

		const savedSearchTerm = localStorage.getItem('searchTerm');
		if (savedSearchTerm) {
			dispatch(setSearchTerm(savedSearchTerm));
		} else {
			if (getAllPeopleData) {
				const allPeopleWithId =
					getAllPeopleData?.results?.map((person) => ({
						...person,
						id: person.url.split('/').slice(-2, -1)[0],
					})) || [];
				dispatch(setSearchResults(allPeopleWithId));
				dispatch(setTotalPages(Math.ceil(getAllPeopleData.count / itemsPerPage)));
			}
		}

		dispatch(setIsLoading(false));
	}, [dispatch, getAllPeopleData, refetchSearch, refetchAllPeople]);

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
		</div>
	);
};

export default SearchInput;
