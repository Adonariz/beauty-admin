import { useContext, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Portal from '@components/portal/Portal';
import { AppointmentContext } from '@context/appointments/AppointmentsContext';
import { useAppointmentService } from '@services/AppointmentService';

import './modal.scss';

interface ModalProps {
	handleClose: (state: boolean) => void;
	selectedId: number;
	isOpen: boolean;
}

function CancelModal({ handleClose, selectedId, isOpen }: ModalProps) {
	const { getActiveAppointments } = useContext(AppointmentContext);

	const { cancelOneAppointment } = useAppointmentService();

	const nodeRef = useRef<HTMLDivElement>(null);
	const cancelStatusRef = useRef<boolean | null>(null); // нужен для получения актуального состояния в обработчике closeOnEscapeKey

	const [btnIsDisabled, setBtnIsDisabled] = useState<boolean>(false);
	const [cancelStatus, setCancelStatus] = useState<boolean | null>(null);

	const handleCancelAppointment = (id: number) => {
		setBtnIsDisabled(true);

		cancelOneAppointment(id)
			.then(() => {
				setCancelStatus(true);
			})
			.catch(() => {
				setCancelStatus(false);
				setBtnIsDisabled(false);
			});
	};

	const closeOnEscapeKey = (evt: KeyboardEvent): void => {
		if (evt.key === 'Escape') {
			closeModal();
		}
	};

	const closeModal = () => {
		handleClose(false);

		if (cancelStatus || cancelStatusRef.current) {
			getActiveAppointments();
		}
	};

	useEffect(() => {
		document.body.addEventListener('keydown', closeOnEscapeKey);

		return () => {
			document.body.removeEventListener('keydown', closeOnEscapeKey);
		};
	}, [handleClose]);

	useEffect(() => {
		// синхронизация cancelStatusRef и cancelStatus
		cancelStatusRef.current = cancelStatus;
	}, [cancelStatus]);

	return (
		<Portal>
			<CSSTransition in={isOpen} timeout={{ enter: 500, exit: 500 }} unmountOnExit classNames="modal" nodeRef={nodeRef}>
				<div ref={nodeRef} className="modal">
					<div className="modal__body">
						<span className="modal__title">Are you sure you want to delete the appointment?</span>
						<div className="modal__btns">
							<button className="modal__ok" disabled={btnIsDisabled} onClick={() => handleCancelAppointment(selectedId)}>
								Ok
							</button>
							<button className="modal__close" onClick={() => closeModal()}>
								Close
							</button>
						</div>
						<div className="modal__status">{cancelStatus === null ? '' : cancelStatus ? 'Success' : 'Error, please try again'}</div>
					</div>
				</div>
			</CSSTransition>
		</Portal>
	);
}

export default CancelModal;
