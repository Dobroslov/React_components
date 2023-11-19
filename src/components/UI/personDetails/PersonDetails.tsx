import React, { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setIsRightSectionOpen, setURL, selectCharacters } from '../../../store/StarWarsSlice';
import { getNewURL } from '../../../helpers/helpers';
import { useGetPersonQuery } from '../../../store/starWarsApi';
import './PersonDetails.css';

const PersonDetails: React.FC = () => {
	const dispatch = useDispatch();
	const { selectedPerson } = useSelector(selectCharacters);
	const { data, isLoading } = useGetPersonQuery(selectedPerson);

	const handleCloseItemDetails = () => {
		dispatch(setIsRightSectionOpen(false));
		getNewURL();
	};

	useEffect(() => {
		if (selectedPerson !== null) {
			const updatedURL = `/character/?details=${selectedPerson}`;
			dispatch(setURL(updatedURL));
		}
	}, [selectedPerson, dispatch]);

	const { name, gender, birth_year, eyeColor } = data || {};

	return (
		<div className='person-details__container'>
			{isLoading ? (
				<div className='spinner' data-testid='spinner_person'>
					<ClipLoader color={'#7ce6aa'} loading={isLoading} size={50} />
				</div>
			) : data ? (
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
			) : null}
		</div>
	);
};

export default PersonDetails;
