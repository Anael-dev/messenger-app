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
  const [inputFocus, setInputFocus] = useState([]);

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
      // setFormData({
      //   email: "",
      //   password: "",
      // });
      // history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    // const { email, password, displayName } = formData;

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
    <div className='login-content'>
      <form onSubmit={(e) => handleSignUp(e)} className='form'>
        <h3 className='auth__heading'>Sign up</h3>
        <button
          className='google-auth__button'
          onClick={(e) => handleGoogleLogin(e)}>
          <i className='fab fa-google'></i>
        </button>
        <div className='separate-section'>
          <span>or sign up with email:</span>
        </div>
        {error && <p className='form__error'>{error} </p>}
        <div className='inputs'>
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
                // autoComplete='current-password'
                required
                ref={passwordRef}
                onFocus={(e) => addInputFocus(e.target.type)}
                onBlur={(e) => removeInputFocus(e.target.type, e.target.value)}
                // value={formData.password}
                // onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </div>

        <button disabled={loading} className='button form__button'>
          Sign up
        </button>
        <p className='signUp-section signUp-p'>
          Already have an account?
          <Link to='/auth/login'>
            <span className='signUp-section signUp-span'>Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
