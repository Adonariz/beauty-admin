import { useContext, useEffect } from 'react';
import AppointmentItem from '../appointmentItem/AppointmentItem';
import { AppointmentContext } from '@context/appointments/AppointmentsContext';
import Spinner from '@components/spinner/Spinner';
import Error from '@components/error/Error';

/**
 * Компонент списка записей
 */
function HistoryList() {
	const { allAppointments, getAppointments, appointmentLoadingStatus, calendarDate } = useContext(AppointmentContext);

	useEffect(() => {
		getAppointments();
	}, [calendarDate]);

	// Вернем спиннер при загрузке
	if (appointmentLoadingStatus === 'loading') {
		return <Spinner />;
	}

	// Вернем ошибку при ошибке
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
			{allAppointments.length === 0 && <h2 className="no-data">No data to display</h2>}

			{allAppointments.map((item) => (
				<AppointmentItem {...item} key={item.id} />
			))}
		</>
	);
}

export default HistoryList;
