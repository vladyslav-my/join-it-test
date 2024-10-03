import clsx from "clsx";
import { ComponentProps, FC } from "react";
import { NavLink } from "react-router-dom";
import cls from "./AppNavLink.module.scss";

interface AppNavLinkProps extends ComponentProps<typeof NavLink> {
	className?: string;
	Icon: any;
	name: string;
	children: string;
}

export const AppNavLink: FC<AppNavLinkProps> = ({
	className, children, Icon, ...otherProps
}) => {
	return (
		<li className={clsx(cls.AppNavLink, {}, [className])}>
			<NavLink className={cls.AppNavLink__link} {...otherProps}>
				{({ isActive }) => (
					<div className={clsx(cls.AppNavLink__wrapper, { [cls.AppNavLink__wrapper_active]: isActive })}>
						<Icon className={cls.AppNavLink__icon} />
						<span className={cls.AppNavLink__text}>{children}</span>
					</div>
				)}
			</NavLink>

		</li>
	);
};
