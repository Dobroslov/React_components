import React, { Component } from 'react';
import './ErrorButton.css';
class ErrorButton extends Component {
	throwError = () => {
		throw new Error('Это принудительная ошибка');
	};

	render() {
		return (
			<button className='btn__error' onClick={this.throwError}>
				Вызвать ошибку
			</button>
		);
	}
}

export default ErrorButton;
