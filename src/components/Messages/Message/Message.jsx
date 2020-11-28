import React, { useContext, useEffect, useState } from "react";
import ReactEmoji from "react-emoji";
import "./Message.scss";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useSelector } from "react-redux";

const Message = ({ messageData }) => {
  const { content, createdAt, uid } = messageData;
  const { currentUser } = useContext(AuthContext);
  const { users } = useSelector((state) => state.usersReducer);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    if (uid !== currentUser.uid) {
      const user = users.find((user) => user.uid === uid);
      setChatUser(user);
    }
  }, [uid]);

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
    <div className={`message ${chatUser ? "received" : "sent"}`}>
      <div className='message__details'>
        <p className='message__text'>{ReactEmoji.emojify(content)}</p>
        <span className='timestamp'>
          {createdAt
            ? checkMessageDate(new Date(createdAt))
            : new Date().toLocaleString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
        </span>
      </div>
    </div>
  );
};

export default Message;
