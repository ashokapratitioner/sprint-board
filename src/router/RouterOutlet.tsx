import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/Layout/HeaderComponent";

const RouterOutlet = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default RouterOutlet;
