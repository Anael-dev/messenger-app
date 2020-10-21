import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db, provider } from "../../../firebase/base";
import { AuthContext } from "../../../context/auth";
import "./Login.css";
import Logo from "../../../images/WhatsApp_Logos/logo.png";

const Login = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isError, setIsError] = useState(false);
  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        active: true,
      })
      .then(() => history.push("/chats"));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    //sign in the user
    try {
      const authResult = await auth.signInWithPopup(provider);
      
      console.log(authResult);
      const existingUserQuery = await db
        .collection("users")
        .where("uid", "==", authResult.user.uid);
      if (existingUserQuery.length) {
        await db.collection("users").doc(authResult.user.uid).update({
          active: true,
        });
      } else {
        await db.collection("users").doc(authResult.user.uid).set({
          name: authResult.user.displayName,
          uid: authResult.user.uid,
          photo: authResult.user.photoURL,
          active: true,
        });
      }
      //update active user status

      // setFormData({
      //   email: "",
      //   password: "",
      // });
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    //sign in the user
    try {
      const authResult = await auth.signInWithEmailAndPassword(
        formData.email,
        formData.password
      );
      console.log(authResult);

      //update active user status
      await db.collection("users").doc(authResult.user.uid).update({
        active: true,
      });
      // setFormData({
      //   email: "",
      //   password: "",
      // });
      history.push("/");
    } catch (err) {
      console.log(err);
      setIsError(true);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth__inner-container'>
        <h1 className='auth__heading'>Sign in to WhatsApp</h1>
        <img className='app-logo' src={Logo} alt="whatsapp logo"/>
        <button
          className='google-auth__button'
          onClick={(e) => handleGoogleLogin(e)}>
          <i className='fab fa-google'></i>
          <span>
            Sign in with <b>Google</b>
          </span>
        </button>
        <div className='separate-section'>
          <div className='border-b'></div>
          <span>or</span>
          <div className='border-b'></div>
        </div>
        <form onSubmit={(e) => handleEmailLogin(e)} className='form'>
          {isError && (
            <p className='form__error'>
              There is no match, please try again or sign up
            </p>
          )}
          <input
            type='email'
            name='email'
            className='form__input-field'
            autoComplete='email'
            required
            placeholder='&#xf1fa; Email'
            // value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='password'
            className='form__input-field'
            autoComplete='current-password'
            required
            placeholder='&#xf023; Password'
            // value={formData.password}
            onChange={(e) => handleChange(e)}
          />
          <button className='button form__button'>Login</button>
        </form>

        <p className='signUp-section signUp-p'>
          Don't have an account yet?
          <Link to='/signup'>
            <span className='signUp-section signUp-span'>Sign Up </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
