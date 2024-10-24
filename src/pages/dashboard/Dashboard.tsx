import { Outlet, useParams } from "react-router-dom";
import PaperContainerComponent from "../../components/Paper/PaperComponentContainer";
import { tasks } from "../../data/tasks";
import { useBoard } from "../../hooks/useBoard";


const Dashboard = () => {
  const { id } = useParams();
  const { board, getBoardAsArray } = useBoard();

  
  const dashboard = getBoardAsArray(board);
  
 

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
