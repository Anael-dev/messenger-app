import React, { useState, useRef } from "react";
import {
  auth,
  generateUserDocument,
  signup,
  provider,
  firebase,
} from "../../../firebase/base";
import { Link } from "react-router-dom";
import "../Login/Login.css";

const SignUp = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nicknameRef = useRef();
  const confirmPassword = useRef();

  // const [formData, setFormData] = useState({
  //   email: "",
  //   password: "",
  //   displayName: "",
  // });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   db.collection("users")
  //     .doc(currentUser.uid)
  //     .update({
  //       active: true,
  //     })
  //     .then(() => history.push("/dashboard/chats"));
  // }

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleGoogleLogin = async (e) => {
  //   e.preventDefault();
  //   //sign in the user
  //   try {
  //     await firebase
  //       .auth()
  //       .setPersistence(firebase.auth.Auth.Persistence.SESSION);

  //     await auth.signInWithPopup(provider);
  //     setFormData({
  //       email: "",
  //       password: "",
  //     });

  //     history.push("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // const { email, password, displayName } = formData;

    if (passwordRef.current.value !== confirmPassword.current.value) {
      return setError("Passwords do not match");
    }
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
      // setFormData({
      //   email: "",
      //   password: "",
      //   displayName: "",
      // });
      history.push("/");
    } catch (error) {
      setError("Failed to create an account");
      setLoading(false);
    }
    // history.push("/");
    // try {
    //   const authResult = await auth.createUserWithEmailAndPassword(
    //     formData.email,
    //     formData.password
    //   );
    // await authResult.user.updateProfile({
    //   displayName: formData.displayName,
    //   // photoURL: , // some photo url
    // });
    //create a user document in users collection
    // await db
    //   .collection("users")
    //   .doc(authResult.user.uid)
    //   .set({
    //     name: formData.displayName,
    //     uid: authResult.user.uid,
    //     active: true,
    //     photo: `https://avatars.dicebear.com/api/human/${authResult.user.uid}.svg`,
    //   });

    // } catch (err) {
    //   console.log(err.message);
    //   setError(err.message);
    // }
  };

  return (
    <div className='auth-container'>
      <div className='auth__inner-container'>
        <h1 className='auth__heading'>Sign up</h1>
        {/* <button
          className='google-auth__button'
          onClick={(e) => handleGoogleLogin(e)}>
          <i className='fab fa-google'></i>
          <span>
            Sign up with <b>Google</b>
          </span>
        </button> */}
        <form onSubmit={(e) => handleSignUp(e)} className='form'>
          {error && <p className='form__error'>{error}</p>}
          <input
            type='text'
            name='displayName'
            className='form__input-field'
            required
            ref={nicknameRef}
            placeholder='&#xf406; Nickname'
            // value={formData.password}
            // onChange={(e) => handleChange(e)}
          />
          <input
            type='email'
            name='email'
            className='form__input-field'
            autoComplete='email'
            required
            ref={emailRef}
            placeholder='&#xf1fa; name@domain.com'
            // value={formData.email}
            // onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='password'
            className='form__input-field'
            autoComplete='current-password'
            required
            ref={passwordRef}
            placeholder='&#xf023; at least 6 characters'
            // value={formData.password}
            // onChange={(e) => handleChange(e)}
          />
          <input
            type='password'
            name='confirmPassword'
            className='form__input-field'
            required
            ref={confirmPassword}
            placeholder='&#xf023; confirm password'
            // value={formData.password}
          />
          <button disabled={loading} className='form__button mt-20'>
            Sign up
          </button>
        </form>
        <p className='signUp-section signUp-p'>
          Already have an account?
          <Link to='/auth/login'>
            <span className='signUp-section signUp-span'>Login </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
