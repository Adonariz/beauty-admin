import { createContext, ReactNode, useReducer } from 'react';
import reducer, { AppointmentState } from '@src/context/appointments/reducer';
import { ActionsTypes } from './actions';
import { useAppointmentService } from '@services/AppointmentService';
import { Value } from 'react-calendar/src/shared/types.js';

/**
 * Начальное состояние контекста
 */
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
	/**
	 * Метод для получения всех записей
	 */
	getAppointments: () => void;
	/**
	 * Метод для получения активных записей
	 */
	getActiveAppointments: () => void;
	/**
	 * Метод для установки даты и фильтрации записей
	 */
	setDateAndFilter: (newDate: Value) => void;
}

/**
 * Контекст для работы с записями
 */
export const AppointmentContext = createContext<AppointmentContextValue>({
	allAppointments: initialState.allAppointments,
	activeAppointments: initialState.activeAppointments,
	appointmentLoadingStatus: initialState.appointmentLoadingStatus,
	calendarDate: initialState.calendarDate,
	getAppointments: () => {},
	getActiveAppointments: () => {},
	setDateAndFilter: () => {},
});

/**
 * Провайдер для контекста записей
 */
export const AppointmentContextProvider = ({ children }: ProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { loadingStatus, getAllAppointments, getAllActiveAppointments } = useAppointmentService();

	const value: AppointmentContextValue = {
		allAppointments: state.allAppointments,
		activeAppointments: state.activeAppointments,
		appointmentLoadingStatus: loadingStatus,
		calendarDate: state.calendarDate,
		getAppointments: () => {
			getAllAppointments()
				.then((data) => {
					const filteredData = data.filter((item) => {
						// если есть фильтры, то вернется отфильтрованный элемент
						// проверяем, что дата для фильтра записана в нужном формате из массива с двумя датами
						if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
							// проверяем, что записи попадают в диапазон выбранных дат
							if (
								new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() &&
								new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()
							) {
								return item;
							}
						} else {
							// если фильтров не существует, то вернется оригинальный элемент
							return item;
						}
					});

					dispatch({ type: ActionsTypes.SET_ALL_APPOINTMENTS, payload: filteredData });
				}) // если что-то пошло не так, то возвращаем ошибку
				.catch(() => dispatch({ type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS }));
		},
		getActiveAppointments: () => {
			getAllActiveAppointments()
				.then((data) => {
					const filteredData = data.filter((item) => {
						// если есть фильтры, то вернется отфильтрованный элемент
						// проверяем, что дата для фильтра записана в нужном формате из массива с двумя датами
						if (Array.isArray(state.calendarDate) && state.calendarDate[0] && state.calendarDate[1]) {
							// проверяем, что записи попадают в диапазон выбранных дат
							if (
								new Date(item.date).getTime() >= new Date(state.calendarDate[0]).getTime() &&
								new Date(item.date).getTime() <= new Date(state.calendarDate[1]).getTime()
							) {
								return item;
							}
						} else {
							// если фильтров не существует, то вернется оригинальный элемент
							return item;
						}
					});

					dispatch({ type: ActionsTypes.SET_ACTIVE_APPOINTMENTS, payload: filteredData });
				})
				// если что-то пошло не так, то возвращаем ошибку
				.catch(() => dispatch({ type: ActionsTypes.ERROR_FETCHING_APPOINTMENTS }));
		},
		setDateAndFilter: (newDate) => {
			dispatch({ type: ActionsTypes.SET_CALENDAR_DATE, payload: newDate });
		},
	};

	return <AppointmentContext.Provider value={value}>{children}</AppointmentContext.Provider>;
};
