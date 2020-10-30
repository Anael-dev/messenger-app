import React, { useEffect, useState } from "react";
import { auth, generateUserDocument } from "../firebase/base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //listen for auth status change
    auth.onAuthStateChanged(async (userAuth) => {
      const loggedUser = await generateUserDocument(userAuth);
      setCurrentUser(loggedUser);
      console.log(loggedUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
