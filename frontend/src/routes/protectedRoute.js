import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../securityUtils/setToken";
import Header from "../layouts/header";
import UserContext from "../context/userProvider";

export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Cookies.get("runit_token");

  if (isAuthenticated) {
    getAccessToken();
  }

  return isAuthenticated ? (
    <>
      <UserContext>
        <Header />
        {children}
      </UserContext>
    </>
  ) : (
    <Navigate to="/" />
  );
};
