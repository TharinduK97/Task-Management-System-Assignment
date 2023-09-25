import Dashboard from "./pages/Dashboard/DashBoard";
import TaskEdit from "./pages/TaskEditPage/TaskEdit";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AddNewTask from "./pages/AddNewTask/AddNewTask";
import TaskViewPage from "./pages/TaskViewPage/TaskViewPage";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*">
            <Route index element={<Dashboard />} />
            <Route path="taskview/:id" element={<TaskViewPage />} />
          </Route>
          <Route path="/edit" element={<TaskEdit />} />
          <Route path="/addnewtask" element={<AddNewTask />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
