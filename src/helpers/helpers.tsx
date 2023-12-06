import { ICharacter, IPerson } from '../types/types';

export const getNewURL = () => {
	const url = new URL(window.location.href);
	const searchParams = new URLSearchParams(url.search);
	searchParams.delete('details');
	url.search = searchParams.toString();
	const modifiedURL = url.toString();
	window.history.replaceState({}, document.title, modifiedURL);
};

export const getId = (item: ICharacter) => {
	if (item.url) {
		const idRegExp = /\/([0-9]*)\/$/;
		const match = item.url.match(idRegExp);
		if (match) {
			return match[1];
		}
	}
	return null;
};

export const transformPerson = (person: IPerson) => {
	return {
		id: getId(person),
		name: person.name,
		gender: person.gender,
		birth_year: person.birth_year,
		eyeColor: person.eyeColor,
	};
};
