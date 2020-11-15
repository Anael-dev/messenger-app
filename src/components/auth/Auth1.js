import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login/Login1";
import SignUp from "./Signup/SignUp";
import "./Login/Login.css";
import wave from "../../images/illustrations/wave.svg";
import icon from "../../images/WhatsApp_Logos/icon.svg";
import bgImage from "../../images/illustrations/undraw_online_message_xq4c.svg";

const Auth = () => {
  return (
    <div class='container'>
      <div class='forms-container'>
        <div class='signin-signup'>
          {/* <div className='app-image'>
            <h1 className='app-title'>MamaTzav</h1>
            <img className='app-logo' src={icon} alt='app logo' />
          </div>
          <div className='bg-image'>
            <img src={bgImage} alt='chat image' />
          </div> */}
          <Switch>
            <Route path='/auth/login' component={Login} />
            <Route path='/auth/signup' component={SignUp} />
            <Redirect to='/auth/login' />
            {/* <Redirect to='/login' component={Login} /> */}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Auth;
