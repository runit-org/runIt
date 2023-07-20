import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GET_ERRORS } from "../services/constants/types";

export const ResponseContext = createContext();

function ResponseProvider({ children }) {
  const [response, setResponse] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();

  const reducer = useSelector((errorReducer) => errorReducer.errors.errors);

  useEffect(() => {
    if (reducer.data) {
      setResponse({
        status: reducer.status,
        message: reducer.data.detail
          ? reducer.data.detail
          : reducer.data.message,
      });
    }
  }, [reducer, location]);

  //reset response to initial state if route chagnes
  useEffect(() => {
    dispatch({ type: GET_ERRORS, payload: {} });
    setResponse({});
  }, [location, dispatch]);

  return (
    <ResponseContext.Provider value={{ response: response }}>
      {children}
    </ResponseContext.Provider>
  );
}

export default ResponseProvider;
