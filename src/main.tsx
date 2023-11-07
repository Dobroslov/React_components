import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import { App } from './components/app/App';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ErrorBoundary>
	</React.StrictMode>
);
