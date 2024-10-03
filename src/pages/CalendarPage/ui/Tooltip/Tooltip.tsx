import { Portal } from "@mantine/core";
import { useTransition, animated } from "@react-spring/web";
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

	const transition = useTransition(isTooltipVisible, {
		from: {
			opacity: 0,
		},
		enter: {
			opacity: 1,
		},
		leave: {
			opacity: 0,
		},
		config: {
			duration: 300,
			easing: (t) => t * t * (3 - 2 * t),
		},
	});

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				isTooltipVisible
				&& tableRootElementData
				&& !tableRootElementData.contains(event.target as Node)
				&& !document.contains(document.querySelector(".mantine-Popover-dropdown"))
				&& !document.contains(document.querySelector(".mantine-ColorInput-slider"))
			) {
				dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, [dispatch, isTooltipVisible, tableRootElementData]);

	useEffect(() => {
		const handleClickEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
			}
		};

		document.addEventListener("keydown", handleClickEscape);
		return () => {
			document.removeEventListener("keydown", handleClickEscape);
		};
	}, [dispatch, isTooltipVisible]);

	return transition((styles, isOpen) => isOpen && (
		<Portal target={tableRootElementData as HTMLElement}>
			<animated.div
				className={clsx(cls.Tooltip, {}, [className])}
				style={{
					position: "absolute",
					top: tooltipPosition?.top,
					left: tooltipPosition?.left,
					...styles,
				}}
			>
				<EventForm />
			</animated.div>
		</Portal>
	));
};
