import { Outlet, useParams } from "react-router-dom";
import PaperContainerComponent from "../../components/Paper/PaperComponentContainer";
import { tasks } from "../../data/tasks";
import { useQueryHook } from "../../hooks/useQueryHook";
const dashboard = [
  { name: "To dos", value: "todo", order: 0 },
  { name: "In Progress", value: "in-progress", order: 1 },
  { name: "Done", value: "done", order: 2 },
];

const Dashboard = () => {
  const { data, isError, isFetching, isLoading } = useQueryHook("dashboard");

  console.log(data);

  const { id } = useParams();
  return (
    <>
      <PaperContainerComponent columns={dashboard} data={tasks} />
      {id && <Outlet />}
    </>
  );
};

export default Dashboard;
