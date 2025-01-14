import { LoadingStatusOptions } from '@hooks/http.hook';
import { ActionsTypes, AppointmentAction } from './actions';
import { Appointment, ActiveAppointment } from '@shared/interfaces/appointment.interface';

export interface AppointmentState {
	allAppointments: Appointment[] | [];
	activeAppointments: ActiveAppointment[] | [];
	appointmentLoadingStatus: LoadingStatusOptions;
}

export default function reducer(state: AppointmentState, action: AppointmentAction): AppointmentState {
	switch (action.type) {
		case ActionsTypes.SET_ALL_APPOINTMENTS:
			return { ...state, allAppointments: action.payload, appointmentLoadingStatus: 'idle' };
		case ActionsTypes.SET_ACTIVE_APPOINTMENTS:
			return { ...state, activeAppointments: action.payload, appointmentLoadingStatus: 'idle' };
		case ActionsTypes.FETCHING_APPOINTMENTS:
			return { ...state, appointmentLoadingStatus: 'loading' };
		case ActionsTypes.ERROR_FETCHING_APPOINTMENTS:
			return { ...state, appointmentLoadingStatus: 'error' };
		default:
			return state;
	}
}
