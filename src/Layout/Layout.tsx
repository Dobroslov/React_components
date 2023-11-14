import React from 'react';
import Header from '../components/UI/header/Header';
import SearchInput from '../components/UI/serchInput/SearchInput';
import { Outlet } from 'react-router-dom';
import Pagination from '../components/UI/pagination/Pagination';

interface ILayoutProps {
	onSearch: (searchTerm: string) => void;
	onPageChange: (page: number) => void;
}

const Layout: React.FC<ILayoutProps> = ({ onSearch, onPageChange }) => {
	return (
		<>
			<Header />
			<SearchInput onSearch={onSearch} />
			<div className='app__content'>
				<Outlet />
			</div>
			<Pagination onPageChange={onPageChange} />
		</>
	);
};

export default Layout;
