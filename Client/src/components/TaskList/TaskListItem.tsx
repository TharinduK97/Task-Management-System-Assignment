import { Link } from "react-router-dom";

type itemprops = {
  num: number;
  task: {
    id: string;
    taskName: string;
    description: string;
    createdDate: string;
    priority: number;
    status: number;
    deadLine: string;
  };
};
function TaskListItem(props: itemprops) {
  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={props.num}
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {props.task.taskName}
      </th>
      <td className="px-6 py-4">
        {props.task.priority == 1 ? (
          <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            High
          </span>
        ) : props.task.priority == 2 ? (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Medium
          </span>
        ) : (
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
            low
          </span>
        )}
      </td>
      <td className="px-6 py-4">
        {props.task.status === 1 ? (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Done</p>
          </div>
        ) : props.task.status == 2 ? (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-gray-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">Ongoing</p>
          </div>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-gray-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">To-Do</p>
          </div>
        )}
      </td>

      <td className="px-6 py-4">
        <div>
          <Link
            to={`taskview/${props.task.id}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            View
          </Link>
        </div>
      </td>
    </tr>
  );
}

export default TaskListItem;
