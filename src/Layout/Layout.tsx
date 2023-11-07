import React from 'react';
import Header from '../components/UI/header/Header';
import SearchInput from '../components/serchInput/SearchInput';
import { Outlet } from 'react-router-dom';

interface SearchInputProps {
	onSearch: (searchTerm: string) => void;
}

const Layout = ({ onSearch }: SearchInputProps) => {
	return (
		<>
			<Header />
			<SearchInput onSearch={onSearch} />
			<div className='app__content'>
				<Outlet />
			</div>
		</>
	);
};

export default Layout;
