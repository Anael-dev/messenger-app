import React from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Avatar, IconButton } from "@material-ui/core";
import "./RoomsTab.css";
import Rooms from "./Rooms/Rooms";

const RoomsTab = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <Avatar src='https://www.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_native_boy_kid-512.png' />
        <div className='sidebar-header__right'>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='sidebar-search'>
        <div className='sidebar-search__body'>
          <SearchIcon />
          <input type='text' placeholder='Search or start new chat' />
        </div>
      </div>
        <Rooms />
    </div>
  );
};

export default RoomsTab;
