import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ChatRoom.css";
import { Avatar } from "@material-ui/core";
import Messages from "../Messages/Messages";
import { db } from "../../../../firebase/base";
import Input from "../Input/Input";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AttachFileIcon from "@material-ui/icons/AttachFile";
// import SearchIcon from "@material-ui/icons/Search";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { AuthContext } from "../../../../firebase/auth";

const ChatRoom = ({ match }) => {
  const [roomData, setRoomData] = useState(null);
  const [chatUser, setChatUser] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { roomId } = useParams();

  const messagesRef = db.collection("rooms").doc(roomId).collection("messages");
  const roomRef = db.collection("rooms").doc(roomId);

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
              lastSeen: snap.data().lastSeen.toDate(),
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
        <Avatar />
        {roomData && (
          <div className='chat-header__info'>
            <h3>{roomData.name}</h3>
            {roomData.type === "private" &&
              chatUser &&
              (chatUser.active ? (
                <p>online</p>
              ) : (
                <p>last seen at {chatUser.lastSeen.toUTCString()}</p>
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
