import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app/App';
import { Provider } from 'react-redux';
import { store } from './store/index';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
