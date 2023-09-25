import { deleteApi, get, post, put } from "./ApiService";

export const getTaskList = async function () {
  return await get(`api/Task/GetAll`);
};

export const getSingleTask = async function (data: string) {
  return await get(`api/Task/${data}`);
};
export const addNewTask = async function (data: object) {
  return await post(`api/Task`, data);
};
export const updateTask = async function (data: object) {
  return await put(`api/Task`, data);
};
export const deleteTask = async function (data: string) {
  return await deleteApi(`api/Task/${data}`);
};
