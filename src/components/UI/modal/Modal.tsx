import React from 'react';

interface ModalProps {
	error: Error | null;
}

const Modal: React.FC<ModalProps> = ({ error }) => {
	return (
		<div className='modal'>
			<div className='modal-content'>
				<h2>Что-то пошло не так</h2>
				{error && <p>{error.toString()}</p>}
			</div>
		</div>
	);
};

export default Modal;
