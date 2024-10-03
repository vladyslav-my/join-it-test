export interface EntityCalendarEventSchema {
	data: Event[];
	selectedData: any;
	tooltipPosition?: { top: number; left: number };
	isTooltipVisible: boolean;
	isEditing: boolean;
	tableRootElement: any;
}

export interface CalendarEvent {

}

interface ExtendedProps {
	notes?: string;
	timeStart?: string;
	timeEnd?: string;
	color: string;
}

export interface Event {
	id: string;
	title: string;
	start: Date;
	end: Date;
	allDay: boolean;
	borderColor: string;
	textColor: string;
	extendedProps: ExtendedProps;
}
