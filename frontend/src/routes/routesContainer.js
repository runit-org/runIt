import React from "react";
import ResponseContext from "../context/responseProvider";
import { useLocation } from "react-router-dom";
import { RESET_PW, RESET_PW_EMAIL, SIGN_UP } from "./routes";

export const RoutesContainer = ({ children }) => {
  const path = useLocation().pathname;
  return (
    <React.Fragment>
      {["/", `/${SIGN_UP}`, `/${RESET_PW}/`, `/${RESET_PW_EMAIL}`].some((el) =>
        path.includes(el)
      ) ? (
        <ResponseContext>{children}</ResponseContext>
      ) : null}
    </React.Fragment>
  );
};
