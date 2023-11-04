import axios from 'axios';
import { ICharacter } from '../types/types';

export default class Services {
	BASE_URL = `https://swapi.dev/api`;

	async getResource(url: string) {
		try {
			const response = await axios.get(`${this.BASE_URL}${url}`);
			const data = response.data;
			return data;
		} catch (error) {
			return [];
		}
	}

	async getAllPeople() {
		const res = await this.getResource(`/people/`);
		return res.results;
	}

	getPerson = (id: number) => {
		return this.getResource(`/people/${id}`);
	};

	searchPeople = (searchTerm: string) => {
		return this.getResource(`/people/?search=${searchTerm}`);
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

	transformPerson = (person: ICharacter) => {
		return {
			id: this.getId(person),
			name: person.name,
			gender: person.gender,
			birth_year: person.birth_year,
			eyeColor: person.eyeColor,
		};
	};
}
