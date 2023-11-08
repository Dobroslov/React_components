import React from 'react';
import { NavLink } from 'react-router-dom';

import './header.css';

const Header = () => {
	return (
		<div className='header flex'>
			<h3>
				<NavLink to='/' className='title__h3'>
					Star wars
				</NavLink>
			</h3>
			<ul className='header__nav'>
				<li className='nav__item'>
					<NavLink to='/' className='nav__link'>
						Characters
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to='/planets' className='nav__link'>
						Planets
					</NavLink>
				</li>
				<li className='nav__item'>
					<NavLink to='/ships' className='nav__link'>
						Ships
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Header;
