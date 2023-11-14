import { useCallback, useEffect } from 'react';
import Services from '../../API/Services';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { CharacterPage } from '../pages/CharacterPage';

import './App.css';
import NotFoundPage from '../pages/NotFoundPage';
import { useAppContext } from '../../providers/appContext/AppContext';

export const App: React.FC = () => {
	const navigate = useNavigate();
	const {
		searchTerm,
		setSearchTerm,
		setSearchResults,
		setIsLoading,
		setSelectedPerson,
		setIsRightSectionOpen,
		page,
		setPage,
		setTotalPages,
	} = useAppContext();
	const itemsPerPage = 10;

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
		const updatedURL = `/character/?page=${newPage}`;
		navigate(updatedURL);
	};

	const handleSearch = useCallback(
		async (term: string) => {
			const swapi = new Services();
			setIsLoading(true);
			if (term.trim() === '') {
				swapi.getAllPeople(page).then((body) => {
					setSearchResults(body.arrItems);
					setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
					setIsLoading(false);
				});

				localStorage.setItem('searchTerm', term);
			} else {
				swapi.searchPeople(searchTerm.trim().toLowerCase()).then((body) => {
					setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
					setSearchResults(body.results);
					setIsLoading(false);
				});

				localStorage.setItem('searchTerm', searchTerm);
			}
		},
		[searchTerm, page]
	);

	const onPersonSelected = (id: string) => {
		setSelectedPerson(id);
		setIsRightSectionOpen(true);
		const updatedURL = `/character/?page=${page}&details=${id}`;
		navigate(updatedURL);
	};

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
	}, [handleSearch, searchTerm, page]);

	useEffect(() => {
		navigate('/character/?page=1');
	}, []);

	return (
		<div className='app'>
			<Routes>
				<Route
					path='/'
					element={<Layout onSearch={handleSearch} onPageChange={handlePageChange} />}
				>
					<Route
						index
						path=':characters'
						element={<CharacterPage onItemSelected={onPersonSelected} />}
					/>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
