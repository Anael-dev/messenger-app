import React, { useState, useEffect, useRef } from "react";
import Message from "../Messages/Message/Message";

const Messages = ({ messagesRef, id }) => {
  //querying 20 messages by time order
  const messagesQuery = messagesRef.orderBy("createdAt").limitToLast(20);

  const [messages, setMessages] = useState([]);
  const messagesEnd = useRef(null);

  //scroll to bottom on every render
  useEffect(() => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  });

  useEffect(() => {
    const unsubscribe = messagesQuery.onSnapshot((snapshot) => {
      const snapMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate(),
        // createdAt: doc.data().createdAt.toDate(),
      }));
      setMessages(snapMessages);
    });

    return () => unsubscribe();

    // eslint-disable-next-line
  }, [id]);

  return (
    <main>
      <div className='messages-container'>
        {messages.length > 0 &&
          messages.map((message) => (
            <Message key={message.id} messageData={message} />
          ))}
      </div>
      <div ref={messagesEnd}></div>
    </main>
  );
};

export default Messages;
