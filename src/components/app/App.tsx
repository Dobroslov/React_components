import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';
import { CharacterPage } from '../pages/CharacterPage';
import NotFoundPage from '../pages/NotFoundPage';

import './App.css';

export const App: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate('/character/?page=1');
	}, []);

	return (
		<div className='app'>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index path=':characters' element={<CharacterPage />} />
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
