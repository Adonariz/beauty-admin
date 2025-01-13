import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ActiveAppointment } from '@shared/interfaces/appointment.interface';
import './appointmentItem.scss';

function AppointmentItem({ id, name, date, service, phone }: ActiveAppointment) {
	const [timeLeft, setTimeLeft] = useState<string | null>(null);

	const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');

	useEffect(() => {
		const hours = dayjs(date).diff(undefined, 'h');
		const minutes = dayjs(date).diff(undefined, 'm') % 60;

		const timeString = `${hours}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`;

		setTimeLeft(timeString);

		const intervalId = setInterval(() => {
			// #TODO вынести в отдельную функцию
			const hours = dayjs(date).diff(undefined, 'h');
			const minutes = dayjs(date).diff(undefined, 'm') % 60;

			const timeString = `${hours}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`;

			setTimeLeft(timeString);
		}, 60000);

		return () => {
			clearInterval(intervalId);
		};
	}, [date]);

	return (
		<div className="appointment">
			<div className="appointment__info">
				<span className="appointment__date">Date: {formattedDate}</span>
				<span className="appointment__name">Name: {name}</span>
				<span className="appointment__service">Service: {service}</span>
				<span className="appointment__phone">Phone: {phone}</span>
			</div>
			<div className="appointment__time">
				<span>Time left:</span>
				<span className="appointment__timer">{timeLeft}</span>
			</div>
			<button className="appointment__cancel">Cancel</button>
			{/* <div className="appointment__canceled">Canceled</div> */}
		</div>
	);
}

export default AppointmentItem;
