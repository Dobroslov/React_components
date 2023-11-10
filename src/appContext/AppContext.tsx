import React, { createContext, useContext } from 'react';
import { ICharacter } from '../types/types';

interface AppContextProps {
	searchTerm: string;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
	searchResults: ICharacter[] | [];
	setSearchResults: React.Dispatch<React.SetStateAction<ICharacter[] | []>>;
	isLoading: boolean;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
	selectedPerson: string | null;
	setSelectedPerson: React.Dispatch<React.SetStateAction<string | null>>;
	isRightSectionOpen: boolean;
	setIsRightSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
	page: number;
	setPage: React.Dispatch<React.SetStateAction<number>>;
	totalPages: number;
	setTotalPages: React.Dispatch<React.SetStateAction<number>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};
