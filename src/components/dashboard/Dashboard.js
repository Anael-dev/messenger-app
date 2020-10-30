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
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (currentUser && loadedUsers) {
      if (users.length > 0) {
        const unsubscribeRooms = db
          .collection("rooms")
          .where("members", "array-contains", {
            name: currentUser.name,
            uid: currentUser.uid,
          })
          // .where("lastMessage", "!=", null)
          .orderBy("lastMessage", "desc")
          .onSnapshot(async (snap) => {
            let chatUser;
            const userRooms = snap.docs.map((doc) => {
              if (doc.data().type === "private") {
                chatUser = doc
                  .data()
                  .members.find((user) => user.uid !== currentUser.uid);
              }

              return {
                ...doc.data(),
                id: doc.id,
                name: doc.data().name || chatUser?.name,
                photo:
                  doc.data().photo ||
                  users.find((user) => user.id === chatUser.uid).photo,
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
