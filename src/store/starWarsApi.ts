import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICharacter, IPerson } from '../types/types';

export const starWarsApi = createApi({
	reducerPath: 'starWarsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
	endpoints: (builder) => ({
		getAllPeople: builder.query<{ arrItems: ICharacter[]; pageNumber: number }, number>({
			query: (pageNumber) => `people/?page=${pageNumber}`,
		}),
		getPerson: builder.query<IPerson, string>({
			query: (id) => `people/${id}`,
		}),
		searchPeople: builder.query<{ results: ICharacter[]; pageNumber: number }, string>({
			query: (searchTerm) => `people/?search=${searchTerm}`,
		}),
	}),
});

export const { useGetAllPeopleQuery, useGetPersonQuery, useSearchPeopleQuery } = starWarsApi;
