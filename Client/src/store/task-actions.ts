import {
  getTaskList,
  getSingleTask,
  addNewTask,
  updateTask,
  deleteTask,
} from "../services/TaskService";
import { start, success, error } from "./task-slice";
import { toast } from "react-toastify";

export const fetchTasks = () => async (dispatch: any) => {
  dispatch(start());
  try {
    const taskLists = await getTaskList();
    dispatch(success({ taskList: taskLists.data }));
  } catch (err: any) {
    dispatch(error(err));
  }
};

export const fetchSingleTask = (id: any) => async (dispatch: any) => {
  dispatch(start());

  try {
    const task = await getSingleTask(id);

    dispatch(success({ single_task: task.data }));
  } catch (err: any) {
    dispatch(error(err));
  }
};

export const addSingleTask = (data: any) => async (dispatch: any) => {
  dispatch(start());

  try {
    const task = await addNewTask(data);

    dispatch(success({ taskList: task.data }));
    toast.success("task added successfully");
  } catch (err: any) {
    dispatch(error(err));
  }
};

export const updateSingleTask = (data: any) => async (dispatch: any) => {
  dispatch(start());

  try {
    const task = await updateTask(data);

    dispatch(success({ single_task: task.data }));
    toast.success("Update successfully");
  } catch (err: any) {
    dispatch(error(err));
  }
};

export const deleteSingleTask = (id: any) => async (dispatch: any) => {
  dispatch(start());
  try {
    const task = await deleteTask(id);
    console.log(task);
    dispatch(success({ taskList: task.data }));

    toast.success("Delete successfully");
  } catch (err: any) {
    dispatch(error(err));
  }
};
