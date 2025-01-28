import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from '@components/header/Header';
import SchedulePage from '@pages/schedule/SchedulePage';
import HistoryPage from '@pages/history/HistoryPage';
import PageNotFound from '@pages/error/404';

import { AppointmentContextProvider } from '@context/appointments/AppointmentsContext';

import './app.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <PageNotFound />,
		children: [
			{
				path: '/',
				element: <SchedulePage />,
			},
			{
				path: '/schedule',
				element: <SchedulePage />,
			},
			{
				path: '/history',
				element: <HistoryPage />,
			},
		],
	},
]);

function Root() {
	return (
		<main className="board">
			<Header />

			<AppointmentContextProvider>
				<Outlet />
			</AppointmentContextProvider>
		</main>
	);
}

function App() {
	return <RouterProvider router={router} />;
}

export default App;
