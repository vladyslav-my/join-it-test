import { DateSelectArg, EventChangeArg } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal";
import { Event } from "../model/types/EntityCalendarEventSchema";

export function createCleanEventDto(
	event: EventChangeArg["event"] | EventImpl | DateSelectArg,
	newId?: string,
): Event {
	const eventWithDefaults = event as Partial<EventChangeArg["event"]> & Partial<EventImpl> & Partial<DateSelectArg>;

	return {
		id: newId || eventWithDefaults.id || Math.random().toString(),
		title: eventWithDefaults.title || "",
		start: eventWithDefaults.start || new Date(),
		end: eventWithDefaults.end || new Date(),
		allDay: eventWithDefaults.allDay ?? true,
		backgroundColor: eventWithDefaults.backgroundColor || "#FFFFFF",
		borderColor: eventWithDefaults.borderColor || "#FFFFFF",
		textColor: eventWithDefaults.textColor || "#000000",
		extendedProps: {
			notes: eventWithDefaults.extendedProps?.notes || "",
			timeStart: eventWithDefaults.extendedProps?.timeStart || "",
			timeEnd: eventWithDefaults.extendedProps?.timeEnd || "",
			color: eventWithDefaults.extendedProps?.color || "#FFFFFF",
		},
	};
}
