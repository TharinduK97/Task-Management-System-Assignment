import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchTasks } from "../../store/task-actions";
import { useEffect } from "react";
import TaskListItem from "./TaskListItem";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const task = useAppSelector((state) => state.task);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6 mx-1">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Task
            </th>
            <th scope="col" className="px-6 py-3">
              Priority
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>

            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {task.taskList.map((task, index: number) => {
            return <TaskListItem task={task} num={index + 1} key={index} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
