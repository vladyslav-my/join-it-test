import { start } from "repl";
import {
	ActionIcon, Button, ColorInput, TextInput,
} from "@mantine/core";
import { TimeInput, DatePickerInput, DateValue } from "@mantine/dates";
import { IconClock } from "@tabler/icons-react";
import clsx from "clsx";
import {
	FC, MouseEventHandler, useCallback, useEffect, useRef, useState,
} from "react";
import { useSelector } from "react-redux";
import { entityCalendarEventActions, entityCalendarEventSelectors } from "@/entities/CalendarEvent";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import cls from "./style.module.scss";

const formatTime = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${hours}:${minutes}`;
};

interface EventFormProps {
	className?: string
}

export const EventForm: FC<EventFormProps> = ({ className }) => {
	const ref = useRef<HTMLInputElement>(null);

	const dispatch = useAppDispatch();
	const selectedEventData = useSelector(entityCalendarEventSelectors.getSelectedData);
	const isEditing = useSelector(entityCalendarEventSelectors.getIsEditing);

	const [title, setTitle] = useState("");
	const [timeStart, setTimeStart] = useState("");
	const [timeEnd, setTimeEnd] = useState("");
	const [date, setDate] = useState<DateValue>(null);
	const [notes, setNotes] = useState("");
	const [color, setColor] = useState("");

	const onClickSave = useCallback((event: any) => {
		if (date) {
			const startDate = new Date(date);
			startDate.setHours(Number(timeStart.split(":")[0]), Number(timeStart.split(":")[1]));

			const endDate = new Date(date);
			endDate.setHours(Number(timeEnd.split(":")[0]), Number(timeEnd.split(":")[1]));

			const newEvent = {
				id: Math.random().toString(),
				title,
				start: startDate,
				end: endDate,
				allDay: !(timeStart && timeEnd),
				backgroundColor: color,
				borderColor: color,
				textColor: color,
				extendedProps: {
					notes,
					timeStart,
					timeEnd,
					color,
				},
			};

			// @ts-ignore
			dispatch(entityCalendarEventActions.addData(newEvent));
			dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
		}
	}, [color, date, dispatch, notes, timeEnd, timeStart, title]);

	const onClickEdit = useCallback(() => {
		if (date) {
			const startDate = new Date(date);
			startDate.setHours(Number(timeStart.split(":")[0]), Number(timeStart.split(":")[1]));

			const endDate = new Date(date);
			endDate.setHours(Number(timeEnd.split(":")[0]), Number(timeEnd.split(":")[1]));

			const editableEvent = {
				id: Math.random().toString(),
				title,
				start: startDate,
				end: endDate,
				allDay: !(timeStart && timeEnd),
				backgroundColor: color,
				borderColor: color,
				textColor: color,
				extendedProps: {
					notes,
					timeStart,
					timeEnd,
					color,
				},
			};

			dispatch(entityCalendarEventActions.updateData({
				id: selectedEventData.id,
				data: editableEvent,
			}));
			dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
		}
	}, [color, date, dispatch, notes, selectedEventData.id, timeEnd, timeStart, title]);

	const onClickDisacard = useCallback(() => {
		dispatch(entityCalendarEventActions.removeData(selectedEventData.id));
		dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
	}, [dispatch]);

	const onClickCancel = useCallback(() => {
		dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
	}, [dispatch]);

	useEffect(() => {
		console.log(selectedEventData);
		setTitle(selectedEventData?.title || "");
		setNotes(selectedEventData?.notes || "");
		setColor(selectedEventData?.extendedProps?.color || "#039DFF");
		setTimeStart(formatTime(new Date(selectedEventData?.start)) || "");
		setTimeEnd(formatTime(new Date(selectedEventData?.end)) || "");
		setNotes(selectedEventData.extendedProps?.notes || "");
		setDate(selectedEventData?.start || new Date().getDate());
	}, [selectedEventData]);

	const onChangeStartTime = useCallback((e: any) => {
		setTimeStart(e.target.value);
		console.log(e.target.value);
	}, []);

	const onChangeEndTime = useCallback((e: any) => {
		setTimeEnd(e.target.value);
		console.log(e.target.value);
	}, []);

	const onChangeDate = useCallback((value: DateValue) => {
		setDate(value);
		console.log(value);
	}, []);

	const onChangeTitle = useCallback((e: any) => {
		setTitle(e.target.value);
		console.log(e.target.value);
	}, []);

	const onChangeNotes = useCallback((e: any) => {
		setNotes(e.target.value);
		console.log(e.target.value);
	}, []);

	const onChangeColor = useCallback((value: string) => {
		setColor(value);
		console.log(value);
	}, []);

	return (
		<div className={clsx(cls.EventForm, {}, [className])}>
			{isEditing
				? (
					<>
						<Button onClick={onClickEdit}>Edit</Button>
						<Button color="red" variant="outline" onClick={onClickDisacard}>Disacard</Button>
					</>
				)
				: (
					<>
						<Button onClick={onClickCancel}>Cancel</Button>
						<Button onClick={onClickSave}>Save</Button>
					</>
				)}

			<TextInput
				label="Event title"
				placeholder="Event title"
				value={title}
				onChange={onChangeTitle}
			/>
			<DatePickerInput
				label="Pick date"
				placeholder="Pick date"
				value={date}
				onChange={onChangeDate}
			/>
			<TimeInput
				label="Start time"
				ref={ref}
				onChange={onChangeStartTime}
				value={timeStart}
			/>
			<TimeInput
				label="End time"
				ref={ref}
				onChange={onChangeEndTime}
				value={timeEnd}
			/>
			<TextInput
				label="Notes"
				placeholder="Notes"
				value={notes}
				onChange={onChangeNotes}
			/>
			<ColorInput
				label="Color"
				placeholder="Color"
				value={color}
				onChange={onChangeColor}
			/>
		</div>
	);
};

// const pickerControl = (
// 	<ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
// 		<IconClock style={{ width: 16, height: 16 }} stroke={1.5} />
// 	</ActionIcon>
// );
