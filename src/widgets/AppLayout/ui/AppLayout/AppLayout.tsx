import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Aside } from "../Aside/Aside";
import { Header } from "../Header/Header";
import cls from "./AppLayout.module.scss";

interface AppLayoutProps {
	className?: string;
	children?: ReactNode;
}

export const AppLayout: FC<AppLayoutProps> = ({ className, children }) => {
	return (
		<div className={cls.AppLayout}>
			<Header className={cls.AppLayout__header} />
			<Aside className={cls.AppLayout__aside} />
			<main className={clsx(cls.AppLayout__main, className)}>
				<h1 className={cls.AppLayout__title}>Calendar</h1>
				{children}
			</main>
		</div>
	);
};
