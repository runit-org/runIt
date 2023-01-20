import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState("");
  useEffect(() => {
    setUser(localStorage.username);
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default UserProvider;
