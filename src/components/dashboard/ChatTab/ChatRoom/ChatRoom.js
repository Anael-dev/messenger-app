import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ChatRoom.css";
import { Avatar, IconButton } from "@material-ui/core";
import Messages from "../Messages/Messages";
import { db } from "../../../../firebase/base";
import Input from "../Input/Input";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AttachFileIcon from "@material-ui/icons/AttachFile";
// import SearchIcon from "@material-ui/icons/Search";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { AuthContext } from "../../../../context/auth";
import { useHistory } from "react-router-dom";

const ChatRoom = () => {
  const [roomData, setRoomData] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const [backBtnActive, setBackBtnActive] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { roomId } = useParams();
  const history = useHistory();

  const messagesRef = db.collection("rooms").doc(roomId).collection("messages");
  const roomRef = db.collection("rooms").doc(roomId);

  useEffect(() => {
    if (backBtnActive) history.push("/chats");
  }, [backBtnActive]);

  useEffect(() => {
    roomRef.get().then((snap) => setRoomData({ ...snap.data(), id: snap.id }));
  }, [roomId]);

  useEffect(() => {
    if (roomData && roomData.type === "private") {
      const uid = roomData.members.filter((x) => x.uid !== currentUser.uid)[0]
        .uid;
      console.log(uid);
      const unsubscribe = db
        .collection("users")
        .doc(uid)
        .onSnapshot(
          (snap) => {
            setChatUser({
              ...chatUser,
              lastSeen: snap.data().lastSeen,
              active: snap.data().active,
            });
          }
          // setLastSeen(snap.data().lastSeen.toUTCString()
        );

      return () => unsubscribe();
    }
  }, [roomData]);

  return (
    <div className='chat'>
      <div className='chat-header'>
        <button
          className={`back-btn ${backBtnActive ? "back-btn__active" : null}`}
          onClick={() => setBackBtnActive(!backBtnActive)}>
          <ArrowBackIcon />
        </button>
        <Avatar />
        {roomData && (
          <div className='chat-header__info'>
            <h3>{roomData.name}</h3>
            {roomData.type === "private" &&
              chatUser &&
              (chatUser.active ? (
                <p>online</p>
              ) : (
                <p>
                  <span className='last-seen'>last seen at</span>
                  {new Date(chatUser.lastSeen?.toDate()).toLocaleString()}
                </p>
              ))}
            {roomData.type === "group" && (
              <p>{roomData.members.map((x) => x.name).join(", ")}</p>
            )}
          </div>
        )}
        <div className='chat-header__right'>
          {/* <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton> */}
        </div>
      </div>
      <div className='chat-body'>
        <Messages messagesRef={messagesRef} id={roomId} />
      </div>
      <div className='chat-footer'>
        <Input messagesRef={messagesRef} roomRef={roomRef} />
      </div>
    </div>
  );
};

export default ChatRoom;
