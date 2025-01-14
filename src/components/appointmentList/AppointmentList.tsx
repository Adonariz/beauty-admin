import { useContext, useEffect } from 'react';
import AppointmentItem from '../appointmentItem/AppointmentItem';
import Spinner from '@components/spinner/Spinner';
import Error from '@components/error/Error';
import { AppointmentContext } from '@src/context/appointments/AppointmentsContext';

function AppointmentList() {
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
				<AppointmentItem {...item} key={item.id} />
			))}
		</>
	);
}

export default AppointmentList;
