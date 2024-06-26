import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { GET_ERRORS } from "../services/constants/types";

export const ResponseContext = createContext({
  response: {},
  setResponse: () => {},
});

function ResponseProvider({ children }) {
  const [response, setResponse] = useState({});

  const dispatch = useDispatch();
  const location = useLocation();

  const reducer = useSelector((errorReducer) => errorReducer.errors.errors);

  useEffect(() => {
    if (reducer && reducer.data) {
      const { data } = reducer;
      setResponse({
        info: data.info || {},
        status: reducer.status,
        message: data.detail || data.message,
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
