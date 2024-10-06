import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Layout/HeaderComponent";
import { useAuth0 } from "@auth0/auth0-react";
import Home from "../pages/home/Home";

const RouterOutlet = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default RouterOutlet;
