import { LoadingStatusOptions } from '@hooks/http.hook';
import { ActionsTypes, AppointmentAction } from './actions';
import { Appointment, ActiveAppointment } from '@shared/interfaces/appointment.interface';
import { LooseValue } from 'react-calendar/src/shared/types.js';

export interface AppointmentState {
	/**
	 * Все записи
	 */
	allAppointments: Appointment[] | [];
	/**
	 * Все активные записи
	 */
	activeAppointments: ActiveAppointment[] | [];
	/**
	 * Статус загрузки записей
	 */
	appointmentLoadingStatus: LoadingStatusOptions;
	/**
	 * Фильтр по дате
	 */
	calendarDate: LooseValue;
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
		case ActionsTypes.SET_CALENDAR_DATE:
			return { ...state, calendarDate: action.payload };
		default:
			return state;
	}
}
