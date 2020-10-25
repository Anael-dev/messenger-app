import React, { useContext, useEffect, useState } from "react";
import "../Rooms/Room/Room.css";
import { Avatar } from "@material-ui/core";
import { Link, NavLink } from "react-router-dom";
import { db } from "../../../../firebase/base";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../../context/auth";

const User = ({ userData }) => {
  const [userChatId, setUserChatId] = useState("");
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const redirectToRoom = async () => {
    if (userChatId) {
      history.push(`/chats/room/${userChatId}`);
    } else {
      const newRoom = await db.collection("rooms").add({
        type: "private",
        lastMessage: null,
        members: [
          { name: currentUser.displayName, uid: currentUser.uid },
          { name: userData.name, uid: userData.uid },
        ],
        // createdAt: new Date(),
      });
      history.push(`/users/room/${newRoom.id}`);
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
          const userRooms = snap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (userRooms.length > 0) {
            setUserChatId(userRooms[0].id);
          }
        });
      return () => unsubscribe();
    }
  }, [userData.id]);

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
