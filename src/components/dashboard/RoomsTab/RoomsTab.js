import React, { useState, useEffect, useContext } from "react";
import "./RoomsTab.css";
import Room from "./Room/Room";
import { db } from "../../../firebase/base";
import { AuthContext } from "../../../context/auth";
import SideBarNav from "./SideBarNav/SideBarNav";
import SideBarSearch from "./SideBarSearch/SideBarSearch";

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
      <div className='rooms-container'>
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => <Room key={room.id} roomData={room} />)
        ) : (
          <p className='no-results'>No users or chats found</p>
        )}
      </div>
    </div>
  );
};

export default RoomsTab;
