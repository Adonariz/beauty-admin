import { useContext, useEffect, useState } from 'react';
import AppointmentItem from '../appointmentItem/AppointmentItem';
import Spinner from '@components/spinner/Spinner';
import Error from '@components/error/Error';
import { AppointmentContext } from '@src/context/appointments/AppointmentsContext';
import CancelModal from '@components/modal/CancelModal';

function AppointmentList() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedId, setSelectedId] = useState(0);

	const { activeAppointments, getActiveAppointments, appointmentLoadingStatus } = useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />;
	}

	if (appointmentLoadingStatus === 'error') {
		return (
			<>
				<Error />
				<button className="schedule__reload" onClick={getActiveAppointments}>
					Try to reload
				</button>
			</>
		);
	}

	return (
		<>
			{activeAppointments.map((item) => (
				<AppointmentItem {...item} key={item.id} openModal={setIsOpen} selectId={() => setSelectedId(item.id)} />
			))}

			<CancelModal handleClose={setIsOpen} selectedId={selectedId} isOpen={isOpen} />
		</>
	);
}

export default AppointmentList;
