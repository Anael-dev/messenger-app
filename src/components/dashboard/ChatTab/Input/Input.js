import React, { useState, useContext } from "react";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import "./Input.css";
import { AuthContext } from "../../../../firebase/auth";

const Input = ({ messagesRef }) => {
  const [inputValue, setInputValue] = useState("");
  const { currentUser } = useContext(AuthContext);

  const sendMessage = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      content: inputValue,
      uid: currentUser.uid,
      name: currentUser.displayName,
      createdAt: new Date(),
    });
    setInputValue("");
  };

  return (
    <form className='input-form' onSubmit={(e) => sendMessage(e)}>
      <input
        type='text'
        value={inputValue}
        placeholder='Type a message'
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
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
