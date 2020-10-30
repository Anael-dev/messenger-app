import React, { useContext } from "react";
import "../RoomsTab.css";
import Room from "./Room/Room";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../../context/AuthContextProvider";

const Rooms = () => {
  const { currentUser } = useContext(AuthContext);
  const { filteredRooms } = useSelector((state) => state.roomsReducer);
  const users = useSelector((state) => state.usersReducer.users);

  return (
    <>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => {
          let chatUser;
          if (room.type === "private") {
            const chatUserId = room.members.find(
              (user) => user.uid !== currentUser.uid
            ).uid;
            chatUser = users.find((user) => user.id === chatUserId);
          }
          if (room.lastMessage !== null) {
            return (
              <Room
                key={room.id}
                roomData={{
                  photo: room.photo || chatUser?.photo,
                  ...room,
                }}
              />
            );
          } else {
            return null;
          }
        })
      ) : (
        <p className='no-results'>No chats found</p>
      )}
    </>
  );
};

export default Rooms;
