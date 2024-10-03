import clsx from "clsx";
import { FC } from "react";
import { Logo } from "@/shared/ui/Logo";
import cls from "./Aside.module.scss";

interface AsideProps {
	className?: string
}

export const Aside: FC<AsideProps> = ({ className }) => {
	return (
		<aside className={clsx(cls.Aside, className)}>
			Aside
		</aside>
	);
};
