import { useSelector } from "react-redux";

const useAuth = () => {
  const { user, isLoading, error } = useSelector((state) => state.auth);
  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    error
  };
};

export default useAuth;
