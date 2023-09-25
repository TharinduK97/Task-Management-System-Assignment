import TopBar from "../../components/TopBar/TopBar";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../hooks";
import { addSingleTask } from "../../store/task-actions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface IFormInputs {
  TaskName: string;
  Description: string;
  Priority: string;
  DeadLine: Date;
}
const currentDate = new Date();

const maxDate = new Date(currentDate);
maxDate.setFullYear(maxDate.getFullYear() + 2);

const schema = yup
  .object({
    TaskName: yup
      .string()
      .required("Task Name is required")
      .min(6, "Task Name must be at least 6 characters")
      .max(250, "Task Name must not exceed 40 characters"),
    Description: yup
      .string()
      .required("Description is required")
      .min(6, "Description must be at least 6 characters")
      .max(500, "Description must not exceed 500 characters"),
    Priority: yup.string().required("Please select a priority"),
    DeadLine: yup
      .date()
      .required("DeadLine is required")
      .min(new Date(), "DeadLine Must be a upcomming date")
      .max(maxDate, "Must be within two years"),
  })
  .required();

function AddNewTask() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: IFormInputs) => {
    let taskObj = {
      taskName: data.TaskName,
      description: data.Description,
      priority: parseInt(data.Priority),
      status: 3,
      deadLine: data.DeadLine,
    };
    dispatch(addSingleTask(taskObj));
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
                    {...register("TaskName")}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.TaskName?.message}
                  </p>
                </label>
              </div>

              <div className="sm:col-span-4">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    {...register("Description")}
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  ></textarea>
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.Description?.message}
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
                    {...register("Priority")}
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
                    {errors.Priority?.message}
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
                    {...register("DeadLine")}
                    type="date"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <label>
                  <p className="text-red-500 pl-1 text-sm">
                    {errors.DeadLine?.message}
                  </p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/"
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>
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

export default AddNewTask;
