import {
	DateSelectArg,
	EventApi,
	EventChangeArg,
	EventClickArg,
	EventRemoveArg,
} from "@fullcalendar/core/index.js";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import {
	FC,
	memo,
	useCallback,
	useRef,
	useState,
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { AppLayout } from "@/widgets/AppLayout";
import { entityCalendarEventActions, entityCalendarEventSelectors } from "@/entities/CalendarEvent";
import { tableRootElement } from "@/shared/const";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Tooltip } from "../Tooltip/Tooltip";
import cls from "./MainPage.module.scss";

export const MainPage: FC = memo(() => {
	const dispatch = useAppDispatch();
	const calendarRef = useRef<FullCalendar>(null);

	const eventsData = useSelector(entityCalendarEventSelectors.getData);
	const tableRootElementData = useSelector(entityCalendarEventSelectors.getTableRootElement);

	// Обработчик кликов вне tooltip, чтобы его закрыть
	// const [tooltipOpened, setTooltipOpened] = useState(false);
	// useEffect(() => {
	// 	const handleClickOutside = (event: MouseEvent) => {
	// 		if (
	// 			tooltipOpened
	// 			&& calendarWrapperRef.current
	// 			&& !calendarWrapperRef.current.contains(event.target as Node)
	// 		) {
	// 			setTooltipOpened(false);
	// 		}
	// 	};

	// 	document.addEventListener("click", handleClickOutside);
	// 	return () => {
	// 		document.removeEventListener("click", handleClickOutside);
	// 	};
	// }, [tooltipOpened]);

	const handleDateSelect = useCallback((info: DateSelectArg): void => {
		dispatch(entityCalendarEventActions.setSelectedData(info));
		dispatch(entityCalendarEventActions.setIsEditing(false));

		console.log(tableRootElementData);
		if (tableRootElementData && info.jsEvent) {
			const calendarRect = tableRootElementData.getBoundingClientRect();
			const tooltipLeft = info.jsEvent.pageX - calendarRect.left;
			const tooltipTop = info.jsEvent.pageY - calendarRect.top;

			dispatch(entityCalendarEventActions.setTooltipPosition({ top: tooltipTop, left: tooltipLeft }));
			dispatch(entityCalendarEventActions.setIsTooltipVisible(true));
		}
	}, [dispatch, tableRootElementData]);

	const eventChangeHandler = useCallback((info: EventChangeArg): void => {
		const updatedEvent = {
			id: info.event.id,
			title: info.event.title,
			start: info.event.startStr,
			end: info.event.endStr,
			allDay: info.event.allDay,
			color: info.event.extendedProps.color,
			notes: info.event.extendedProps.notes,
		};

		// @ts-ignore
		dispatch(entityCalendarEventActions.updateData(updatedEvent));
	}, [dispatch]);

	const eventRemoveHandler = useCallback((removeInfo: EventRemoveArg): void => {
		dispatch(entityCalendarEventActions.removeData(removeInfo.event.id));
	}, [dispatch]);

	const eventsSetHandler = useCallback((events: EventApi[]): void => {
		console.log(events);
	}, []);

	const eventClickHandler = useCallback((info: EventClickArg): void => {
		dispatch(entityCalendarEventActions.setSelectedData(info.event));
		dispatch(entityCalendarEventActions.setIsEditing(true));

		if (tableRootElementData) {
			const calendarRect = tableRootElementData.getBoundingClientRect();
			const tooltipLeft = info.jsEvent.pageX - calendarRect.left;
			const tooltipTop = info.jsEvent.pageY - calendarRect.top;

			dispatch(entityCalendarEventActions.setTooltipPosition({ top: tooltipTop, left: tooltipLeft }));
			dispatch(entityCalendarEventActions.setIsTooltipVisible(true));
		}
	}, [dispatch, tableRootElementData]);

	useEffect(() => {
		console.log(calendarRef.current);
		const tableRootElementVar = document.querySelector(tableRootElement);
		if (tableRootElementVar) {
			dispatch(entityCalendarEventActions.setTableRootElement(tableRootElementVar));
		}
	}, [dispatch]);

	return (
		<AppLayout className={cls.MainPage}>
			<Tooltip />
			<FullCalendar
				ref={calendarRef}
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay",
				}}
				initialView="dayGridMonth"
				editable
				selectable
				selectMirror
				dayMaxEvents
				events={eventsData}
				select={handleDateSelect}
				eventClick={eventClickHandler}
				eventChange={eventChangeHandler}
				eventRemove={eventRemoveHandler}
				eventsSet={eventsSetHandler}
				height="100%"
			/>
		</AppLayout>
	);
});
