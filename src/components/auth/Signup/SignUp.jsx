import React, { useState, useRef } from "react";
import {
  auth,
  generateUserDocument,
  signup,
  provider,
  firebase,
} from "../../../firebase/base";
import { Link } from "react-router-dom";
import "../auth.scss";

const SignUp = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nicknameRef = useRef();
  const [inputFocus, setInputFocus] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addInputFocus = (type) => {
    if (!inputFocus.includes(type)) {
      setInputFocus((focusArr) => [...focusArr, type]);
    }
  };

  const removeInputFocus = (type, value) => {
    if (value === "") {
      const filteredArr = inputFocus.filter((x) => x !== type);
      setInputFocus(filteredArr);
    }
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    //sign in the user
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await auth.signInWithPopup(provider);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    //sign up the user
    try {
      setError("");
      setLoading(true);
      const { user } = await signup(
        emailRef.current.value,
        passwordRef.current.value
      );
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await generateUserDocument(user, nicknameRef.current?.value);
      history.push("/");
    } catch (error) {
      setError("Failed to create an account");
      setLoading(false);
    }
  };

  return (
    <div className='auth-content'>
      <form onSubmit={(e) => handleSignUp(e)} className='form'>
        <h3 className='form__heading'>Sign up</h3>
        <button
          className='google-auth-btn'
          onClick={(e) => handleGoogleLogin(e)}>
          continue with <i className='fab fa-google'></i>
        </button>
        <div className='separate-section'>
          <span>or sign up with email:</span>
        </div>
        <div>
          <div
            className={`input-container signup-input ${
              inputFocus.includes("text") ? "focus" : ""
            }`}>
            <div className='icon'>
              <i className='far fa-user-circle'></i>
            </div>
            <div className='input-div'>
              <h5>Nickname</h5>
              <span className='placeholder'>John</span>
              <input
                type='text'
                className='input'
                required
                autoComplete='name'
                ref={nicknameRef}
                onFocus={(e) => addInputFocus(e.target.type)}
                onBlur={(e) => removeInputFocus(e.target.type, e.target.value)}
              />
            </div>
          </div>
          <div
            className={`input-container signup-input ${
              inputFocus.includes("email") ? "focus" : ""
            }`}>
            <div className='icon'>
              <i className='far fa-envelope'></i>
            </div>
            <div className='input-div'>
              <h5>Email</h5>
              <span className='placeholder'>john@mail.com</span>
              {/* <input type='text' className='input' /> */}
              <input
                type='email'
                className='input signup-input'
                required
                autoComplete='email'
                ref={emailRef}
                onFocus={(e) => addInputFocus(e.target.type)}
                onBlur={(e) => removeInputFocus(e.target.type, e.target.value)}
              />
            </div>
          </div>

          <div
            className={`input-container signup-input ${
              inputFocus.includes("password") ? "focus" : ""
            }`}>
            <div className='icon'>
              <i className='fas fa-lock'></i>
            </div>
            <div className='input-div'>
              <h5>Password</h5>
              <span className='placeholder'>6 characters at least</span>
              <input
                type='password'
                className='input signup-input'
                name='password'
                autoComplete='none'
                required
                ref={passwordRef}
                onFocus={(e) => addInputFocus(e.target.type)}
                onBlur={(e) => removeInputFocus(e.target.type, e.target.value)}
              />
            </div>
          </div>
        </div>
        {error && <p className='form__error'>{error} </p>}
        <button disabled={loading} className='button form__btn'>
          Sign up
        </button>
        <p className='navigate-section'>
          Already have an account?
          <Link to='/auth/login'>
            <span className='navigate-section navigate-span'>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
