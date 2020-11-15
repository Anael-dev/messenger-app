// import React from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import "./App.css";
// import Dashboard from "./components/dashboard/Dashboard";
// import Login from "./components/auth/Login/Login";
// import SignUp from "./components/auth/SignUp";
// import { AuthProvider } from "./contexts/auth";
// import LoggedRoute from "./components/LoggedRoute";

// function App() {
//   return (
//     <AuthProvider>
//       {/* <BrowserRouter> */}
//         <Switch>
//           <LoggedRoute exact path='/' component={Dashboard} />
//           <LoggedRoute path='/room' component={Dashboard} />
//           <LoggedRoute path='/dashboard/chats' component={Dashboard} />
//           <LoggedRoute path='/dashboard/users' component={Dashboard} />
//           <Route path='/login' component={Login} />
//           <Route path='/signup' component={SignUp} />
//         </Switch>
//       {/* </BrowserRouter> */}
//     </AuthProvider>
//   );
// }

// export default App;

import React, { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthContext } from "./contexts/AuthContextProvider";
import { firebase } from "./firebase/base";
import Auth from "./components/auth/Auth";

function App() {
  const { currentUser } = useContext(AuthContext);

  // window.addEventListener("unload", function (event) {
  //   //call function to save you state in API or save in localStore
  //   db.collection("users").doc(currentUser.uid).update({
  //     active: false,
  //     lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
  //   });
  // });

  return currentUser ? (
    <Switch>
      <Route path='/dashboard' component={Dashboard} />
      <Redirect to='/dashboard/chats' component={Dashboard} />
    </Switch>
  ) : (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Redirect to='/auth/login' component={Auth} />
    </Switch>
  );
}

export default App;
