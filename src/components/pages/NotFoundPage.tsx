import { Link } from 'react-router-dom';

const NotFoundPage = () => {
	return (
		<h1>
			Not Found Page. Go <Link to='/'> home</Link>
		</h1>
	);
};

export default NotFoundPage;
