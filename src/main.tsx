import React from 'react';
import ReactDOM from 'react-dom/client';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import './index.css';
import { App } from './components/app/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>
);
