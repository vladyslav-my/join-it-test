import clsx from "clsx";
import { FC, memo } from "react";
import { getMainRoutePath } from "@/shared/routes/path";
import cls from "./Logo.module.scss";

interface LogoProps {
	className?: string;
}

export const Logo: FC<LogoProps> = memo(({ className }) => {
	return (
		<a className={clsx(cls.Logo, {}, [className])} href={getMainRoutePath()}>
			IMPEKABLE
		</a>
	);
});
