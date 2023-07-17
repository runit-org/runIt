import React from "react";
import ResponseContext from "../Context/response-context";
import { useLocation } from "react-router-dom";

export const RoutesContainer = ({ children }) => {
  const path = useLocation().pathname;
  return (
    <React.Fragment>
      {["/", "/signup", "/reset-password/", "/reset-password-auth"].some((el) =>
        path.includes(el)
      ) ? (
        <ResponseContext>{children}</ResponseContext>
      ) : null}
    </React.Fragment>
  );
};
