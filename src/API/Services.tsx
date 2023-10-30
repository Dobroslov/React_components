import axios from 'axios';

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

	getPerson(id: string) {
		return this.getResource(`/people/${id}`);
	}

	searchPeople(searchTerm: string) {
		return this.getResource(`/people/?search=${searchTerm}`);
	}
}
