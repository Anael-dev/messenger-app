import React, { useState, useContext } from "react";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import "./Input.css";
import { AuthContext } from "../../context/AuthContextProvider";
import { firebase } from "../../firebase/base";

const Input = ({ messagesRef, roomRef }) => {
  const [inputValue, setInputValue] = useState("");
  const { currentUser } = useContext(AuthContext);
  let typingTimer;

  const typeMessage = async (e) => {
    if (e.key === "Enter") {
      clearTimeout(typingTimer);
      timeoutCallback();
      sendMessage(e);
    } else {
      roomRef.update({
        typingUsers: firebase.firestore.FieldValue.arrayUnion(currentUser.uid),
      });
      clearTimeout(typingTimer);
      typingTimer = setTimeout(timeoutCallback, 2000);
    }
  };

  const timeoutCallback = () => {
    roomRef.update({
      typingUsers: firebase.firestore.FieldValue.arrayRemove(currentUser.uid),
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (inputValue !== "") {
      try {
        setInputValue("");
       await messagesRef.add({
          content: inputValue,
          uid: currentUser.uid,
          name: currentUser.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });

        // await messageRef.update({
        //   createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        // });

        await roomRef.update({
          lastMessageTime: firebase.firestore.FieldValue.serverTimestamp(),
          lastMessageContent: inputValue,
        });
      } catch (err) {
        console.log(err);
      }
    }
    return;
  };

  return (
    <form className='input-form' onSubmit={(e) => sendMessage(e)}>
      <input
        type='text'
        value={inputValue}
        placeholder='Type a message'
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => typeMessage(e)}
      />
      {inputValue && (
        <IconButton type='submit'>
          <SendIcon />
        </IconButton>
      )}
    </form>
  );
};

export default Input;
