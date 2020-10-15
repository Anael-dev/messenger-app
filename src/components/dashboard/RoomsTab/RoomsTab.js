import React, { useState, useEffect, useContext } from "react";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import { Avatar, IconButton } from "@material-ui/core";
import "./RoomsTab.css";
import Rooms from "./Rooms/Rooms";
import { db } from "../../../firebase/base";
import { AuthContext } from "../../../firebase/auth";
import SideBarNav from "./SideBarNav/SideBarNav";
import SideBarSearch from "./SideBarSearch/SideBarSearch";

const RoomsTab = ({ signOut }) => {
  const [rooms, setRooms] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (currentUser) {
      const unsubscribe = db
        .collection("rooms")
        .where("members", "array-contains", {
          name: currentUser.displayName,
          uid: currentUser.uid,
        })
        .onSnapshot((snap) =>
          setRooms(
            snap.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }))
          )
        );
      return () => {
        console.log("unsubscribed");
        unsubscribe();
      };
    }
  }, [currentUser]);

  return (
    <div className='sidebar'>
      <SideBarNav signOut={signOut} />
      <SideBarSearch />
      <Rooms rooms={rooms} />
    </div>
  );
};

export default RoomsTab;
