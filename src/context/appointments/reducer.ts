import { ActionsTypes, AppointmentAction } from './actions';
import { Appointment, ActiveAppointment } from '@shared/interfaces/appointment.interface';

export interface InitialState {
	allAppointments: Appointment[] | [];
	activeAppointments: ActiveAppointment[] | [];
}

export default function reducer(state: InitialState, action: AppointmentAction) {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return { ...state, allAppointments: action.payload };
		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return { ...state, activeAppointments: action.payload };
		default:
			return state;
	}
}
