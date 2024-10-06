import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";

function NavBarComponent() {
  const { isAuthenticated } = useAuth0<any>();

  if(!isAuthenticated) return null;

  return (
    <div className="hidden lg:flex space-x-4">
      <NavLink
        to={"/tasks"}
        className="hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium text-white"
      >
        Tasks
      </NavLink>
    </div>
  );
}

export default NavBarComponent;
