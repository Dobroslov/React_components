import React, { Component } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';

import './App.css';
import ListItems from './ListItems';
import Services from './API/Services';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from './ErrorButton';

interface Character {
	name: string;
	gender: string;
	birth_year: string;
}

interface AppState {
	searchTerm: string;
	searchResults: Character[] | [];
	error: string | null;
}
export default class App extends Component<object, AppState> {
	constructor(props: object) {
		super(props);
		this.state = {
			searchTerm: '',
			searchResults: [],
			error: null,
		};
	}

	handleSearch = async () => {
		const { searchTerm } = this.state;
		try {
			const swapi = new Services();
			swapi.getAllPeople().then((body) => {
				const arrPepople = body;
				this.setState({
					searchResults: arrPepople,
					error: null,
				});
				localStorage.setItem('searchTerm', searchTerm);
			});
			const response = await axios.get(`https://swapi.dev/api/people/`);
			const data = response.data;
			this.setState({
				searchResults: data.results,
				error: null,
			});
			localStorage.setItem('searchTerm', searchTerm);
		} catch (error) {
			this.setState({
				searchResults: [],
				error: 'Error fetching data. Please try again.',
			});
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
		}

		const swapi = new Services();
		swapi.getAllPeople().then((body) => {
			const arrPepople = body;
			this.setState({
				searchResults: [...arrPepople],
				error: null,
			});
		});
	}

	throwError = () => {
		throw new Error('Это принудительная ошибка');
	};

	render() {
		const { searchTerm, error } = this.state;
		return (
			<div>
				<ErrorBoundary>
					<SearchInput
						searchTerm={searchTerm}
						onSearch={this.handleSearch}
						onInputChange={this.handleInputChange}
					/>
					<ErrorButton onError={this.throwError} />
					<ListItems items={this.state.searchResults} error={error} />
				</ErrorBoundary>
			</div>
		);
	}
}
