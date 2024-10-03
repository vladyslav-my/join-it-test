import { IconCalendarPin, IconHome } from "@tabler/icons-react";
import clsx from "clsx";
import { FC } from "react";
import { getCalendarRoutePath, getMainRoutePath } from "@/shared/routes/path";
import { AppNavLink } from "@/shared/ui/AppNavLink/AppNavLink";
import cls from "./Aside.module.scss";

interface AsideProps {
	className?: string
}

export const Aside: FC<AsideProps> = ({ className }) => {
	return (
		<aside className={clsx(cls.Aside, className)}>
			<AppNavLink to={getMainRoutePath()} Icon={IconCalendarPin}>Home</AppNavLink>
			<AppNavLink to={getCalendarRoutePath()} Icon={IconHome}>Calendar</AppNavLink>
		</aside>
	);
};
