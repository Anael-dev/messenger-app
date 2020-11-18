import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../components/auth/Login/Login";
import SignUp from "../../components/auth/Signup/SignUp";
import "./Auth.scss";
import icon from "../../images/WhatsApp_Logos/logo15.svg";
import illustration from "../../images/illustrations/illustrationChat.svg";

const Auth = () => {
  return (
    <div className='auth'>
      <div className='auth__container'>
        <div className='bg'>
          <div className='bg__app-logo'>
            <img src={icon} alt='app logo' />
          </div>
          <div className='bg__quote'>
            <h2>Connect together through chat.</h2>
            <p>Communicate easily with friends, and stay always updated.</p>
          </div>
          <div className='bg__illustration'>
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
