import { get } from "http";
import { DateSelectArg, EventClickArg } from "@fullcalendar/core/index.js";
import { EventImpl } from "@fullcalendar/core/internal";
import { PayloadAction } from "@reduxjs/toolkit";
import { set } from "react-hook-form";
import { createSliceWithThunk } from "@/shared/lib/createSliceWithThunk";
import { EntityCalendarEventSchema, Event } from "../types/EntityCalendarEventSchema";

const initialState: EntityCalendarEventSchema = {
	data: [],
	selectedData: undefined,
	tooltipPosition: undefined,
	isTooltipVisible: false,
	isEditing: false,
	tableRootElement: undefined,
};

export const entityCalendarEventSlice = createSliceWithThunk({
	name: "entityCalendarEvent",
	initialState,
	reducers: (create) => ({
		setData: create.reducer((state, action: PayloadAction<any>) => {
			state.data = action.payload;
		}),

		addData: create.reducer((state, action: PayloadAction<Event>) => {
			state.data.push(action.payload);
		}),
		updateData: create.reducer((state, action: PayloadAction<Event>) => {
			const index = state.data.findIndex((event) => event.id === action.payload.id);
			if (index !== -1) {
				state.data[index] = action.payload;
			}
		}),
		removeData: create.reducer((state, action: PayloadAction<string>) => {
			state.data = state.data.filter((event) => event.id !== action.payload);
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
