import TopBar from "../../components/TopBar/TopBar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { updateSingleTask } from "../../store/task-actions";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
  taskName: string;
  description: string;
  priority: string;
  status: string;
  deadLine: Date;
}

const currentDate = new Date();
const maxDate = new Date(currentDate);
maxDate.setFullYear(maxDate.getFullYear() + 2);

const schema = yup
  .object({
    taskName: yup
      .string()
      .required("Task Name is required")
      .min(6, "Task Name must be at least 6 characters")
      .max(250, "Task Name must not exceed 40 characters"),
    description: yup
      .string()
      .required("Description is required")
      .min(6, "Description must be at least 6 characters")
      .max(500, "Description must not exceed 500 characters"),
    priority: yup.string().required("Please select a priority"),
    status: yup.string().required("Please select a priority"),
    deadLine: yup
      .date()
      .required("DeadLine is required")
      .min(new Date(), "DeadLine Must be a upcomming date")
      .max(maxDate, "DeadLine Must be within two years"),
  })
  .required();

function TaskEditPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const task = useAppSelector((state) => state.task);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    defaultValues: {
      taskName: task.single_task.taskName,
      description: task.single_task.description,
      priority: task.single_task.priority.toString(),
      status: task.single_task.status.toString(),
      deadLine: new Date(task.single_task.deadLine),
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IFormInputs) => {
    let taskObj = {
      id: task.single_task.id,
      taskName: data.taskName,
      description: data.description,
      createdDate: task.single_task.createdDate,
      priority: parseInt(data.priority),
      status: parseInt(data.status),
      deadLine: task.single_task.deadLine,
    };
    dispatch(updateSingleTask(taskObj));
    navigate("/");
  };

  return (
    <>
      <TopBar></TopBar>
      <form className="m-8 container mx-auto" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Task
                </label>
                <div className="mt-2">
                  <input
                    {...register("taskName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.taskName?.message}
                  </p>
                </label>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("description")}
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.description?.message}
                  </p>
                </label>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Priority
                </label>
                <div className="mt-2">
                  <select
                    {...register("priority")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled>Select a Priority</option>
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.priority?.message}
                  </p>
                </label>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Status
                </label>
                <div className="mt-2">
                  <select
                    {...register("status")}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                    <option disabled>Select a status</option>
                    <option value="1">Done</option>
                    <option value="2">InProgress</option>
                    <option value="3">To-Do</option>
                  </select>
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.status?.message}
                  </p>
                </label>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  DeadLine
                </label>
                <div className="mt-2">
                  <input
                    {...register("deadLine")}
                    type="date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.deadLine?.message}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
}

export default TaskEditPage;
