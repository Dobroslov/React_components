import React from 'react';

import './header.css';

const Header = () => {
	return (
		<div className='header flex'>
			<h3>
				<a href='#' className='title__h3'>
					Star wars
				</a>
			</h3>
			<ul className='header__nav'>
				<li className='nav__item'>
					<a href='#' className='nav__link'>
						People
					</a>
				</li>
				<li className='nav__item'>
					<a href='#' className='nav__link'>
						Planets
					</a>
				</li>
				<li className='nav__item'>
					<a href='#' className='nav__link'>
						Starships
					</a>
				</li>
			</ul>
		</div>
	);
};

export default Header;
