import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("token");

  return isAuthenticated ? children : <Navigate to="/" />;
};
