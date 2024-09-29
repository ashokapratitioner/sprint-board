import RouterOutlet from "./RouterOutlet";
import Dashboard from "../pages/dashboard/Dashboard";
import DialogTask from "../components/Dialog/DialogTask";
import TaskExpandView from "../components/Tasks/TaskExpandView";

const TaskDialogView = DialogTask(TaskExpandView);

export const routes = [
  {
    path: "/",
    element: <RouterOutlet />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "tasks",
        element: <Dashboard />,
        children: [
          {
            path: ":id",
            element: <TaskDialogView />,
          },
        ],
      },
    ],
  },
];
