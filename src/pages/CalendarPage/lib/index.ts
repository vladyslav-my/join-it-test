import { DateValue } from "@mantine/dates";

export const createDateWithTime = (date: DateValue, time: string): DateValue => {
	if (date) {
		const [hours, minutes] = time.split(":").map(Number);
		const resultDate = new Date(date);
		resultDate.setHours(hours, minutes);
		return resultDate;
	}

	return null;
};

export const formatTime = (date: Date): string => {
	const hours = String(date.getHours()).padStart(2, "0");
	const minutes = String(date.getMinutes()).padStart(2, "0");
	return `${hours}:${minutes}`;
};
