import React, { useContext } from "react";
import ReactEmoji from "react-emoji";
import "./Message.css";
import { AuthContext } from "../../../../../context/AuthContextProvider";

const Message = ({ messageData }) => {
  const { content, createdAt, name, uid } = messageData;
  const { currentUser } = useContext(AuthContext);

  const messageClass = uid === currentUser.uid ? "sent" : "received";

  const checkMessageDate = (msgTime) => {
    const today = new Date().toDateString();
    const messageDate = msgTime.toDateString();

    if (today === messageDate) {
      // NOW
      return msgTime.toLocaleString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      // Some other time
      return msgTime.toLocaleString("en-GB", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <>
      {createdAt && (
        <div className={`message ${messageClass}`}>
          <span className='message-author'>
            {messageClass === "sent" ? "you" : name}
          </span>
          <div className='message-details'>
            <p className='message-text'>{ReactEmoji.emojify(content)}</p>
            <span className='message-timestamp'>
              {createdAt && checkMessageDate(new Date(createdAt))}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
