import { createContext, ReactNode, useReducer } from 'react';
import reducer, { InitialState } from '@src/context/appointments/reducer';
import { ActionsTypes } from './actions';
import { useAppointmentService } from '@services/AppointmentService';

const initialState: InitialState = {
	allAppointments: [],
	activeAppointments: [],
};
interface ProviderProps {
	children: ReactNode;
}

interface AppointmentContextValue extends InitialState {
	getAppointments: () => void;
	getActiveAppointments: () => void;
}

export const AppointmentContext = createContext<AppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	getAppointments: () => {},
	getActiveAppointments: () => {},
});

export const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } = useAppointmentService();

	const value: AppointmentContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		getAppointments: () => {
			getAllAppointments().then((data) => dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: data }));
		},
		getActiveAppointments: () => {
			getAllActiveAppointments().then((data) => dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: data }));
		},
	};

	return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};
