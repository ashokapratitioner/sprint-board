import { useAuth0 } from "@auth0/auth0-react";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }: any) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isAuthenticated && !isLoading) return <Navigate to="/" />;

  return (
    <Suspense fallback="Loading...">
      <Component {...rest} />
    </Suspense>
  );
};

export default ProtectedRoute;
