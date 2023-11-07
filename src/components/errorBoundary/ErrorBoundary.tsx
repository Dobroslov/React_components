import { Component } from 'react';
import Modal from '../UI/modal/Modal';

interface ErrorBoundaryProps {}
interface ErrorBoundaryState {
	hasError: boolean;
	error: Error | null;
}

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
		};
	}

	componentDidCatch(error: Error) {
		this.setState({
			hasError: true,
			error,
		});
	}

	handleCloseModal = () => {
		this.setState({
			hasError: false,
			error: null,
		});
	};

	render() {
		const { hasError, error } = this.state;
		if (hasError) {
			return <Modal error={error} />;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
