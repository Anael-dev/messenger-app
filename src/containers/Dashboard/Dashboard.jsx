import React, { useEffect, useContext, useState } from "react";
import { db } from "../../firebase/base";
import { AuthContext } from "../../context/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { setRooms, setWindowWidth } from "../../actions/roomsActions";
import { setUsers } from "../../actions/usersActions";
import RoomsTab from "../RoomsTab/RoomsTab";
import "./DashBoard.scss";
import ChatTab from "../ChatTab/ChatTab";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const loadedRooms = useSelector((state) => state.roomsReducer.loadedRooms);
  const [loadedUsers, setLoadedUsers] = useState(false);
  const [windowWidth] = useState(window.innerWidth);

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
        unsubscribeUsers();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser && loadedUsers) {
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
          <div className='loader'></div>
      )}
    </div>
  );
};

export default Dashboard;
