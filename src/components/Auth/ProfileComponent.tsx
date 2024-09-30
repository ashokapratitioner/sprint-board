import { useAuth0 } from "@auth0/auth0-react";

const ProfileComponent = () => {
  const { user, isAuthenticated, isLoading } = useAuth0<any>();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return isAuthenticated ? (
    <div>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  ) : (
    <></>
  );
};

export default ProfileComponent;
