import { RouteProps } from "react-router-dom";
import { MainPage } from "@/pages/MainPage";
import {
	getMainRoutePath,
} from "@/shared/routes/path";

export type AppRouteProps = RouteProps & {
};

export const routes: AppRouteProps[] = [
	{
		path: getMainRoutePath(),
		element: <MainPage />,
	},
];
