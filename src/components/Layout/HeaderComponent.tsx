import logo from "../../assets/logo.webp";
import LoginComponent from "../Auth/LoginComponent";
import LogoutComponent from "../Auth/LogoutComponent";
import ProfileComponent from "../Auth/ProfileComponent";

export default function HeaderComponent() {
  return (
    <nav className="flex flex-wrap justify-between bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div className="flex items-center lg:order-1">
        <a href="/" className="flex items-center">
          <img
            width={50}
            src={logo}
            className="mr-3 h-6 sm:h-9"
            alt="Ashok Logo"
          />
        </a>
      </div>
      <div className="flex items-center lg:order-2">
        <LoginComponent />
        <ProfileComponent />
        <LogoutComponent />
      </div>
    </nav>
  );
}
