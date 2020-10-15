import React, { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    const roomId = match.params.id;
    db.collection("rooms")
      .doc(roomId)
      .get()
      .then((snap) => setRoomData({ ...snap.data(), id: snap.id }));
  }, [match.params.id]);

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

  const messagesRef = db
    .collection("rooms")
    .doc(match.params.id)
    .collection("messages");

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
                <p>Last seen at {chatUser.lastSeen.toUTCString()}</p>
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
        <Messages messagesRef={messagesRef} id={match.params.id} />
      </div>
      <div className='chat-footer'>
        <Input messagesRef={messagesRef} />
      </div>
    </div>
  );
};

export default ChatRoom;
