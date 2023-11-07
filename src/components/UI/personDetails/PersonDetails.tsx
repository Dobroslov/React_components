import React, { useEffect, useState } from 'react';
import './PersonDetails.css';
import Services from '../../../API/Services';
import { IPerson } from '../../../types/types';

const PersonDetails = ({ personId }: { personId: string | null }) => {
	const [person, setPerson] = useState<IPerson | null>(null);

	useEffect(() => {
		if (personId !== null) {
			const swapi = new Services();
			swapi.getPerson(personId).then((body) => {
				setPerson(body as IPerson);
			});
		}
	}, [personId]);

	const { name, gender, birth_year, eyeColor, id } = person || {};

	return (
		<div className='person-details__container'>
			{person ? (
				<div className='person-details card rounded'>
					<img
						className='person-image'
						src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
					/>

					<div className='card-body'>
						<h4>{name}</h4>
						<ul className='list-group list-group-flush'>
							<li className='list-group-item'>
								<span className='term'>Gender</span>
								<span>{gender}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Birth Year</span>
								<span>{birth_year}</span>
							</li>
							<li className='list-group-item'>
								<span className='term'>Eye Color</span>
								<span>{eyeColor}</span>
							</li>
						</ul>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default PersonDetails;
