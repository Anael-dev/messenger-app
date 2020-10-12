import React from "react";
import "./ChatTab.css";
import { Avatar } from "@material-ui/core";
import Messages from "./Messages/Messages";
import { db } from "../../../firebase/base";
import Input from "./Input/Input";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AttachFileIcon from "@material-ui/icons/AttachFile";
// import SearchIcon from "@material-ui/icons/Search";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";

const ChatTab = ({ id }) => {
  const messagesRef = db.collection("rooms").doc(id).collection("messages");

  return (
    <div className='chat'>
      <div className='chat-header'>
        <Avatar />
        <div className='chat-header__info'>
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>
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
        <Messages messagesRef={messagesRef} id={id} />
      </div>
      <div className='chat-footer'>
        <InsertEmoticonIcon />
        <Input messagesRef={messagesRef} />
      </div>
    </div>
  );
};

export default ChatTab;
