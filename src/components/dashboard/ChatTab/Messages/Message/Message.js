import React, { useContext } from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";
import { AuthContext } from "../../../../../firebase/auth";

const Message = ({ messageData }) => {
  const { content, createdAt, name, uid } = messageData;
  const { currentUser } = useContext(AuthContext);

  const messageClass = uid === currentUser.uid ? "sent" : "received";
  return (
    <>
      {
        <div className={`message ${messageClass}`}>
          <span className='message-author'>
            {messageClass === "sent" ? "you" : name}
          </span>
          <p className='message-text'>{ReactEmoji.emojify(content)}</p>
          <span className='message-timestamp'>{createdAt.toUTCString()}</span>
        </div>
      }
    </>
  );
};

export default Message;
