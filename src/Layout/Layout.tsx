import React from 'react';
import Header from '../components/UI/header/Header';
import SearchInput from '../components/UI/serchInput/SearchInput';
import { Outlet } from 'react-router-dom';
import Pagination from '../components/UI/pagination/Pagination';

interface ILayoutProps {
	onSearch: (searchTerm: string) => void;
}

const Layout: React.FC<ILayoutProps> = ({ onSearch }) => {
	return (
		<>
			<Header />
			<SearchInput onSearch={onSearch} />
			<div className='app__content'>
				<Outlet />
			</div>
			<Pagination />
		</>
	);
};

export default Layout;
