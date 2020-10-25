import React, { useState, useEffect, useContext } from "react";
import "../RoomsTab.css";
import { useSelector, useDispatch } from "react-redux";
import User from "./User";

const Users = () => {
  const filteredUsers = useSelector(
    (state) => state.usersReducer.filteredUsers
  );

  return (
    <div>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => <User key={user.id} userData={user} />)
      ) : (
        <p className='no-results'>No users found</p>
      )}
    </div>
  );
};

export default Users;
