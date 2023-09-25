import { ITaskArrayModel } from "../models/models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: ITaskArrayModel = {
  isLoadingTasks: false,
  taskList: [],
  single_task: {
    id: "",
    taskName: "",
    description: "",
    createdDate: "",
    priority: 0,
    status: 0,
    deadLine: "",
  },
};

export const taskListSlice = createSlice({
  name: "Task",
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoadingProducts: true,
      };
    },
    success: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
        isLoadingProducts: false,
      };
    },
    error: (state) => {
      return {
        ...state,
        isLoadingProducts: false,
      };
    },
  },
});

export const { start, success, error } = taskListSlice.actions;
export const selectTaskLists = (state: RootState) => state.task;
export const taskListReducer = taskListSlice.reducer;
