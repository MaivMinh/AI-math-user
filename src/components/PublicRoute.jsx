import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const PublicPage = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) return;

  return !auth.isAuthenticated
    ? children
    : navigate(location.state?.from?.pathname || "/", {
        replace: true,
      });
};

export default PublicPage;
