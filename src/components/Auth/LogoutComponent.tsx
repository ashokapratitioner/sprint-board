import { useAuth0 } from "@auth0/auth0-react";

const LogoutComponent = () => {
  const { logout, isAuthenticated } = useAuth0();

  if(!isAuthenticated) return null;

  return (
    <button
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
      className="text-sm text-gray-900 dark:text-white text-left px-4 py-3 ">
      Log Out
    </button>
  );
};

export default LogoutComponent;
