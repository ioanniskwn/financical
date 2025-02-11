import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>; // Show loading state

  return (
    <>
      user ? <Outlet /> : <Navigate to="/" replace />
      <p> {user?.email}</p>
    </>
  );
};

export default ProtectedRoute;
