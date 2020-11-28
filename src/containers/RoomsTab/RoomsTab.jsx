import React, { useEffect } from "react";
import "./RoomsTab.scss";
import Rooms from "../../components/Rooms/Rooms";
import SideBarNav from "../../components/SideBar/SideBarNav/SideBarNav";
import SideBarSearch from "../../components/SideBar/SideBarSearch/SideBarSearch";
import { Switch, Route, useLocation } from "react-router-dom";
import Users from "../../components/Users/Users";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebarView } from "../../actions/roomsActions";
import LogoNav from "../../components/LogoNav/LogoNav";

const RoomsTab = () => {
  const { windowWidth, displaySidebar } = useSelector(
    (state) => state.roomsReducer
  );
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      windowWidth > 545 ||
      location.pathname === "/dashboard/chats" ||
      location.pathname === "/dashboard/users"
    ) {
      if (!displaySidebar) dispatch(toggleSidebarView(true));
    } else {
      if (displaySidebar) dispatch(toggleSidebarView(false));
    }
  }, [windowWidth, location.pathname]);

  return (
    <div className={`sidebar ${!displaySidebar ? "hide-sidebar" : null}`}>
      <LogoNav />
      <div className='sidebar__column'>
        <SideBarNav />
        <SideBarSearch />
        <div className='sidebar__rooms-container'>
          <Switch>
            <Route path='/dashboard/chats' component={Rooms} />
            <Route path='/dashboard/users' component={Users} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default RoomsTab;
