import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { auth, db, provider, firebase, login } from "../../../firebase/base";
import { AuthContext } from "../../../contexts/AuthContextProvider";
import "./Login.css";

const Loginp = ({ history }) => {
  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  // });
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { currentUser } = useContext(AuthContext);

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
    <div class='form-container sign-up-container'>
      <form onSubmit={(e) => handleEmailLogin(e)} className='sign-in-form'>
        {error && <p className='form__error'>{error} </p>}
        <h2 className='auth__heading'>Sign in</h2>
        <button className='social' onClick={(e) => handleGoogleLogin(e)}>
          <i className='fab fa-google-plus-g'></i>
        </button>
        <span>or use your account</span>
        <div className='input-field'>
          <i className='far fa-envelope'></i>
          <input
            type='email'
            autoComplete='email'
            required
            ref={emailRef}
            placeholder='Email'
          />
        </div>
        <div class='input-field'>
          <i class='fas fa-lock'></i>
          <input
            type='password'
            autoComplete='current-password'
            required
            ref={passwordRef}
            placeholder='Password'
            // value={formData.password}
            // onChange={(e) => handleChange(e)}
          />
        </div>
        <button disabled={loading} className='button form__button btn'>
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

export default Loginp;
