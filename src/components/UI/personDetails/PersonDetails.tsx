import { useEffect, useState } from 'react';
import Services from '../../../API/Services';
import { IPerson } from '../../../types/types';
import { ClipLoader } from 'react-spinners';

import './PersonDetails.css';
interface PersonDetailsProps {
	personId: string | null;
	setIsRightSectionOpen: React.Dispatch<React.SetStateAction<boolean>>;
	closePersonDetails: () => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({
	personId,
	closePersonDetails,
}: PersonDetailsProps) => {
	const [person, setPerson] = useState<IPerson | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleClose = () => {
		closePersonDetails();
	};

	useEffect(() => {
		if (personId !== null) {
			setIsLoading(true);
			const swapi = new Services();
			swapi.getPerson(personId).then((body) => {
				setPerson(body as IPerson);
				setIsLoading(false);
			});
		}
	}, [personId]);

	const { name, gender, birth_year, eyeColor, id } = person || {};

	return (
		<div className='person-details__container'>
			{isLoading ? (
				<div className='spinner' data-testid='spinner_person'>
					<ClipLoader color={'#7ce6aa'} loading={isLoading} size={50} />
				</div>
			) : person ? (
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
						<button onClick={handleClose}>Close</button>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default PersonDetails;
