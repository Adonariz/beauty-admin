import { useHttp } from '@hooks/http.hook';
import { Appointment, ActiveAppointment } from '@shared/interfaces/appointment.interface';
import hasRequiredFields from '@utils/hasRequiredFields';
import dayjs from 'dayjs';

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

	return { loadingStatus, getAllAppointments, getAllActiveAppointments, cancelOneAppointment };
};
