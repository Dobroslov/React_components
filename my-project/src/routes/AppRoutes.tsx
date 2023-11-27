import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainComponent from '../components/MainComponent';
import FormComponent from '../components/HookFormComponent';
import HookFormComponent from '../components/HookFormComponent';
import NotFoundPage from '../components/NotFoundPage';

const AppRoutes: React.FC = () => {
	return (
		<Routes>
			<Route>
				<Route path='/' index element={<MainComponent />} />
				<Route path='/form' element={<FormComponent />} />
				<Route path='/hook-form' element={<HookFormComponent />} />
				<Route path='*' element={<NotFoundPage />} />
			</Route>
		</Routes>
	);
};

export default AppRoutes;
