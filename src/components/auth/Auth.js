import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Signup/SignUp";

const Auth = () => {
  return (
    <Switch>
      {/* <Route exact path='/' component={Login} /> */}
      <Route path='/auth/login' component={Login} />
      <Route path='/auth/signup' component={SignUp} />
      {/* <Redirect to='/login' component={Login} /> */}
    </Switch>
  );
};

export default Auth;
