import React from "react";
import "./RoomsTab.css";
import Rooms from "./Rooms/Rooms";
import SideBarNav from "./SideBar/SideBarNav/SideBarNav";
import SideBarSearch from "./SideBar/SideBarSearch/SideBarSearch";
import { NavLink, Switch, Route } from "react-router-dom";
import Users from "./Users/Users";

const RoomsTab = () => {
  
  return (
    <div className='sidebar'>
      <SideBarNav />
      <SideBarSearch />
      <nav className='chats-nav'>
        <NavLink
          className='nav-link'
          to='/dashboard/chats'
          activeClassName='active-route'>
          <h3 className='link-title'>Chats</h3>
        </NavLink>
        <NavLink
          className='nav-link'
          to='/dashboard/users'
          activeClassName='active-route'>
          <h3 className='link-title'>People</h3>
        </NavLink>
      </nav>
      <div className='rooms-container'>
        <Switch>
          <Route path='/dashboard/chats' component={Rooms} />
          <Route path='/dashboard/users' component={Users} />
        </Switch>
      </div>
    </div>
  );
};

export default RoomsTab;
