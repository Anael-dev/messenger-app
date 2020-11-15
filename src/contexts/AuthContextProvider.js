import React, { useEffect, useState } from "react";
import {
  auth,
  generateUserDocument,
  trackConnectionStatus,
} from "../firebase/base";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //listen for auth status change
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      const loggedUser = await generateUserDocument(userAuth);
      setCurrentUser(loggedUser);
      setLoading(false);
      // if (loggedUser) {
      // await trackConnectionStatus(userAuth.uid);
      // }
      console.log(loggedUser);
    });

    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   if (currentUser) trackConnectionStatus(currentUser.uid);
  // }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
