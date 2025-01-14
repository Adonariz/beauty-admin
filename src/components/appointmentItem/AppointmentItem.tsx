import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Optional } from 'utility-types';

import { Appointment } from '@shared/interfaces/appointment.interface';

import './appointmentItem.scss';

type AppointmentProps = Optional<Appointment, 'canceled'>;

/**
 * функция для вывода строки с оставшимся временем
 *
 * @param {string} date дата в формате строки
 * @returns {string}
 */
function getTimeLeftString(date: string): string {
	const hours = dayjs(date).diff(undefined, 'h');
	const minutes = dayjs(date).diff(undefined, 'm') % 60;

	return `${hours}:${minutes.toString().length > 1 ? minutes : `0${minutes}`}`;
}

function AppointmentItem({ id, name, date, service, phone, canceled }: AppointmentProps) {
	const [timeLeft, setTimeLeft] = useState<string | null>(null);

	const formattedDate = dayjs(date).format('DD/MM/YYYY HH:mm');

	useEffect(() => {
		setTimeLeft(getTimeLeftString(date));

		const intervalId = setInterval(() => {
			setTimeLeft(getTimeLeftString(date));
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

			{!canceled ? (
				<>
					<div className="appointment__time">
						<span>Time left:</span>
						<span className="appointment__timer">{timeLeft}</span>
					</div>
					<button className="appointment__cancel">Cancel</button>
				</>
			) : null}

			{canceled ? <div className="appointment__canceled">Canceled</div> : null}
		</div>
	);
}

export default AppointmentItem;
