import React, { useContext, useEffect, useState } from "react";
import "../Rooms/Room/Room.css";
import { Avatar } from "@material-ui/core";
import { db } from "../../../../firebase/base";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContextProvider";
import { useSelector } from "react-redux";

const User = ({ userData }) => {
  const [userChatId, setUserChatId] = useState("");
  const room = useSelector((state) =>
    state.roomsReducer.rooms.find((room) => room.id === userChatId)
  );
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const redirectToRoom = async () => {
    if (userChatId) {
      history.push(
        `/dashboard/${
          room.lastMessage !== null ? "chats" : "users"
        }/room/${userChatId}`
      );
    } else {
      const newRoom = await db.collection("rooms").add({
        type: "private",
        lastMessage: null,
        members: [
          { name: currentUser.name, uid: currentUser.uid },
          { name: userData.name, uid: userData.uid },
        ],
        typingUsers: [],
        // createdAt: new Date(),
      });
      history.push(`/dashboard/users/room/${newRoom.id}`);
    }
  };

  useEffect(() => {
    if (userData.id) {
      const unsubscribe = db
        .collection("rooms")
        .where("members", "array-contains", {
          name: userData.name,
          uid: userData.uid,
        })
        .where("type", "==", "private")
        .onSnapshot(async (snap) => {
          const userRoom = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (userRoom.length > 0) {
            setUserChatId(userRoom[0].id);
          }
        });
      return () => unsubscribe();
    }
  }, [userData]);

  return (
    <div>
      <button
        key={userData.id}
        className='user'
        onClick={() => redirectToRoom()}>
        <Avatar src={userData?.photo} />
        <div className='room__info'>
          <div className='room__info__container'>
            <h2>{userData.name}</h2>
          </div>
        </div>
      </button>
    </div>
  );
};

export default User;
