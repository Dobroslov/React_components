import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './store/rootReducer';

const store = configureStore({
	reducer: rootReducer,
});

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<div>
				<h1>Your App</h1>
				<AppRoutes />
			</div>
		</Provider>
	);
};

export default App;
