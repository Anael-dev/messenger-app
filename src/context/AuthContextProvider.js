import React, { useEffect, useState } from "react";
import {
  auth,
  generateUserDocument,
  trackConnectionStatus,
} from "../firebase/base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    //listen for auth status change
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        trackConnectionStatus(userAuth.uid);
      }
      const loggedUser = await generateUserDocument(userAuth);
      setCurrentUser(loggedUser);
      console.log(loggedUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
