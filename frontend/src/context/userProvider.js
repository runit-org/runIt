import React, { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const UserContext = createContext();

function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  var getCurrentUser = useSelector(
    (userReducer) => userReducer.users.currProfile
  );

  useEffect(() => {
    if (getCurrentUser.data != null) {
      setCurrentUser(getCurrentUser.data);
    }
  }, [getCurrentUser]);

  return (
    <UserContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
