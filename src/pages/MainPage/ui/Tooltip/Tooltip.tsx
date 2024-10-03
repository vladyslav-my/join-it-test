import { Portal } from "@mantine/core";
import clsx from "clsx";
import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { entityCalendarEventActions, entityCalendarEventSelectors } from "@/entities/CalendarEvent";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { EventForm } from "./EventForm";
import cls from "./style.module.scss";

interface TooltipProps {
	className?: string;
}

export const Tooltip: FC<TooltipProps> = ({
	className,
}) => {
	const dispatch = useAppDispatch();
	const tooltipPosition = useSelector(entityCalendarEventSelectors.getTooltipPosition);
	const isTooltipVisible = useSelector(entityCalendarEventSelectors.getIsTooltipVisible);
	const tableRootElementData = useSelector(entityCalendarEventSelectors.getTableRootElement);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isTooltipVisible
				&& tableRootElementData
				&& !tableRootElementData.contains(event.target as Node)
			) {
				dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [dispatch, isTooltipVisible, tableRootElementData]);

	if (!isTooltipVisible) {
		return null;
	}

	return (
		<Portal target={tableRootElementData as HTMLElement}>
			<div
				className={clsx(cls.Tooltip, {}, [className])}
				style={{
					position: "absolute",
					top: tooltipPosition?.top,
					left: tooltipPosition?.left,
				}}
			>
				<EventForm />
			</div>
		</Portal>

	);
};
