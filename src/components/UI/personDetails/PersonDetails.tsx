import React, { useEffect, useState } from 'react';
import './PersonDetails.css';
import Services from '../../../API/Services';
import { ICharacter } from '../../../types/types';

const PersonDetails = ({ personId }: { personId: number | null }) => {
	const [person, setPerson] = useState<ICharacter | null>(null);

	useEffect(() => {
		if (personId !== null) {
			const swapi = new Services();
			swapi.getPerson(personId).then((body) => {
				const personData = body;
				console.log('file: PersonDetails.tsx:14 ~ swapi.getPerson ~ personData:', personData);
				setPerson(personData);
			});
		}
	}, [personId]);

	return (
		<div className='person-details__container'>
			{person ? (
				<div className='person-details card rounded'>
					<img
						className='person-image'
						src='https://starwars-visualguide.com/assets/img/characters/3.jpg'
					/>

					<div className='card-body'>
						<h4>R2-D2</h4>
						<ul className='list-group list-group-flush'>
							<li className='list-group-item'>
								<span className='term'>Gender</span>
								<span>male</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Birth Year</span>
								<span>43</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Eye Color</span>
								<span>red</span>
							</li>
						</ul>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default PersonDetails;
