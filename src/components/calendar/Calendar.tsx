import { useContext, useEffect } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import { AppointmentContext } from '@context/appointments/AppointmentsContext';

import 'react-calendar/dist/Calendar.css';
import './calendar.scss';

/**
 * Компонент календаря
 */
function Calendar() {
	const { calendarDate, setDateAndFilter } = useContext(AppointmentContext);

	useEffect(() => {
		// сброс фильтра при монтировании компонента
		setDateAndFilter([null, null]);
	}, []);

	return (
		<div className="calendar">
			<ReactCalendar
				value={calendarDate}
				onChange={(value) => {
					setDateAndFilter(value);
				}}
				selectRange
			/>

			<button className="calendar__reset" onClick={() => setDateAndFilter([null, null])} disabled={Array.isArray(calendarDate) && !calendarDate[0] && !calendarDate[1]}>
				Reset filters
			</button>
		</div>
	);
}

export default Calendar;
