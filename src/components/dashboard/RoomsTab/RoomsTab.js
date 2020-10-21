import React, { useState, useEffect, useContext } from "react";
import "./RoomsTab.css";
import Room from "./Rooms/Room/Room";
import Rooms from "./Rooms/Rooms";
import { db } from "../../../firebase/base";
import { AuthContext } from "../../../context/auth";
import SideBarNav from "./SideBarNav/SideBarNav";
import SideBarSearch from "./SideBarSearch/SideBarSearch";
import { NavLink, Switch, Route } from "react-router-dom";

const RoomsTab = ({ signOut }) => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = db
        .collection("rooms")
        .where("members", "array-contains", {
          name: currentUser.displayName,
          uid: currentUser.uid,
        })
        .orderBy("lastMessage", "desc")
        .onSnapshot(async (snap) => {
          const userRooms = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // const userRooms = await getMappedRooms(snap.docs);
          // console.log(userRooms);
          setRooms(userRooms);
          setFilteredRooms(userRooms);
        });
      return () => {
        console.log("unsubscribed");
        unsubscribe();
      };
    }
  }, [currentUser]);

  return (
    <div className='sidebar'>
      <SideBarNav signOut={signOut} />
      <SideBarSearch
        rooms={rooms}
        callback={(result) => setFilteredRooms(result)}
      />
      <nav className='chats-nav'>
        <NavLink
          className='nav-link'
          to='/chats'
          activeClassName='active-route'>
          <h3 className='link-title'>Chats</h3>
        </NavLink>
        <NavLink
          className='nav-link'
          to='/people'
          activeClassName='active-route'>
          <h3 className='link-title'>People</h3>
        </NavLink>
      </nav>
      <div className='rooms-container'>
        <Switch>
          <Route path='/chats' component={Rooms} />
          <Route path='/room' component={Rooms} />
          {/* <Route path='/people' component={People} />
          <Route path='/room' component={People} /> */}
        </Switch>
        {/* {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <Room key={room.id} roomData={room} />)
        ) : (
          <p className='no-results'>No users or chats found</p>
        )} */}
      </div>
    </div>
  );
};

export default RoomsTab;
