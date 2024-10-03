import { DateSelectArg, EventChangeArg } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal";
import { Event } from "../model/types/EntityCalendarEventSchema";

export function createCleanEventDto(
	event: EventChangeArg["event"] | EventImpl,
	newId?: string,
): Event {
	return {
		id: newId || event.id || Math.random().toString(),
		title: event.title || "",
		start: event.start || new Date(),
		end: event.end || new Date(),
		allDay: event.allDay ?? true,
		backgroundColor: event.backgroundColor || "#FFFFFF",
		borderColor: event.borderColor || "#FFFFFF",
		textColor: event.textColor || "#000000",
		extendedProps: {
			notes: event.extendedProps?.notes || "",
			timeStart: event.extendedProps?.timeStart || "",
			timeEnd: event.extendedProps?.timeEnd || "",
			color: event.extendedProps?.color || "#FFFFFF",
		},
	};
}
