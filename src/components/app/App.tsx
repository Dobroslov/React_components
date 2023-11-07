import { useCallback, useEffect, useState } from 'react';
import Services from '../../API/Services';
import { ICharacter } from '../../types/types';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Layout from '../../Layout/Layout';
import { CharacterPage } from '../pages/CharacterPage';
import PersonDetails from '../UI/personDetails/PersonDetails';

export const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<ICharacter[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

	const handleSearch = useCallback(
		async (term: string) => {
			setIsLoading(true);
			if (term.trim() === '') {
				const swapi = new Services();
				swapi.getAllPeople().then((body) => {
					const arrPeople = body;
					setSearchResults(arrPeople);
					setIsLoading(false);
				});

				localStorage.setItem('searchTerm', term);
			} else {
				const swapi = new Services();
				swapi.searchPeople(searchTerm.trim().toLowerCase()).then((body) => {
					const arrPeople = body.results;
					setSearchResults(arrPeople);
					setIsLoading(false);
				});

				localStorage.setItem('searchTerm', searchTerm);
			}
		},
		[searchTerm]
	);

	const onPersonSelected = (id: string) => {
		setSelectedPerson(id);
	};

	useEffect(() => {
		setIsLoading(true);
		const savedSearchTerm = localStorage.getItem('searchTerm');
		if (savedSearchTerm) {
			setSearchTerm(savedSearchTerm);
			setIsLoading(false);
		} else {
			const swapi = new Services();
			swapi.getAllPeople().then((body) => {
				const arrPeople = body;
				setSearchResults(arrPeople);
				setIsLoading(false);
			});
		}
	}, [handleSearch, searchTerm]);

	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<Layout onSearch={handleSearch} />}>
					<Route
						index
						path='characters'
						element={
							<CharacterPage
								items={searchResults}
								isLoading={isLoading}
								onItemSelected={onPersonSelected}
								personId={selectedPerson}
							/>
						}
					/>
					<Route
						path={`characters/:details`}
						element={<PersonDetails personId={selectedPerson} />}
					/>
					<Route path='planets' element={<div>Planets Content</div>} />
					<Route path='ships' element={<div>Ships Content</div>} />
				</Route>
			</Routes>
		</div>
	);
};
