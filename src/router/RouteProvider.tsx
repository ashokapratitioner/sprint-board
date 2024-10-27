import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import DragDropContextProvider from "../context/BoardContext";

const router = createBrowserRouter(routes);

const RouterProviderExtended = () => {
  return (
    <DragDropContextProvider>
      <RouterProvider router={router} />
    </DragDropContextProvider>
  );
};

export default RouterProviderExtended;
