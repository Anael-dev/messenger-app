import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db, provider, firebase, login } from "../../../firebase/base";
import { AuthContext } from "../../../context/AuthContextProvider";
import "../auth.scss";

const Login = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [inputFocus, setInputFocus] = useState([]);

  if (currentUser) {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        active: true,
      })
      .then(() => history.push("/dashboard/chats"));
  }

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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    //sign in the user
    try {
      setError("");
      setLoading(true);
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await login(emailRef.current.value, passwordRef.current.value);

      // history.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
      setLoading(false);
    }
  };

  return (
    <div className='auth-content'>
      <form onSubmit={(e) => handleEmailLogin(e)} className='form'>
        <h3 className='form__heading'>Sign in</h3>
        <button
          className='google-auth-btn'
          onClick={(e) => handleGoogleLogin(e)}>
          continue with <i className='fab fa-google'></i>
        </button>
        <div className='separate-section'>
          <span>or login with email:</span>
        </div>

        <div>
          <div
            className={`input-container ${
              inputFocus.includes("email") ? "focus" : ""
            }`}>
            <div className='icon'>
              <i className='far fa-envelope'></i>
            </div>
            <div className='input-div'>
              <h5>Email</h5>
              <input
                type='email'
                className='input'
                required
                autoComplete='email'
                ref={emailRef}
                onFocus={(e) => addInputFocus(e.target.type)}
                onBlur={(e) => removeInputFocus(e.target.type, e.target.value)}
              />
            </div>
          </div>

          <div
            className={`input-container ${
              inputFocus.includes("password") ? "focus" : ""
            }`}>
            <div className='icon'>
              <i className='fas fa-lock'></i>
            </div>
            <div className='input-div'>
              <h5>Password</h5>
              <input
                type='password'
                className='input'
                autoComplete='current-password'
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
          Login
        </button>
        <p className='navigate-section'>
          Need an account?
          <Link to='/auth/signup'>
            <span className='navigate-section navigate-span'>Sign Up </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
