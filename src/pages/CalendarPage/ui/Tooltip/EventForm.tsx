import { Button, ColorInput, TextInput } from "@mantine/core";
import { TimeInput, DatePickerInput, DateValue } from "@mantine/dates";
import clsx from "clsx";
import {
	FC, useEffect, useCallback,
	useRef,
} from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import { entityCalendarEventActions, entityCalendarEventSelectors } from "@/entities/CalendarEvent";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { createDateWithTime, formatTime } from "../../lib";
import cls from "./style.module.scss";

interface EventFormProps {
	className?: string;
}

interface FormData {
	title: string;
	date: DateValue | null;
	timeStart: string;
	timeEnd: string;
	notes: string;
	color: string;
}

export const EventForm: FC<EventFormProps> = ({ className }) => {
	const dispatch = useAppDispatch();
	const selectedEventData = useSelector(entityCalendarEventSelectors.getSelectedData);
	const isEditing = useSelector(entityCalendarEventSelectors.getIsEditing);

	const colorInputRef = useRef(null);
	const calendarInputRef = useRef(null);

	const {
		handleSubmit, control, reset, formState: { errors }, getValues,
	} = useForm<FormData>({
		defaultValues: {
			title: "",
			date: null,
			timeStart: "",
			timeEnd: "",
			notes: "",
			color: "#039DFF",
		},
		mode: "onBlur",
	});

	useEffect(() => {
		if (selectedEventData) {
			reset({
				title: selectedEventData?.title || "",
				date: selectedEventData?.start || null,
				timeStart: formatTime(selectedEventData?.start) || "",
				timeEnd: formatTime(selectedEventData?.end) || "",
				notes: selectedEventData.extendedProps?.notes || "",
				color: selectedEventData?.extendedProps?.color || "#039DFF",
			});
		}
	}, [selectedEventData, reset]);

	const onSubmit = useCallback((data: FormData) => {
		if (data.date) {
			const startDate = createDateWithTime(data.date, data.timeStart)!;
			const endDate = createDateWithTime(data.date, data.timeEnd)!;

			const newEvent = {
				id: selectedEventData?.id || Math.random().toString(),
				title: data.title,
				start: startDate,
				end: endDate,
				allDay: !(data.timeStart && data.timeEnd),
				borderColor: data.color,
				extendedProps: {
					notes: data.notes,
					timeStart: data.timeStart,
					timeEnd: data.timeEnd,
					color: data.color,
				},
			};

			if (isEditing) {
				dispatch(entityCalendarEventActions.updateData(newEvent));
			} else {
				dispatch(entityCalendarEventActions.addData(newEvent));
			}

			dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
		}
	}, [dispatch, isEditing, selectedEventData]);

	const onClickDiscard = useCallback(() => {
		dispatch(entityCalendarEventActions.removeData(selectedEventData.id));
		dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
	}, [dispatch, selectedEventData]);

	const onClickCancel = useCallback(() => {
		dispatch(entityCalendarEventActions.setIsTooltipVisible(false));
	}, [dispatch]);

	useEffect(() => {
	}, []);

	return (
		<form className={clsx(cls.EventForm, {}, [className])} onSubmit={handleSubmit(onSubmit)}>
			<div className={cls.EventForm__buttons}>
				{isEditing ? (
					<>
						<Button type="submit">Edit</Button>
						<Button color="red" variant="filled" onClick={onClickDiscard}>Discard</Button>
					</>
				) : (
					<Button type="submit">Save</Button>
				)}
				<Button color="red" variant="outline" onClick={onClickCancel}>Cancel</Button>
			</div>

			<Controller
				name="title"
				control={control}
				rules={{
					required: "Event title is required",
					maxLength: { value: 32, message: "Maximum 32 characters allowed" },
				}}
				render={({ field }) => (
					<TextInput
						label="Event title"
						placeholder="Event title"
						error={errors.title?.message}
						{...field}
					/>
				)}
			/>

			<Controller
				name="date"
				control={control}
				rules={{ required: "Date is required" }}
				render={({ field }) => (
					<DatePickerInput
						label="Date"
						placeholder="Date"
						error={errors.date?.message}
						{...field}
						ref={calendarInputRef}
					/>
				)}
			/>

			<Controller
				name="timeStart"
				control={control}
				rules={{
					required: "Start time is required",
					pattern: {
						value: /^([01]\d|2[0-3]):([0-5]\d)$/,
						message: "Invalid time format",
					},
				}}
				render={({ field }) => (
					<TimeInput
						label="Start time"
						error={errors.timeStart?.message}
						{...field}
					/>
				)}
			/>

			<Controller
				name="timeEnd"
				control={control}
				rules={{
					required: "End time is required",
					pattern: {
						value: /^([01]\d|2[0-3]):([0-5]\d)$/,
						message: "Invalid time format",
					},
					validate: (value) => {
						if (value === getValues("timeStart")) {
							return "Start time and end time cannot be the same";
						}

						if (value < getValues(("timeStart"))) {
							return "End time cannot be earlier than start time";
						}
						return true;
					},
				}}
				render={({ field }) => (
					<TimeInput
						label="End time"
						error={errors.timeEnd?.message}
						{...field}
					/>
				)}
			/>

			<Controller
				name="notes"
				control={control}
				rules={{
					maxLength: { value: 32, message: "Maximum 32 characters allowed" },
				}}
				render={({ field }) => (
					<TextInput
						label="Notes"
						placeholder="Notes"
						error={errors.notes?.message}
						{...field}
					/>
				)}
			/>

			<Controller
				name="color"
				control={control}
				render={({ field }) => (
					<ColorInput
						label="Color"
						placeholder="Color"
						withEyeDropper={false}
						error={errors.color?.message}
						{...field}
						ref={colorInputRef}
					/>
				)}

			/>
		</form>
	);
};
