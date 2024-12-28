export interface Appointment {
	id: number;
	date: string;
	name: string;
	service: string;
	phone: string;
	canceled: boolean;
}

export type ActiveAppointment = Omit<Appointment, 'canceled'>;
