import React, { Component } from 'react';
import SearchInput from './SearchInput';
import ListItems from './ListItems';
import Services from './API/Services';
import ErrorBoundary from './ErrorBoundary';

import './App.css';

interface Character {
	name: string;
	gender: string;
	birth_year: string;
}

interface AppState {
	searchTerm: string;
	searchResults: Character[] | [];
	error: string | null;
	isLoading: boolean;
}

export default class App extends Component<object, AppState> {
	constructor(props: object) {
		super(props);
		this.state = {
			searchTerm: '',
			searchResults: [],
			isLoading: false,
			error: null,
		};
	}

	handleSearch = async () => {
		const { searchTerm } = this.state;
		this.setState({ isLoading: true });
		if (searchTerm.trim() === '') {
			const swapi = new Services();
			swapi.getAllPeople().then((body) => {
				const arrPeople = body;
				this.setState({
					searchResults: arrPeople,
					error: null,
					isLoading: false,
				});
			});

			localStorage.setItem('searchTerm', searchTerm);
		} else {
			const swapi = new Services();
			swapi.searchPeople(searchTerm.trim().toLowerCase()).then((body) => {
				const arrPeople = body.results;
				this.setState({
					searchResults: arrPeople,
					error: null,
					isLoading: false,
				});
			});

			localStorage.setItem('searchTerm', searchTerm);
		}
	};

	handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setState({ searchTerm: e.target.value });
	};

	componentDidMount() {
		const savedSearchTerm = localStorage.getItem('searchTerm');
		if (savedSearchTerm) {
			this.setState({ searchTerm: savedSearchTerm }, () => {
				this.handleSearch();
			});
		} else {
			const swapi = new Services();
			swapi.getAllPeople().then((body) => {
				const arrPeople = body;
				this.setState({
					searchResults: arrPeople,
					error: null,
				});
			});
		}
	}

	render() {
		const { searchTerm, searchResults, isLoading } = this.state;
		return (
			<div>
				<SearchInput
					searchTerm={searchTerm}
					onSearch={this.handleSearch}
					onInputChange={this.handleInputChange}
				/>
				<ErrorBoundary>
					<ListItems items={searchResults} isLoading={isLoading} />
				</ErrorBoundary>
			</div>
		);
	}
}
