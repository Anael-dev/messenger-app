import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import icon from "../../images/logos/logo-small.svg";
import "./LogoNav.scss";
import { db, firebase, logout } from "../../firebase/base";
import { AuthContext } from "../../context/AuthContextProvider";

const LogoNav = () => {
  const { currentUser } = useContext(AuthContext);

  const signOut = async () => {
    await db.collection("users").doc(currentUser.uid).update({
      active: false,
      lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
    });
    logout();
  };

  return (
    <div className='nav'>
      <img src={icon} alt='app-logo'></img>
      <nav className='sidebar__chats-nav'>
        <NavLink
          className='nav-link'
          title='chats'
          to='/dashboard/chats'
          activeClassName='active-route'>
          <i className='fas fa-comments'></i>
        </NavLink>
        <NavLink
          className='nav-link'
          title='users'
          to='/dashboard/users'
          activeClassName='active-route'>
          <i className='fas fa-users'></i>
        </NavLink>
      </nav>
      <button title='log out' className=' btn logout-button' onClick={signOut}>
        <i className='fas fa-sign-out-alt'></i>
      </button>
    </div>
  );
};

export default LogoNav;
