import React from 'react';
import { Link } from 'react-router-dom';

import './MainComponent.css';

const MainComponent: React.FC = () => {
	return (
		<div className='main-container'>
			<h1>Main Page</h1>
			<div className='nav-links'>
				<Link to='/form'>Uncontrolled Form</Link>
				<Link to='/hook-form'>Hook Form</Link>
			</div>
		</div>
	);
};

export default MainComponent;
