import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const SecurityContext = createContext();

function SecurityProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  return (
    <SecurityContext.Provider value={currentUser}>
      {children}
    </SecurityContext.Provider>
  );
}

export default SecurityProvider;
