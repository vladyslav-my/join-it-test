import { animated, useTransition } from "@react-spring/web";
import clsx from "clsx";
import { FC, useCallback, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@/shared/ui/Input";
import { Portal } from "@/shared/ui/Portal";
import cls from "./Popover.module.scss";

interface PopoverProps {
	className?: string;
	isOpen: boolean;
	setIsOpen: (oppened: boolean) => void;
	style: any;
}

interface EventBody {
	name: string;
	date: string;
	time: string;
	notes: string;
}

export const Popover: FC<PopoverProps> = ({
	className, setIsOpen, isOpen, style,
}) => {
	const transition = useTransition(isOpen, {
		from: {
			opacity: 0,
			transform: "scale(0.7)",
		},
		enter: {
			opacity: 1,
			transform: "scale(1)",
		},
		leave: {
			opacity: 0,
			transform: "scale(0.7)",
		},
		config: {
			duration: 300,
			easing: (t) => t * t * (3 - 2 * t),
		},
	});

	const {
		handleSubmit, control, reset, formState: { errors },
	} = useForm<EventBody>({
		reValidateMode: "onBlur",
		mode: "onBlur",
	});

	const onSubmit: SubmitHandler<EventBody> = useCallback((data) => {

	}, []);

	return (
		transition((styles, isOpen) => isOpen && (
			<Portal>
				<animated.form
					className={clsx(cls.Popover, [className])}
					style={{ ...styles, ...style }}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Controller
						name="name"
						control={control}
						rules={{
						}}
						render={({ field }) => (
							<Input
								placeholder="name"
								withValidation
								error={errors.name?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="date"
						control={control}
						rules={{
						}}
						render={({ field }) => (
							<Input
								placeholder="date"
								withValidation
								error={errors.date?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="time"
						control={control}
						rules={{
						}}
						render={({ field }) => (
							<Input
								placeholder="time"
								withValidation
								error={errors.time?.message}
								{...field}
							/>
						)}
					/>
					<Controller
						name="notes"
						control={control}
						rules={{
						}}
						render={({ field }) => (
							<Input
								placeholder="notes"
								withValidation
								error={errors.notes?.message}
								{...field}
							/>
						)}
					/>
				</animated.form>
			</Portal>
		))

	);
};
