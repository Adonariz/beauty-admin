import { useContext, useEffect } from 'react';
import AppointmentItem from '../appointmentItem/AppointmentItem';
import { AppointmentContext } from '@src/context/appointments/AppointmentsContext';

function AppointmentList() {
	const { allAppointments, activeAppointments, getAppointments, getActiveAppointments } = useContext(AppointmentContext);

	useEffect(() => {
		getActiveAppointments();
	}, []);

	return (
		<>
			{activeAppointments.map((item) => (
				<AppointmentItem {...item} key={item.id} />
			))}
		</>
	);
}

export default AppointmentList;
