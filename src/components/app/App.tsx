import { useCallback, useEffect, useState } from 'react';
import Services from '../../API/Services';
import { ICharacter } from '../../types/types';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from '../../Layout/Layout';
import { CharacterPage } from '../pages/CharacterPage';

export const App: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<ICharacter[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
	const [isRightSectionOpen, setIsRightSectionOpen] = useState(false);
	console.log('file: App.tsx:16 ~ isRightSectionOpen:', isRightSectionOpen);

	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const itemsPerPage = 10;

	const handlePageChange = (newPage: number) => {
		setPage(newPage);
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

	return (
		<div className='app'>
			<Routes>
				<Route
					path='/'
					element={
						<Layout
							onSearch={handleSearch}
							currentPage={page}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					}
				>
					<Route
						index
						element={
							<CharacterPage
								items={searchResults}
								isLoading={isLoading}
								onItemSelected={onPersonSelected}
								personId={selectedPerson}
								setIsRightSectionOpen={setIsRightSectionOpen}
								isRightSectionOpen={isRightSectionOpen}
							/>
						}
					/>
					<Route path='planets' element={<div>Planets Content</div>} />
					<Route path='ships' element={<div>Ships Content</div>} />
				</Route>
			</Routes>
		</div>
	);
};
