import React from 'react';

interface ModalProps {
	error: Error | null;
	onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ error, onClose }) => {
	return (
		<div className='modal'>
			<div className='modal-content'>
				<h2>Error</h2>
				{error && <p>{error.toString()}</p>}
				<button onClick={onClose}>Close</button>
			</div>
		</div>
	);
};

export default Modal;
