import React, { Component } from 'react';
import axios from 'axios';
import SearchInput from './SearchInput';

import './App.css';
import ListItems from './ListItems';
import Services from './API/Services';

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

	getResource = async (url: string) => {
		const res = await fetch(url);
		const body = await res.json();
		return body;
	};

	componentDidMount() {
		const swapi = new Services();
		swapi.getAllPeople().then((body) => {
			const arrPepople = body;
			this.setState({
				searchResults: [...arrPepople],
				error: null,
			});
		});
		// const savedSearchTerm = localStorage.getItem('searchTerm');
		// if (savedSearchTerm) {
		// 	this.setState({ searchTerm: savedSearchTerm }, () => {
		// 		this.handleSearch();
		// 	});
		// }
	}

	render() {
		const { searchTerm, error } = this.state;
		return (
			<div>
				<SearchInput
					searchTerm={searchTerm}
					onSearch={this.handleSearch}
					onInputChange={this.handleInputChange}
				/>
				<div>
					{this.state.searchResults.map((item) => (
						<div
							style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}
							key={item.name}
						>
							<p>Name: {item.name}</p>
							<p>Gender: {item.gender}</p>
							<p>Birth year: {item.birth_year}</p>
						</div>
					))}
				</div>
				<ListItems items={this.state.searchResults} error={error} />
			</div>
		);
	}
}
