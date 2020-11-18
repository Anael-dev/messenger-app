import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./ChatRoom.scss";
import { Avatar } from "@material-ui/core";
import Messages from "../Messages/Messages";
import { db } from "../../firebase/base";
import Input from "../Input/Input";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AttachFileIcon from "@material-ui/icons/AttachFile";
// import SearchIcon from "@material-ui/icons/Search";
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import { AuthContext } from "../../context/AuthContextProvider";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebarView } from "../../actions/roomsActions";

const ChatRoom = () => {
  const { currentUser } = useContext(AuthContext);
  const [chatUserId, setChatUserId] = useState(null);
  const [backBtnActive, setBackBtnActive] = useState(false);
  const { roomId } = useParams();
  const history = useHistory();
  const users = useSelector((state) => state.usersReducer.users);
  const room = useSelector((state) =>
    state.roomsReducer.rooms.find((room) => room.id === roomId)
  );
  const { windowWidth, displaySidebar } = useSelector(
    (state) => state.roomsReducer
  );
  const chatUser = useSelector((state) =>
    state.usersReducer.users.find((user) => user.id === chatUserId)
  );
  const dispatch = useDispatch();
  const messagesRef = db.collection("rooms").doc(roomId).collection("messages");
  const roomRef = db.collection("rooms").doc(roomId);

  const redirectToChats = () => {
    history.push("/dashboard/chats");
  };
  useEffect(() => {
    if (backBtnActive) redirectToChats();
    // eslint-disable-next-line
  }, [backBtnActive]);

  useEffect(() => {
    if (room && room.type === "private") {
      // const userId = Object.keys(room.members).find(
      //   (id) => id !== currentUser.uid
      // );
      const userId = room.members.filter((uid) => uid !== currentUser.uid)[0];
      setChatUserId(userId);
    }
    // eslint-disable-next-line
  }, [roomId]);

  return (
    <div className='chat'>
      <div className='chat__header'>
        <button
          className={`back-btn ${backBtnActive ? "back-btn__active" : null}`}
          onClick={() => {
            setBackBtnActive(!backBtnActive);
            if (windowWidth <= 480 && !displaySidebar)
              dispatch(toggleSidebarView(true));
          }}>
          <ArrowBackIcon />
        </button>
        <Avatar src={room?.photo} />
        {room && (
          <div className='chat__header__info'>
            <h3>{room.name}</h3>
            {room.type === "private" &&
              chatUser &&
              (room.typingUsers.length > 0 &&
              room.typingUsers.some((x) => x !== currentUser.uid) ? (
                <p>typing...</p>
              ) : chatUser.active ? (
                <p>online</p>
              ) : (
                <p>
                  <span className='last-seen'>last seen at</span>
                  {chatUser.lastSeen &&
                    new Date(chatUser.lastSeen.toDate()).toLocaleString(
                      "he-il",
                      {
                        year: "numeric",
                        day: "numeric",
                        month: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                </p>
              ))}
            {room.type === "group" && (
              // <p>
              //   {Object.entries(room.members)
              //     .map((x) => x[1].name)
              //     .join(", ")}
              // </p>
              <p>
                {room.members
                  .map((uid) => {
                    if (uid === currentUser.uid) {
                      return currentUser.name;
                    }
                    return users?.find((user) => user.id === uid).name;
                  })
                  .join(", ")}
              </p>
            )}
          </div>
        )}
        <div className='chat__header__right'>
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
      <div className='chat__body'>
        <Messages messagesRef={messagesRef} id={roomId} />
      </div>
      <div className='chat__footer'>
        <Input messagesRef={messagesRef} roomRef={roomRef} />
      </div>
    </div>
  );
};

export default ChatRoom;
