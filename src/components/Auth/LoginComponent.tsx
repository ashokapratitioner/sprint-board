import { useAuth0 } from "@auth0/auth0-react";

const LoginComponent = () => {
  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  if(isAuthenticated || isLoading) return null;

  return <button onClick={() => loginWithRedirect()} className="text-white">Log In</button>;
};

export default LoginComponent;
