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
	useEffect,
} from "react";
import { useSelector } from "react-redux";
import { AppLayout } from "@/widgets/AppLayout";
import { createCleanEventDto, entityCalendarEventActions, entityCalendarEventSelectors } from "@/entities/CalendarEvent";
import { tableRootElement } from "@/shared/const";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Tooltip } from "../Tooltip/Tooltip";
import cls from "./MainPage.module.scss";

export const MainPage: FC = memo(() => {
	const dispatch = useAppDispatch();
	const calendarRef = useRef<FullCalendar>(null);

	const eventsData = useSelector(entityCalendarEventSelectors.getData);
	const tableRootElementData = useSelector(entityCalendarEventSelectors.getTableRootElement);

	const handleDateSelect = useCallback((info: DateSelectArg): void => {
		dispatch(entityCalendarEventActions.setSelectedData(info));
		dispatch(entityCalendarEventActions.setIsEditing(false));

		if (tableRootElementData && info.jsEvent) {
			const calendarRect = tableRootElementData.getBoundingClientRect();
			const tooltipLeft = info.jsEvent.pageX - calendarRect.left;
			const tooltipTop = info.jsEvent.pageY - calendarRect.top;

			dispatch(entityCalendarEventActions.setTooltipPosition({ top: tooltipTop, left: tooltipLeft }));
			dispatch(entityCalendarEventActions.setIsTooltipVisible(true));
		}
	}, [dispatch, tableRootElementData]);

	const eventChangeHandler = useCallback((info: EventChangeArg): void => {
		const updatedEvent = createCleanEventDto(info.event);
		console.log(updatedEvent);
		dispatch(entityCalendarEventActions.updateData(updatedEvent));
	}, [dispatch]);

	const eventRemoveHandler = useCallback((removeInfo: EventRemoveArg): void => {
		dispatch(entityCalendarEventActions.removeData(removeInfo.event.id));
	}, [dispatch]);

	const eventsSetHandler = useCallback((events: EventApi[]): void => {
		console.log(events);
	}, []);

	const eventClickHandler = useCallback((info: EventClickArg): void => {
		const selectedEvent = createCleanEventDto(info.event);
		dispatch(entityCalendarEventActions.setSelectedData(selectedEvent));
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
