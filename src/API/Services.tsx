import axios from 'axios';
import { ICharacter, IPerson } from '../types/types';

export default class Services {
	BASE_URL = `https://swapi.dev/api`;

	getResource = async (url: string) => {
		try {
			const response = await axios.get(`${this.BASE_URL}${url}`);
			const data = response.data;
			return data;
		} catch (error) {
			return [];
		}
	};

	getAllPeople = async (pageNumber: number = 1) => {
		const res = await this.getResource(`/people/?page=${pageNumber}`);
		const result = { arrItems: res.results.map(this.transformPerson), pageNumber: res.count };
		return result;
	};

	getPerson = async (id: string) => {
		const person = await this.getResource(`/people/${id}`);
		return this.transformPerson(person);
	};

	searchPeople = async (searchTerm: string) => {
		const res = await this.getResource(`/people/?search=${searchTerm}`);
		return { results: res.results.map(this.transformPerson), pageNumber: res.count };
	};

	getId = (item: ICharacter) => {
		if (item.url) {
			const idRegExp = /\/([0-9]*)\/$/;
			const match = item.url.match(idRegExp);
			if (match) {
				return match[1];
			}
		}
		return null;
	};

	transformPerson = (person: IPerson) => {
		return {
			id: this.getId(person),
			name: person.name,
			gender: person.gender,
			birth_year: person.birth_year,
			eyeColor: person.eyeColor,
		};
	};
}
