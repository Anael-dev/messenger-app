import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../../firebase/base";
import { AuthContext } from "../../../firebase/auth";
import "./Login.css";

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
      .then(() => history.push("/"));
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
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
        <form onSubmit={(e) => handleLogin(e)} className='form'>
          <h1 className='auth__heading'>Login</h1>
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
            placeholder='Email'
            // value={formData.email}
            onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='password'
            className='form__input-field'
            autoComplete='current-password'
            required
            placeholder='Password'
            // value={formData.password}
            onChange={(e) => handleChange(e)}
          />
          <button className='button form__button mt-20'>Sign in</button>
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
