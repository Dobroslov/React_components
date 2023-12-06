import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPeopleResponse, IPerson } from '../types/types';

export const starWarsApi = createApi({
	reducerPath: 'starWarsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api' }),
	endpoints: (builder) => ({
		getAllPeople: builder.query<IPeopleResponse, number>({
			query: (pageNumber = 1) => `people/?page=${pageNumber}`,
		}),
		getPerson: builder.query<IPerson, string>({
			query: (id) => `people/${id}`,
		}),
		searchPeople: builder.query<IPeopleResponse, string>({
			query: (searchTerm = '') => `people/?search=${searchTerm}`,
		}),
	}),
});

export const { useGetAllPeopleQuery, useGetPersonQuery, useSearchPeopleQuery } = starWarsApi;
