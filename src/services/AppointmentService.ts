import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import { useHttp } from '@hooks/http.hook';
import { Appointment, ActiveAppointment } from '@shared/interfaces/appointment.interface';
import hasRequiredFields from '@utils/hasRequiredFields';

dayjs.extend(customParseFormat);

const requiredFields = ['id', 'date', 'name', 'service', 'phone', 'canceled'];

export const useAppointmentService = () => {
	const { loadingStatus, request } = useHttp();

	const _apiBase: string = 'http://localhost:3001/appointments';

	const getAllAppointments = async (): Promise<Appointment[]> => {
		const res = await request({ url: _apiBase });

		if (res.every((item: Appointment) => hasRequiredFields(item, requiredFields))) {
			return res;
		} else {
			throw new Error("Data doesn't have all the fields");
		}
	};

	const getAllActiveAppointments = async () => {
		const base = await getAllAppointments();

		const transformed: ActiveAppointment[] = base
			.filter((item) => {
				// отсеиваем отмененные и наступившие
				return !item.canceled && dayjs(item.date).diff(undefined, 'minute') > 0;
			})
			.map(({ id, name, date, service, phone }) => {
				return {
					id,
					name,
					date,
					service,
					phone,
				};
			});

		return transformed;
	};

	const cancelOneAppointment = async (id: number) => {
		return await request({
			url: `${_apiBase}/${id}`,
			method: 'PATCH',
			body: JSON.stringify({ canceled: true }),
		});
	};

	const createNewAppointment = async (body: Appointment) => {
		const id = new Date().getTime();
		body.id = id;
		body.date = dayjs(body.date, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm');

		return await request({
			url: _apiBase,
			method: 'POST',
			body: JSON.stringify(body),
		});
	};

	return { loadingStatus, getAllAppointments, getAllActiveAppointments, cancelOneAppointment, createNewAppointment };
};
