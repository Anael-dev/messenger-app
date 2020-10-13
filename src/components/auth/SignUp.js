import React, { useState, useContext } from "react";
import { auth, db } from "../../firebase/base";
import { AuthContext } from "../../firebase/auth";
import "./Login/Login.css";

const SignUp = ({ history }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nickname: "",
  });
  const [error, setError] = useState(null);

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

  const handleSignUp = async (e) => {
    e.preventDefault();

    //sign up the user
    try {
      const authResult = await auth.createUserWithEmailAndPassword(
        formData.email,
        formData.password
      );
      await authResult.user.updateProfile({
        displayName: formData.nickname,
        // photoURL: , // some photo url
      });
      //create a user document in users collection
      await db.collection("users").doc(authResult.user.uid).set({
        name: formData.nickname,
        uid: authResult.user.uid,
        active: true,
      });

      history.push("/");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  return (
    <div className='auth-container'>
      <div className='auth__inner-container'>
        <form onSubmit={(e) => handleSignUp(e)} className='form'>
          <h1 className='auth__heading'>Sign up</h1>
          {error && <p className='form__error'>{error}</p>}
          <input
            type='text'
            name='nickname'
            className='form__input-field'
            required
            placeholder='Nickname'
            // value={formData.password}
            onChange={(e) => handleChange(e)}
          />
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
          <button className='form__button mt-20'>Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
