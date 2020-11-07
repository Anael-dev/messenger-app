import React, { useEffect, useState, useContext } from "react";
import "./Room.css";
import ReactEmoji from "react-emoji";
import { Avatar } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { db } from "../../../../../firebase/base";
import { useLocation } from "react-router-dom";
import { toggleSidebarView } from "../../../../../actions/roomsActions";
import { useDispatch, useSelector } from "react-redux";

const Room = ({ roomData }) => {
  // const [lastMessage, setLastMessage] = useState("");
  const [roomActive, setRoomActive] = useState(false);
  const [changesCounter, setChangesCounter] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const { windowWidth, displaySidebar } = useSelector(
    (state) => state.roomsReducer
  );

  useEffect(() => {
    if (location.pathname.includes(roomData.id)) {
      setChangesCounter(0);
      // dispatch(setUnreadMessages(roomData.id, 0));
      setRoomActive(true);
      if (windowWidth <= 480 && displaySidebar)
        dispatch(toggleSidebarView(false));
    } else {
      setRoomActive(false);
    }
  }, [location.pathname, roomData.id]);

  useEffect(() => {
    if (roomData.id) {
      let initState = true;
      const unsubscribe = db
        .collection("rooms")
        .doc(roomData.id)
        .collection("messages")
        .onSnapshot((snapshot) => {
          // setLastMessage(snapshot.docs.map((doc) => doc.data())[0]);
          if (initState) {
            initState = false;
          } else {
            if (!roomActive && !snapshot.docChanges().empty) {
              let changes = snapshot.docChanges();
              changes.forEach((change) => {
                if (change.type === "added") {
                  // console.log(roomData.name);
                  setChangesCounter((counter) => counter + 1);
                  // console.log(change.doc.data());
                  // console.log(change.type);
                }
              });
            }
          }
        });
      return () => unsubscribe();
    }
  }, [roomData.id, roomActive]);

  return (
    <>
      {/* {lastMessage && ( */}
        <NavLink
          key={roomData.id}
          className='room'
          activeClassName='selected-room'
          to={`/dashboard/chats/room/${roomData.id}`}
          onClick={() => {
            // console.log(WindowWidthContext.width);
            if (windowWidth <= 480) dispatch(toggleSidebarView(false));
          }}>
          <Avatar src={roomData.photo} /> {/* {roomData.lastMessage && ( */}
          <div className='room__info'>
            <div className='room__info__container'>
              <h2>{roomData.name}</h2>

              <p className='timestamp'>
                {new Date(roomData?.lastMessageTime).toLocaleString("en-GB", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className='room__info__container'>
              <p
                className={`room__info__message ${
                  changesCounter > 0 ? "bold" : null
                }`}>
                {ReactEmoji.emojify(roomData.lastMessageContent)}
              </p>
              <div
                className={`room__notification ${
                  changesCounter > 0 ? "open" : null
                }`}>
                <span className='room__notification__num'>
                  {changesCounter}
                </span>
              </div>
            </div>
          </div>
          {/* )} */}
        </NavLink>
      {/* )} */}
    </>
  );
};

export default Room;
