import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterRooms } from "../../../actions/roomsActions";
import { filterUsers } from "../../../actions/usersActions";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
// import { IconButton } from "@material-ui/core";
import "./SideBarSearch.scss";

const SideBarSearch = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  // const [filteredResult, setFilteredResult] = useState([]);

  useEffect(() => {
    dispatch(filterRooms(input));
    dispatch(filterUsers(input));
  }, [input, dispatch]);

  // useEffect(() => {
  //   callback(filteredResult);
  // }, [filteredResult]);

  const backToAllRooms = () => {
    setInput("");
    dispatch(filterRooms());
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
