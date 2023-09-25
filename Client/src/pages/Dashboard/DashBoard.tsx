import TopBar from "../../components/TopBar/TopBar";
import TaskList from "../../components/TaskList/TaskList";
function Dashboard() {
  return (
    <>
      <TopBar></TopBar>
      <div className="container mx-auto">
        <TaskList></TaskList>
      </div>
    </>
  );
}
export default Dashboard;
