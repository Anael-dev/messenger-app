// import React from "react";
// import { BrowserRouter, Switch, Route } from "react-router-dom";
// import "./App.css";
// import Dashboard from "./components/dashboard/Dashboard";
// import Login from "./components/auth/Login/Login";
// import SignUp from "./components/auth/SignUp";
// import { AuthProvider } from "./context/auth";
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

import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import { AuthContext } from "./context/AuthContextProvider";
import Auth from "./components/auth/Auth";

function App() {
  const { currentUser } = useContext(AuthContext);

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
