import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import BoardContextProvider from "../context/BoardContext";

const router = createBrowserRouter(routes);

const RouterProviderExtended = () => {
  return (
    <BoardContextProvider>
      <RouterProvider router={router} />
    </BoardContextProvider>
  );
};

export default RouterProviderExtended;
