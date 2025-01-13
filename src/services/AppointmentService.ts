import { useHttp } from '@hooks/http.hook';
import { Appointment, ActiveAppointment } from '@shared/interfaces/appointment.interface';
import hasRequiredFields from '@utils/hasRequiredFields';

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
			.filter((item) => !item.canceled)
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

	return { loadingStatus, getAllAppointments, getAllActiveAppointments };
};
