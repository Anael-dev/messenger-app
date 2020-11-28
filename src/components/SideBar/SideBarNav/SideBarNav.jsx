import React, { useState, useContext, useRef } from "react";
import { Avatar } from "@material-ui/core";
import { AuthContext } from "../../../context/AuthContextProvider";
import { db } from "../../../firebase/base";
import "./SideBarNav.scss";

const SideBarNav = () => {
  const [openMore, setOpenMore] = useState(false);
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const nameRef = useRef();

  const editUserName = async (e) => {
    e.preventDefault();
    if (nameRef.current?.value !== "") {
      await db.collection("users").doc(currentUser.uid).update({
        name: nameRef.current?.value,
      });
      setCurrentUser((user) => ({ ...user, name: nameRef.current?.value }));
    }
    setEditMode(!editMode);
  };

  return (
    <>
      <div
        className={`backdrop ${openMore ? "open" : null}`}
        onClick={() => setOpenMore(!openMore)}></div>
      <div className='sidebar-header'>
        <div className='sidebar-header__user-data'>
          <div className='user-avatar'>
            <Avatar src={currentUser?.photo} />
          </div>
          {editMode ? (
            <form onSubmit={(e) => editUserName(e)}>
              <input
                type='text'
                defaultValue={currentUser?.name}
                ref={nameRef}
              />
              <button type='submit' className='name-edit-btn' title='save'>
                <i className='fas fa-check'></i>
              </button>
            </form>
          ) : (
            <>
              <h4>{currentUser?.name}</h4>
              <button
                className='name-edit-btn'
                title='edit'
                onClick={() => setEditMode(!editMode)}>
                <i className='fas fa-edit'></i>
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBarNav;
