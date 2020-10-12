import React, { useState, useEffect, useRef } from "react";
import Message from "../Messages/Message/Message";

const Messages = ({ messagesRef, id }) => {
  //reference to messages user's subcollection
  //   const messagesRef = db.collection("rooms").doc(id).collection("messages");

  //querying 20 messages by time order
  const messagesQuery = messagesRef.orderBy("createdAt").limit(20);

  const [messages, setMessages] = useState([]);
  const messagesEnd = useRef(null);

  //scroll to bottom on every render
  useEffect(() => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
      }));
      setMessages(newMessages);
    });

    //unsubscribe callback when rerender useEffect/unmount
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      <div>
        {messages.length &&
          messages.map((message) => (
            <Message key={message.id} messageData={message} />
          ))}
      </div>
      <div ref={messagesEnd}></div>
    </div>
  );
};

export default Messages;
