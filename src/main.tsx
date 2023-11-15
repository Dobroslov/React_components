import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app/App';
import { AppProvider } from './providers/appContext/AppContext';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<AppProvider>
					<App />
				</AppProvider>
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
