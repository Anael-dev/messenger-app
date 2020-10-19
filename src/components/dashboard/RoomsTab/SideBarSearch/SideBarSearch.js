import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { IconButton } from "@material-ui/core";

import "./../RoomsTab.css";

const SideBarSearch = ({ rooms, callback }) => {
  const [input, setInput] = useState("");
  const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    let filteredArr;
    if (input) {
      const lowerInput = input.trim().toLowerCase();
      filteredArr = rooms.filter((room) =>
        room.name.toLowerCase().trim().includes(lowerInput)
      );
      if (filteredArr !== rooms) {
        if (filteredArr.length > 0) {
          setFilteredResult(filteredArr);
        } else {
          setFilteredResult([]);
        }
      }
    } else {
      setFilteredResult(rooms);
    }
  }, [input]);

  useEffect(() => {
    callback(filteredResult);
  }, [filteredResult]);

  const backToAllRooms = () => {
    setInput("");
    setFilteredResult(rooms);
  };

  return (
    <div className='sidebar-search'>
      <div className='sidebar-search__body'>
        {input ? (
          <button onClick={() => backToAllRooms()}>
            <ArrowBackIcon />
          </button>
        ) : (
          <SearchIcon />
        )}
        <input
          type='text'
          value={input}
          placeholder='Search or start new chat'
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SideBarSearch;
