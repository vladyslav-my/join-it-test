import clsx from "clsx";
import { FC } from "react";
import { Logo } from "@/shared/ui/Logo";
import cls from "./Header.module.scss";

interface HeaderProps {
	className?: string
}

export const Header: FC<HeaderProps> = ({ className }) => {
	return (
		<header className={clsx(cls.Header, className)}>
			<div className={cls.Header__logoField}>
				<Logo />
			</div>
		</header>
	);
};
