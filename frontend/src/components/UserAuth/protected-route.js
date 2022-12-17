import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // const isAuthenticated = localStorage.getItem("token");
  const isAuthenticated = Cookies.get("token");

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
