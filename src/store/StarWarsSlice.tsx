import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Services from '../API/Services';
import { ICharacter } from '../types/types';
import { RootState } from './index';

interface starWarsState {
	searchTerm: string;
	searchResults: ICharacter[] | [];
	isLoading: boolean;
	selectedPerson: string;
	isRightSectionOpen: boolean;
	page: number;
	totalPages: number;
	URL: string;
}

export const searchPeople = createAsyncThunk<ICharacter[] | [], string>(
	'characters/searchPeople',
	async (term: string) => {
		const swapi = new Services();
		const response = await swapi.searchPeople(term.trim().toLowerCase());
		return response.results;
	}
);

const StarWarsSlice = createSlice({
	name: 'starWars',
	initialState: {
		searchTerm: '',
		searchResults: [],
		isLoading: false,
		page: 1,
		totalPages: 1,
		selectedPerson: '',
		isRightSectionOpen: false,
		URL: '/character/?page=1',
	} as starWarsState,
	reducers: {
		setSearchTerm: (state, action) => {
			state.searchTerm = action.payload;
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload;
		},
		setSelectedPerson: (state, action) => {
			state.selectedPerson = action.payload;
		},
		setIsRightSectionOpen: (state, action) => {
			state.isRightSectionOpen = action.payload;
		},
		setPage: (state, action) => {
			state.page = action.payload;
		},
		setTotalPages: (state, action) => {
			state.totalPages = action.payload;
		},
		setURL: (state, action) => {
			state.URL = action.payload;
		},
		setSearchResults: (state, action) => {
			state.searchResults = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(searchPeople.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(searchPeople.fulfilled, (state, action) => {
				state.searchResults = action.payload;
				state.isLoading = false;
			});
	},
});

export const {
	setSearchTerm,
	setIsLoading,
	setSelectedPerson,
	setIsRightSectionOpen,
	setPage,
	setTotalPages,
	setURL,
	setSearchResults,
} = StarWarsSlice.actions;

export const selectCharacters = (state: RootState) => state.starWars;

export default StarWarsSlice.reducer;
