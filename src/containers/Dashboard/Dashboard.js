import React, { useEffect, useContext, useState } from "react";
import { db } from "../../firebase/base";
import { AuthContext } from "../../context/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { setRooms, setWindowWidth } from "../../actions/roomsActions";
import { setUsers } from "../../actions/usersActions";
import ChatTab from "../ChatTab/ChatTab";
import RoomsTab from "../RoomsTab/RoomsTab";
import "./DashBoard.css";

const Dashboard = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const loadedRooms = useSelector((state) => state.roomsReducer.loadedRooms);
  const [loadedUsers, setLoadedUsers] = useState(false);
  const [windowWidth, setWidth] = useState(window.innerWidth);
  // const [nickName, setNickName] = useState(currentUser.name);

  // const submitNickname = async (e) => {
  //   e.preventDefault();
  //   if (nickName === "") return;
  //   const userRef = db.collection("users").doc(currentUser.uid);
  //   await userRef.update({ nickName });
  //   setCurrentUser((currUser) => ({ ...currUser, nickName }));
  // };

  useEffect(() => {
    dispatch(setWindowWidth(windowWidth));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      dispatch(setWindowWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [windowWidth]);

  useEffect(() => {
    if (currentUser) {
      // if (currentUser.nickName) {
      const unsubscribeUsers = db
        .collection("users")
        .where("uid", "!=", currentUser.uid)
        .onSnapshot(async (snap) => {
          const users = snap.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          await dispatch(setUsers(users));
          setLoadedUsers(true);
        });

      return () => {
        console.log("unsubscribed");
        unsubscribeUsers();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && loadedUsers) {
      // if (currentUser.nickName && loadedUsers) {
      if (users.length > 0) {
        const unsubscribeRooms = db
          .collection("rooms")
          // .where(`members.${currentUser.uid}.uid`, "==", currentUser.uid)
          .where("members", "array-contains", currentUser.uid)
          // .where("lastMessage", "!=", null)
          .orderBy("lastMessageTime", "desc")
          .onSnapshot(async (snap) => {
            let chatUserId;
            const userRooms = snap.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              if (data.type === "private") {
                chatUserId = data.members.find(
                  (uid) => uid !== currentUser.uid
                );
              }
              return {
                ...data,
                id: doc.id,
                name:
                  data.name ||
                  users.find((user) => user.id === chatUserId).name,
                photo:
                  data.photo ||
                  users.find((user) => user.id === chatUserId).photo,
                lastMessageTime:
                  data.lastMessageTime === null
                    ? null
                    : data.lastMessageTime.toDate(),
              };
            });
            dispatch(setRooms(userRooms));
          });

        return () => {
          console.log("unsubscribed");
          unsubscribeRooms();
        };
      }
    }
    // eslint-disable-next-line
  }, [currentUser, loadedUsers, dispatch]);

  return (
    <div className='dashboard'>
      {loadedUsers && loadedRooms ? (
        <div className='dashboard__body'>
          <RoomsTab />
          <ChatTab />
        </div>
      ) : (
        <h3>Loading...</h3>
      )}
      {/* {currentUser.nickName ? (
        loadedUsers && loadedRooms ? (
          <div className='dashboard__body'>
            <RoomsTab />
            <ChatTab />
          </div>
        ) : (
          <h3>Loading...</h3>
        )
      ) : (
        <div className='popup active'>
          <div className='overlay'></div>
          <div className='model'>
            <form onSubmit={(e) => submitNickname(e)}>
              <h2>Your Nickname: </h2>
              <input
                type='text'
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
              />
              <button type='submit'>I'm Done!</button>
            </form>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Dashboard;
