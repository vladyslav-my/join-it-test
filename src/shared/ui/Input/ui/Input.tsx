import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import {
	FC, forwardRef, InputHTMLAttributes, memo, useState,
} from "react";
import cls from "./Input.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	className?: string;
	error?: string;
	withValidation?: boolean;
	label: string;
}

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(({
	className, error, label, withValidation, ...otherProps
}, ref) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const transition = withValidation ? useTransition(!!error, {
		config: { duration: 200 },
		from: {
			scale: 0,
			opacity: 0,
		},
		enter: {
			scale: 1,
			opacity: 1,
		},
		leave: {
			scale: 0,
			opacity: 0,
		},
	}) : null;

	return (
		<div className={clsx(cls.Input, {
			[cls.Input_withValidation]: withValidation,
		}, [className])}
		>
			<div className={cls.Input__label}>{label}</div>
			<input className={cls.Input__this} ref={ref} {...otherProps} />
			{transition && transition((styles, isOpen) => (
				isOpen && (
					<animated.span style={styles} className={cls.Input__validation}>
						{error}
					</animated.span>
				)
			))}
		</div>
	);
});
