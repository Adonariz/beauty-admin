import { useContext, useEffect } from 'react';
import AppointmentItem from '../appointmentItem/AppointmentItem';
import { AppointmentContext } from '@src/context/appointments/AppointmentsContext';
import Spinner from '@components/spinner/Spinner';
import Error from '@components/error/Error';

function HistoryList() {
	const { allAppointments, getAppointments, appointmentLoadingStatus } = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, []);

	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />;
	}

	if (appointmentLoadingStatus === 'error') {
		<>
			<Error />
			<button className="schedule__reload" onClick={getAppointments}>
				Try to reload
			</button>
		</>;
	}

	return (
		<>
			{allAppointments.map((item) => (
				<AppointmentItem {...item} key={item.id} />
			))}
		</>
	);
}

export default HistoryList;
