import {
	DateSelectArg,
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
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { AppLayout } from "@/widgets/AppLayout";
import { createCleanEventDto, entityCalendarEventActions, entityCalendarEventSelectors } from "@/entities/CalendarEvent";
import { tableRootElement } from "@/shared/const";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Tooltip } from "../Tooltip/Tooltip";
import cls from "./CalendarPage.module.scss";

export const CalendarPage: FC = memo(() => {
	const dispatch = useAppDispatch();
	const calendarRef = useRef<FullCalendar>(null);

	const eventsData = useSelector(entityCalendarEventSelectors.getData);
	const tableRootElementData = useSelector(entityCalendarEventSelectors.getTableRootElement);

	const showTooltip = useCallback((jsEvent: DateSelectArg["jsEvent"]) => {
		if (tableRootElementData && jsEvent) {
			const calendarRect = tableRootElementData.getBoundingClientRect();
			const tooltipLeft = jsEvent.pageX - calendarRect.left;
			const tooltipTop = jsEvent.pageY - calendarRect.top;

			dispatch(entityCalendarEventActions.setTooltipPosition({ top: tooltipTop, left: tooltipLeft }));
			dispatch(entityCalendarEventActions.setIsTooltipVisible(true));
		}
	}, [dispatch, tableRootElementData]);

	const handleDateSelect = useCallback((info: DateSelectArg): void => {
		const updatedEvent = createCleanEventDto(info);
		dispatch(entityCalendarEventActions.setSelectedData(updatedEvent));
		dispatch(entityCalendarEventActions.setIsEditing(false));

		showTooltip(info.jsEvent);
	}, [dispatch, showTooltip]);

	const eventChangeHandler = useCallback((info: EventChangeArg): void => {
		const updatedEvent = createCleanEventDto(info.event);
		dispatch(entityCalendarEventActions.updateData(updatedEvent));
	}, [dispatch]);

	const eventRemoveHandler = useCallback((removeInfo: EventRemoveArg): void => {
		dispatch(entityCalendarEventActions.removeData(removeInfo.event.id));
	}, [dispatch]);

	const eventClickHandler = useCallback((info: EventClickArg): void => {
		const selectedEvent = createCleanEventDto(info.event);
		dispatch(entityCalendarEventActions.setSelectedData((selectedEvent)));
		dispatch(entityCalendarEventActions.setIsEditing(true));

		showTooltip(info.jsEvent);
	}, [dispatch, showTooltip]);

	const eventDragStartHandler = useCallback((): void => {
		dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
	}, [dispatch]);

	useEffect(() => {
		const tableRootElementVar = document.querySelector(tableRootElement);
		if (tableRootElementVar) {
			dispatch(entityCalendarEventActions.setTableRootElement(tableRootElementVar));
		}
	}, [dispatch]);

	return (
		<AppLayout className={cls.CalendarPage}>
			<h1 className={cls.CalendarPage__title}>Calendar</h1>
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
				eventDragStart={eventDragStartHandler}
				height="100%"
			/>
		</AppLayout>
	);
});
