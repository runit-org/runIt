import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../securityUtils/setToken";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("token");

  if (isAuthenticated) {
    getAccessToken();
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};
