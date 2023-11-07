export interface ICharacter {
	name: string;
	id: string;
	url: string;
}

export interface IPerson extends ICharacter {
	eyeColor: string;
	gender: string;
	birth_year: string;
}
