import React, { useEffect, useState } from "react";
import { auth } from "./base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //listen for auth status change
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      console.log(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
