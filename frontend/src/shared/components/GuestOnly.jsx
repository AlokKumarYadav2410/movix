import { Navigate } from "react-router-dom";
import useAuth from "../../features/auth/hooks/useAuth";

const GuestOnly = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestOnly;
