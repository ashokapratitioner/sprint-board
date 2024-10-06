import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef, useState } from "react";
import LogoutComponent from "./LogoutComponent";

const ProfileComponent = () => {
  const { user, isAuthenticated, isLoading } = useAuth0<any>();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(prevOpen => !prevOpen);
  }

  const handleClickOutside = (event: any) => {
    if(dropdownRef.current && !(dropdownRef.current as HTMLDivElement).contains(event.target)){
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  })

  if (isLoading) {
    return <div className="text-white">Loading ...</div>;
  }

  return isAuthenticated ? (
    <div className="relative mr-4">
      <img
        className="w-10 h-10 rounded-full"
        src={user.picture}
        loading="lazy"
        alt={user.name}
        onClick={toggleDropdown}
      />
      <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
      {isOpen && (
        <div
          id="userDropdown"
          ref={dropdownRef}
          className="z-10 -right-6 bg-white absolute divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <p>{user.name}</p>
            <p className="font-medium truncate">{user.email}</p>
          </div>
          <hr />
          <LogoutComponent />

        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default ProfileComponent;
