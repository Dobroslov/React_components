import React, { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import {
	setIsRightSectionOpen,
	selectCharacters,
	setSelectedPerson,
} from '../../../store/StarWarsSlice';
import { getNewURL } from '../../../helpers/helpers';
import { useGetPersonQuery } from '../../../store/starWarsApi';
import './PersonDetails.css';

const PersonDetails: React.FC = () => {
	const dispatch = useDispatch();
	const { selectedPerson } = useSelector(selectCharacters);
	const { data: person, error, isFetching } = useGetPersonQuery(selectedPerson);

	const handleCloseItemDetails = () => {
		dispatch(setIsRightSectionOpen(false));
		getNewURL();
	};

	useEffect(() => {
		if (person) {
			const id = person.url.split('/').slice(-2, -1)[0];
			dispatch(setSelectedPerson(id));
		}
	}, [dispatch, person]);

	if (isFetching) {
		return (
			<div className='person-details__container'>
				<div className='spinner' data-testid='spinner_person'>
					<ClipLoader color={'#7ce6aa'} loading={isFetching} size={50} />
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className='person-details__container'>
				<div>Error loading person details</div>;
			</div>
		);
	}

	if (!person) {
		return (
			<div className='person-details__container'>
				<div>No person selected</div>;
			</div>
		);
	}

	const { name, gender, birth_year, eyeColor } = person || {};

	return (
		<div className='person-details__container'>
			<div className='person-details card rounded'>
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
					<button onClick={handleCloseItemDetails}>Close</button>
				</div>
			</div>
		</div>
	);
};

export default PersonDetails;
