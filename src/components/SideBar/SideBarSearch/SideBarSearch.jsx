import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterRooms } from "../../../actions/roomsActions";
import { filterUsers } from "../../../actions/usersActions";
import { useHistory, useParams } from "react-router-dom";
import "./SideBarSearch.scss";

const SideBarSearch = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const history = useHistory();
  const { category } = useParams();

  useEffect(() => {
    dispatch(filterRooms(input));
    dispatch(filterUsers(input));
  }, [input, dispatch]);

  const backToAllRooms = () => {
    setInput("");
    dispatch(filterRooms());
  };

  return (
    <div className='sidebar-search'>
      <div className='chat-section'>
        <h3>{category}</h3>
        {category !== "users" && (
          <button
            title='new chat'
            className='new-chat-button'
            onClick={() => history.push("/dashboard/users")}>
            <i className='fas fa-plus-circle'></i>{" "}
          </button>
        )}
      </div>
      <div className='sidebar-search__body'>
        {input ? (
          <button onClick={() => backToAllRooms()}>
            <i className='fas fa-arrow-left'></i>
          </button>
        ) : (
          <i className='fas fa-search'></i>
        )}
        <input
          type='text'
          value={input}
          placeholder='Search'
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SideBarSearch;
