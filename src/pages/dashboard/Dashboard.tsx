import { Outlet, useParams } from "react-router-dom";
import PaperContainerComponent from "../../components/Paper/PaperComponentContainer";
import { tasks } from "../../data/tasks";

const dashboard = [
  { name: "To dos", value: "todo", order: 0 },
  { name: "In Progress", value: "in-progress", order: 1 },
  { name: "Done", value: "done", order: 2 },
];

const Dashboard = () => {
  const { id } = useParams();

  return (
    <>
      <PaperContainerComponent
        columns={dashboard}
        data={tasks}
        dragSupport={true}
      />
      {id && <Outlet />}
    </>
  );
};

export default Dashboard;
