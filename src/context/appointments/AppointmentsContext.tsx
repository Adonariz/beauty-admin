import { createContext, ReactNode, useReducer } from 'react';
import reducer, { AppointmentState } from '@src/context/appointments/reducer';
import { ActionsTypes } from './actions';
import { useAppointmentService } from '@services/AppointmentService';
import { Value } from 'react-calendar/src/shared/types.js';

const initialState: AppointmentState = {
	allAppointments: [],
	activeAppointments: [],
	appointmentLoadingStatus: 'idle',
	calendarDate: [null, null],
};
interface ProviderProps {
	children: ReactNode;
}

interface AppointmentContextValue extends AppointmentState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
	setDateAndFilter: (newDate: Value) => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	appointmentLoadingStatus: initialState.appointmentLoadingStatus,
	calendarDate: initialState.calendarDate,
	getAppointments: () => {},
	getActiveAppointments: () => {},
	setDateAndFilter: () => {},
});

export const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } = useAppointmentService();

	const value: AppointmentContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		appointmentLoadingStatus: loadingStatus,
		calendarDate: state.calendarDate,
		getAppointments: () => {
			getAllAppointments().then((data) => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
		},
		getActiveAppointments: () => {
			getAllActiveAppointments().then((data) => dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }));
		},
		setDateAndFilter: (newDate) => {
			dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate });
		},
	};

	return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};
