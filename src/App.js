import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login/Login";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./context/auth";
import LoggedRoute from "./components/LoggedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <LoggedRoute exact path='/' component={Dashboard} />
          <LoggedRoute path='/room' component={Dashboard} />
          <LoggedRoute path='/chats' component={Dashboard} />
          <LoggedRoute path='/users' component={Dashboard} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
