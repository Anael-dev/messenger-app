import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db, provider, firebase, login } from "../../../firebase/base";
import { AuthContext } from "../../../contexts/AuthContextProvider";
import "./Login.css";

const Login = ({ history }) => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  if (currentUser) {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        active: true,
      })
      .then(() => history.push("/dashboard/chats"));
  }

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    //sign in the user
    try {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await auth.signInWithPopup(provider);
      // setFormData({
      //   email: "",
      //   password: "",
      // });
      // history.push("/");
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
      // console.log(authResult);

      //update active user status
      // await db.collection("users").doc(authResult.user.uid).update({
      //   active: true,
      // });

      // setFormData({
      //   email: "",
      //   password: "",
      // });

      // history.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to log in");
      setLoading(false);
    }
  };

  return (
    <div className='login-content'>
      <form onSubmit={(e) => handleEmailLogin(e)} className='form'>
        <h3 className='auth__heading'>Sign in</h3>
        {/* <span className='google_span'>Continue with</span> */}
        <button
          className='google-auth__button'
          onClick={(e) => handleGoogleLogin(e)}>
          <i className='fab fa-google'></i>
        </button>
        {/* <div className='separate-section'>
          <div className='border-b'></div>
          <span>or login with email</span>
          <div className='border-b'></div>
        </div> */}
        {error && <p className='form__error'>{error} </p>}
        <div className={`input-container ${emailFocus ? "focus" : ""}`}>
          <div className='icon'>
            <i className='far fa-envelope'></i>
          </div>
          <div className='input-div'>
            <h5>Email</h5>
            {/* <input type='text' className='input' /> */}
            <input
              type='email'
              className='input'
              required
              ref={emailRef}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              // placeholder='&#xf1fa; Email'
              // value={formData.email}
              // onChange={(e) => handleChange(e)}
            />
          </div>
        </div>

        <div className={`input-container ${passwordFocus ? "focus" : ""}`}>
          <div className='icon'>
            <i className='fas fa-lock'></i>
          </div>
          <div className='input-div'>
            <h5>Password</h5>
            <input
              type='password'
              className='input'
              // autoComplete='current-password'
              required
              ref={passwordRef}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              // value={formData.password}
              // onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        {/* <input
          type='email'
          name='email'
          className='form__input-field'
          autoComplete='email'
          required
          ref={emailRef}
          placeholder='&#xf1fa; Email'
          // value={formData.email}
          // onChange={(e) => handleChange(e)}
        /> */}
        {/* <input
          type='password'
          className='form__input-field'
          // autoComplete='current-password'
          required
          ref={passwordRef}
          placeholder='&#xf023; Password'
          // value={formData.password}
          // onChange={(e) => handleChange(e)}
        /> */}
        <button disabled={loading} className='button form__button'>
          Login
        </button>
        <p className='signUp-section signUp-p'>
          Need an account?
          <Link to='/auth/signup'>
            <span className='signUp-section signUp-span'>Sign Up </span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
