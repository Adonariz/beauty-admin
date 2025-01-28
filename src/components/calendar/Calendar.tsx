import { useContext } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { AppointmentContext } from '@context/appointments/AppointmentsContext';

import 'react-calendar/dist/Calendar.css';
import './calendar.scss';

function Calendar() {
	const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

	return (
		<div className="calendar">
			<ReactCalendar value={calendarDate} onChange={(value) => setDateAndFilter(value)} selectRange />
		</div>
	);
}

export default Calendar;
