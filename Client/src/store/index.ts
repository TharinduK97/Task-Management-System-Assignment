import { configureStore } from "@reduxjs/toolkit";
import { taskListReducer } from "./task-slice";

export const store = configureStore({
  reducer: {
    task: taskListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
