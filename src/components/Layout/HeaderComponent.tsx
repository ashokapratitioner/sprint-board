import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.webp";
import LoginComponent from "../Auth/LoginComponent";
import ProfileComponent from "../Auth/ProfileComponent";
import NavBarComponent from "./NavBarComponent";

export default function HeaderComponent() {
  const navigate = useNavigate();
  const navigateToHome = () => {
    navigate("/");
  }

  return (
    <nav className="bg-slate-500 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
      <div className="flex items-center lg:order-1">
        <a onClick={navigateToHome} className="flex cursor-pointer items-center">
          <img
            width={50}
            src={logo}
            loading="lazy"
            className="mr-3 h-6 sm:h-9"
            alt="Ashok Logo" 
          />
        </a>
      </div>
      <div className="flex items-center lg:order-2">
        <NavBarComponent />
      </div>
      <div className="flex items-center lg:order-3">
        <LoginComponent />
        <ProfileComponent />
      </div>
      </div>    
      </nav>
  );
}
