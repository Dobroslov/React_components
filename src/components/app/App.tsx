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
	const { searchTerm, setSearchTerm, setSearchResults, setIsLoading, page, setTotalPages } =
		useAppContext();
	const itemsPerPage = 10;

	const handleSearch = useCallback(
		async (term: string) => {
			const swapi = new Services();
			setIsLoading(true);

			let actualSearchTerm = term;

			if (term.trim() === '') {
				const savedSearchTerm = localStorage.getItem('searchTerm');
				if (savedSearchTerm) {
					actualSearchTerm = savedSearchTerm;
				}

				swapi.getAllPeople(page).then((body) => {
					setSearchResults(body.arrItems);
					setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
					setIsLoading(false);
				});
			} else {
				swapi.searchPeople(actualSearchTerm.trim().toLowerCase()).then((body) => {
					setTotalPages(Math.ceil(body.pageNumber / itemsPerPage));
					setSearchResults(body.results);
					setIsLoading(false);
				});

				localStorage.setItem('searchTerm', actualSearchTerm);
			}
		},
		[page]
	);

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
				<Route path='/' element={<Layout onSearch={handleSearch} />}>
					<Route index path=':characters' element={<CharacterPage />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
