import { PayloadAction } from "@reduxjs/toolkit";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityCalendarEventSchema, Event } from "../types/EntityCalendarEventSchema";

const initialState: EntityCalendarEventSchema = {
	data: JSON.parse(localStorage.getItem("calendarData") || "[]"),
	selectedData: undefined,
	tooltipPosition: undefined,
	isTooltipVisible: false,
	isEditing: false,
	tableRootElement: undefined,
};

const saveToLocalStorage = (data: EntityCalendarEventSchema) => {
	localStorage.setItem("calendarData", JSON.stringify(data.data));
};

export const entityCalendarEventSlice = createSliceWithThunk({
	name: "entityCalendarEvent",
	initialState,
	reducers: (create) => ({
		setData: create.reducer((state, action: PayloadAction<any>) => {
			state.data = action.payload;
			saveToLocalStorage(state);
		}),

		addData: create.reducer((state, action: PayloadAction<Event>) => {
			state.data.push(action.payload);
			saveToLocalStorage(state);
		}),

		updateData: create.reducer((state, action: PayloadAction<Event>) => {
			const index = state.data.findIndex((event) => event.id === action.payload.id);
			if (index !== -1) {
				state.data[index] = action.payload;
				saveToLocalStorage(state);
			}
		}),

		removeData: create.reducer((state, action: PayloadAction<string>) => {
			state.data = state.data.filter((event) => event.id !== action.payload);
			saveToLocalStorage(state);
		}),

		setSelectedData: create.reducer((state, action: PayloadAction<Event>) => {
			state.selectedData = action.payload;
		}),

		setTooltipPosition: create.reducer((state, action: PayloadAction<{ top: number; left: number }>) => {
			state.tooltipPosition = action.payload;
		}),

		setIsTooltipVisible: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isTooltipVisible = action.payload;
		}),

		setIsEditing: create.reducer((state, action: PayloadAction<boolean>) => {
			state.isEditing = action.payload;
		}),

		setTableRootElement: create.reducer((state, action: PayloadAction<Element>) => {
			state.tableRootElement = action.payload;
		}),
	}),
	selectors: {
		getData: (state) => state.data,
		getSelectedData: (state) => state.selectedData,
		getTooltipPosition: (state) => state.tooltipPosition,
		getIsTooltipVisible: (state) => state.isTooltipVisible,
		getIsEditing: (state) => state.isEditing,
		getTableRootElement: (state) => state.tableRootElement,
	},
});

export const { actions: entityCalendarEventActions, selectors: entityCalendarEventSelectors } = entityCalendarEventSlice;
