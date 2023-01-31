import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ResponseContext = createContext();

function ResponseProvider({ children }) {
  const [response, setResponse] = useState("");
  const [status, setStatus] = useState(null);
  const reducer = useSelector((errorReducer) => errorReducer.errors.errors);

  useEffect(() => {
    if (reducer.data) {
      setStatus(reducer.status);
      if (reducer.data.detail) {
        setResponse(reducer.data.detail);
      } else if (reducer.data.message) {
        setResponse(reducer.data.message);
      }
    }
  }, [reducer]);

  return (
    <ResponseContext.Provider value={{ response: response, status: status }}>
      {children}
    </ResponseContext.Provider>
  );
}

export default ResponseProvider;
