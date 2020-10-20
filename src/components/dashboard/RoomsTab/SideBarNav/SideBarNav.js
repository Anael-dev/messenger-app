import React, { useState, useEffect, useContext } from "react";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Avatar, IconButton } from "@material-ui/core";
import { AuthContext } from "../../../../context/auth";
import "./../RoomsTab.css";

const SideBarNav = ({ signOut }) => {
  const [openMore, setOpenMore] = useState(false);
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <div
        className={`backdrop ${openMore ? "open" : null}`}
        onClick={() => setOpenMore(!openMore)}></div>
      <div className='sidebar-header'>
        <Avatar
          src={
            currentUser?.photoURL ||
            `https://avatars.dicebear.com/api/human/${currentUser.uid}.svg`
          }
        />
        <div className='sidebar-header__right'>
          <IconButton title='new chat'>
            <ChatIcon />
          </IconButton>
          <div className='model'>
            <IconButton title='menu' onClick={() => setOpenMore(!openMore)}>
              <MoreVertIcon />
            </IconButton>
            <nav className={`dropdown-model ${openMore ? "open" : null}`}>
              <ul className='dropdown-model__items'>
                <li className='dropdown-model__item'>
                  <button className='dropdown__btn' onClick={() => null}>
                    <span>New group</span>
                    <GroupAddIcon />
                  </button>
                </li>
                <li className='dropdown-model__item'>
                  <button className='dropdown__btn' onClick={() => null}>
                    <span>Profile</span>
                    <PersonIcon />
                  </button>
                </li>
                <li className='dropdown-model__item'>
                  <button className='dropdown__btn' onClick={signOut}>
                    <span>Log out</span>
                    <ExitToAppIcon />
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
