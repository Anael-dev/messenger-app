import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import SignUp from "./Signup/SignUp";
import "./Login/Login.css";
// import wave from "../../images/illustrations/wave.svg";
import icon from "../../images/WhatsApp_Logos/logo15.svg";
import illustration from "../../images/illustrations/illustrationChat.svg";

const Auth = () => {
  return (
    <div className='auth-wrapper'>
      <div className='auth-container'>
        {/* <img className='wave' src={wave} alt='wave image' />
        <div className='app-image'>
          <h1 className='app-title'>MamaTzav</h1>
          <img className='app-logo' src={icon} alt='app logo' />
        </div>
        <div className='bg-image'>
          <img src={bgImage} alt='chat image' />
        </div> */}
        <div className='bg-section'>
          <div className='app-image'>
            <img className='app-logo' src={icon} alt='app logo' />
          </div>
          <div className='app-quote'>
            <h2>Connect together through chat.</h2>
            <p>Communicate easily with friends, and stay always updated.</p>
          </div>
          <div className='illustration-image'>
            <img src={illustration} alt='chat illustration' />
          </div>
        </div>
        <Switch>
          <Route path='/auth/login' component={Login} />
          <Route path='/auth/signup' component={SignUp} />
          <Redirect to='/auth/login' />
          {/* <Redirect to='/login' component={Login} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
