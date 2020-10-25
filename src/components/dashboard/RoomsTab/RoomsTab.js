import React, { useState, useEffect, useContext } from "react";
import "./RoomsTab.css";
import Rooms from "./Rooms/Rooms";
import { db } from "../../../firebase/base";
import { AuthContext } from "../../../context/auth";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../../actions/roomsActions";
import { getUsers } from "../../../actions/usersActions";
import SideBarNav from "./SideBarNav/SideBarNav";
import SideBarSearch from "./SideBarSearch/SideBarSearch";
import { NavLink, Switch, Route } from "react-router-dom";
import Users from "./Users/Users";

const RoomsTab = ({ signOut }) => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  // const rooms = useSelector((state) => state.roomsReducer.rooms);

  useEffect(() => {
    if (currentUser) {
      const unsubscribeRooms = db
        .collection("rooms")
        .where("members", "array-contains", {
          name: currentUser.displayName,
          uid: currentUser.uid,
        })
        .where("lastMessage", "!=", null)
        .orderBy("lastMessage", "desc")
        .onSnapshot(async (snap) => {
          const userRooms = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(getRooms(userRooms));
        });

      const unsubscribeUsers = db
        .collection("users")
        .where("uid", "!=", currentUser.uid)
        .onSnapshot(async (snap) => {
          const users = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          dispatch(getUsers(users));
        });
      return () => {
        console.log("unsubscribed");
        unsubscribeRooms();
        unsubscribeUsers();
      };
    }
  }, [currentUser]);

  return (
    <div className='sidebar'>
      <SideBarNav signOut={signOut} />
      <SideBarSearch />
      <nav className='chats-nav'>
        <NavLink
          className='nav-link'
          to='/chats'
          activeClassName='active-route'>
          <h3 className='link-title'>Chats</h3>
        </NavLink>
        <NavLink
          className='nav-link'
          to='/users'
          activeClassName='active-route'>
          <h3 className='link-title'>People</h3>
        </NavLink>
      </nav>
      <div className='rooms-container'>
        <Switch>
          <Route path='/chats' component={Rooms} />
          <Route path='/users' component={Users} />
          {/* <Route path='/room' component={People} /> */}
          {/* <Route path='/room' component={Rooms} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default RoomsTab;
