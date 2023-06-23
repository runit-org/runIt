import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [id, setUserid] = useState();

  useEffect(() => {
    setUser(localStorage.username);
  }, []);

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setUserid(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  return (
    <UserContext.Provider value={{ user: user, id: id }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
