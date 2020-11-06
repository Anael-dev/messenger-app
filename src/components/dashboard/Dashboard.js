import React, { useEffect, useContext, useState } from "react";
import { db } from "../../firebase/base";
import { AuthContext } from "../../context/AuthContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { setRooms } from "../../actions/roomsActions";
import { setUsers } from "../../actions/usersActions";
import ChatTab from "./ChatTab/ChatTab";
import RoomsTab from "./RoomsTab/RoomsTab";
import "./DashBoard.css";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer.users);
  const loadedRooms = useSelector((state) => state.roomsReducer.loadedRooms);
  const [loadedUsers, setLoadedUsers] = useState(false);

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
        console.log("unsubscribed");
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
          .orderBy("lastMessage", "desc")
          .onSnapshot(async (snap) => {
            let chatUserId;
            const userRooms = snap.docs.map((doc) => {
              const data = doc.data({ serverTimestamps: "estimate" });
              if (data.type === "private") {
                // const userKey = Object.keys(data.members).find(
                //   (id) => id !== currentUser.uid
                // );
                // chatUserId = data.members[userKey];
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
                lastMessage: data.lastMessage?.toDate(),
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
    </div>
  );
};

export default Dashboard;
