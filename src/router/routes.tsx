import RouterOutlet from "./RouterOutlet";
import DialogTask from "../components/Dialog/DialogTask";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import ErrorBoundary from "../components/ErrorHandler/ErrorhandlerComponent";
import SuspenseComponent from "../components/Shared/SuspenseComponent";

const Home = lazy(() => import("../pages/home/Home"));
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const TaskExpandView = lazy(() => import("../components/Tasks/TaskExpandView"));

const TaskDialogView = DialogTask(TaskExpandView);
export const routes = [
  {
    path: "/",
    element: <RouterOutlet />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <SuspenseComponent>
            <Home />
          </SuspenseComponent>
        ),
      },
      {
        path: "home",
        element: (
          <SuspenseComponent>
            <Home />
          </SuspenseComponent>
        ),
      },
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
