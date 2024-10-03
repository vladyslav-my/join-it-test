import { RouteProps } from "react-router-dom";
import { CalendarPage } from "@/pages/CalendarPage";
import { MainPage } from "@/pages/MainPage";
import {
	getCalendarRoutePath,
	getMainRoutePath,
} from "@/shared/routes/path";

export type AppRouteProps = RouteProps & {
};

export const routes: AppRouteProps[] = [
	{
		path: getMainRoutePath(),
		element: <MainPage />,
	},
	{
		path: getCalendarRoutePath(),
		element: <CalendarPage />,
	},
];
