import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

const router = createBrowserRouter(routes);

const RouterProviderExtended = () => {
  return <RouterProvider router={router} />;
};

export default RouterProviderExtended;
