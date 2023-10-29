import React, { Component } from 'react';

interface ErrorButtonProps {
	onError: () => void;
}

class ErrorButton extends Component<ErrorButtonProps> {
	handleClick = () => {
		if (this.props.onError) {
			this.props.onError();
		}
	};

	render() {
		return <button onClick={this.handleClick}>Вызвать ошибку</button>;
	}
}

export default ErrorButton;
