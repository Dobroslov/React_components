import React, { useCallback, useEffect, useState } from 'react';
import SearchInput from '../serchInput/SearchInput';
import { ListItems } from '../listItems/ListItems';
import Services from '../../API/Services';
import { ICharacter } from '../../types/types';

import './App.css';
import Header from '../UI/header/Header';
import PersonDetails from '../UI/personDetails/PersonDetails';

export const App = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [searchResults, setSearchResults] = useState<ICharacter[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedPerson, setSelectedPerson] = useState<null | number>(null);

	const handleSearch = useCallback(async () => {
		setIsLoading(true);
		setIsLoading(true);
		if (searchTerm.trim() === '') {
			const swapi = new Services();
			swapi.getAllPeople().then((body) => {
				const arrPeople = body;
				setSearchResults(arrPeople);
				setIsLoading(false);
			});

			localStorage.setItem('searchTerm', searchTerm);
		} else {
			const swapi = new Services();
			swapi.searchPeople(searchTerm.trim().toLowerCase()).then((body) => {
				const arrPeople = body.results;
				setSearchResults(arrPeople);
				setIsLoading(false);
			});

			localStorage.setItem('searchTerm', searchTerm);
		}
	}, [searchTerm]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const onPersonSelected = (id: number) => {
		setSelectedPerson(id);
	};

	useEffect(() => {
		const savedSearchTerm = localStorage.getItem('searchTerm');
		if (savedSearchTerm) {
			setSearchTerm(savedSearchTerm);
			handleSearch();
		} else {
			const swapi = new Services();
			swapi.getAllPeople().then((body) => {
				const arrPeople = body;
				setSearchResults(arrPeople);
			});
		}
	}, [handleSearch, searchTerm]);

	return (
		<div className='app'>
			<Header />
			<SearchInput
				searchTerm={searchTerm}
				onSearch={handleSearch}
				onInputChange={handleInputChange}
			/>
			<div className='app__content'>
				<ListItems items={searchResults} isLoading={isLoading} onItemSelected={onPersonSelected} />
				<PersonDetails personId={selectedPerson} />
				{/* (selectedPerson ? <PersonDetails personId={selectedPerson} /> : null) */}
			</div>
		</div>
	);
};
