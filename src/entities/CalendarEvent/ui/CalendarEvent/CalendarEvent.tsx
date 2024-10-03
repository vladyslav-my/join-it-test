import clsx from "clsx";
import { FC, memo } from "react";
import cls from "./CalendarEvent.module.scss";

interface CalendarEventProps {
	className?: string;
}

export const CalendarEvent: FC<CalendarEventProps> = memo(({ className }) => {
	return (
		<div className={clsx(cls.CalendarEvent, [className])}>
			CalendarEvent
		</div>
	);
});
