import React, { useState} from "react";
import { auth, generateUserDocument } from "../../../firebase/base";
import { Link } from "react-router-dom";
import "../Login/Login.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });
  const [error, setError] = useState(null);

  // const { currentUser } = useContext(AuthContext);

  // if (currentUser) {
  //   db.collection("users")
  //     .doc(currentUser.uid)
  //     .update({
  //       active: true,
  //     })
  //     .then(() => history.push("/dashboard/chats"));
  // }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    const { email, password, displayName } = formData;
    e.preventDefault();
    //sign up the user
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { name: displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }
    setFormData({
      email: "",
      password: "",
      displayName: "",
    });
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
        <form onSubmit={(e) => handleSignUp(e)} className='form'>
          {error && <p className='form__error'>{error}</p>}
          <input
            type='text'
            name='nickname'
            className='form__input-field'
            required
            placeholder='&#xf406; Nickname'
            // value={formData.password}
            onChange={(e) => handleChange(e)}
          />
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
          <button className='form__button mt-20'>Sign up</button>
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
