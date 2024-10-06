import RouterOutlet from "./RouterOutlet";
import DialogTask from "../components/Dialog/DialogTask";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/home/Home"))
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const TaskExpandView = lazy(() => import("../components/Tasks/TaskExpandView"));

const TaskDialogView = DialogTask(TaskExpandView);
export const routes = [
  {
    path: "/",
    element: <RouterOutlet />,
    errorElement: <div>404</div>,
    children: [
      { index: true,  element: <Home /> },
      { path: "home", element: <Home /> },
      {
        path: "tasks",
        element: <ProtectedRoute element={Dashboard} />,
        children: [
          {
            path: ":id",
            element: <ProtectedRoute element={TaskDialogView} />,
          },
        ],
      },
    ],
  },
];
