import React, { useEffect, useState } from "react";
import "./Room.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { db } from "../../../../firebase/base";
import { useLocation } from "react-router-dom";

const Room = ({ roomData }) => {
  const [lastMessage, setLastMessage] = useState("");
  const [roomActive, setRoomActive] = useState(false);
  const [changesCounter, setChangesCounter] = useState(0);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes(roomData.id)) {
      setChangesCounter(0);
      setRoomActive(true);
    } else {
      setRoomActive(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (roomData.id) {
      let initState = true;

      const unsubscribe = db
        .collection("rooms")
        .doc(roomData.id)
        .collection("messages")
        .orderBy("createdAt", "desc")
        .limit(1)
        .onSnapshot((snapshot) => {
          setLastMessage(snapshot.docs.map((doc) => doc.data())[0]);
          if (initState) {
            initState = false;
          } else {
            if (!roomActive && !snapshot.docChanges().empty) {
              let changes = snapshot.docChanges();
              changes.forEach((change) => {
                if (change.type == "added") {
                  console.log(roomData.name);
                  setChangesCounter((counter) => counter + 1);
                  console.log(change.doc.data());
                  console.log(change.type);
                }
                // console.log(change.doc.data());
                // console.log(change.type);
              });
            }
          }
        });
      return () => unsubscribe();
    }
  }, [roomData.id, roomActive]);

  return (
    <Link key={roomData.id} to={`/chat/${roomData.id}`}>
      <div className='room'>
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${roomData.id}.svg`}
        />
        <div className='room__info'>
          <div className='room__info__container'>
            <h2>{roomData.name}</h2>
            <p className='timestamp'>
              {lastMessage &&
                lastMessage.createdAt &&
                new Date(lastMessage.createdAt?.toDate()).toLocaleString(
                  "en-GB",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
            </p>
          </div>
          <div className='room__info__container'>
            <p className={`room__info__message ${changesCounter > 0 ? "bold" : null}`}>
              {lastMessage?.content}
            </p>
            <div
              className={`room__notification ${
                changesCounter > 0 ? "open" : null
              }`}>
              <span className='room__notification__num'>{changesCounter}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Room;
