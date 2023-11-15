import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	Dispatch,
	SetStateAction,
} from 'react';
import { ICharacter } from '../../types/types';

interface AppContextProps {
	searchTerm: string;
	setSearchTerm: Dispatch<SetStateAction<string>>;
	searchResults: ICharacter[] | [];
	setSearchResults: Dispatch<SetStateAction<ICharacter[] | []>>;
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	selectedPerson: string | null;
	setSelectedPerson: Dispatch<SetStateAction<string | null>>;
	isRightSectionOpen: boolean;
	setIsRightSectionOpen: Dispatch<SetStateAction<boolean>>;
	page: number;
	setPage: Dispatch<SetStateAction<number>>;
	totalPages: number;
	setTotalPages: Dispatch<SetStateAction<number>>;
	URL: string;
	setURL: Dispatch<SetStateAction<string>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [searchResults, setSearchResults] = useState<ICharacter[] | []>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [selectedPerson, setSelectedPerson] = useState<string | null>(null);
	const [isRightSectionOpen, setIsRightSectionOpen] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [totalPages, setTotalPages] = useState<number>(1);
	const [URL, setURL] = useState<string>(`/character/?page=${page}`);

	const contextValue: AppContextProps = {
		searchTerm,
		setSearchTerm,
		searchResults,
		setSearchResults,
		isLoading,
		setIsLoading,
		selectedPerson,
		setSelectedPerson,
		isRightSectionOpen,
		setIsRightSectionOpen,
		page,
		setPage,
		totalPages,
		setTotalPages,
		URL,
		setURL,
	};

	return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useAppContext must be used within an AppProvider');
	}
	return context;
};
