import React, { useState, useEffect, useContext } from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Avatar, IconButton } from "@material-ui/core";
import "./../RoomsTab.css";

const SideBarNav = ({ signOut }) => {
  const [openMore, setOpenMore] = useState(false);

  return (
    <>
      <div
        className={`backdrop ${openMore ? "open" : null}`}
        onClick={() => setOpenMore(!openMore)}></div>
      <div className='sidebar-header'>
        <Avatar src='https://www.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_native_boy_kid-512.png' />
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
                  <button onClick={() => null}>
                    <span>New group</span>
                    <GroupAddIcon />
                  </button>
                </li>
                <li className='dropdown-model__item'>
                  <button onClick={() => null}>
                    <span>Profile</span>
                    <PersonIcon />
                  </button>
                </li>
                <li className='dropdown-model__item'>
                  <button onClick={signOut}>
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
