import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard/Dashboard";
import Login from "./components/auth/Login/Login";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./firebase/auth";
import LoggedRoute from "./components/LoggedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <NavBar /> */}
        <Switch>
          <LoggedRoute exact path='/' component={Dashboard} />
          <LoggedRoute path='/chat' component={Dashboard} />
          {/* <Route path='/project/:id' component={ProjectDetails} /> */}
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
