import React, { useContext } from "react";
import "../RoomsTab.css";
import Room from "./Room/Room";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../../context/auth";

const Rooms = () => {
  const filteredRooms = useSelector(
    (state) => state.roomsReducer.filteredRooms
  );
  const users = useSelector((state) => state.usersReducer.users);
  const { currentUser } = useContext(AuthContext);

  // useEffect(() => {
  //   if (currentUser) {
  //     const unsubscribe = db
  //       .collection("rooms")
  //       .where("members", "array-contains", {
  //         name: currentUser.displayName,
  //         uid: currentUser.uid,
  //       })
  //       .orderBy("lastMessage", "desc")
  //       .onSnapshot(async (snap) => {
  //         const userRooms = snap.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         // const userRooms = await getMappedRooms(snap.docs);
  //         // console.log(userRooms);
  //         dispatch(getRooms(userRooms));
  //       });
  //     return () => {
  //       console.log("unsubscribed");
  //       unsubscribe();
  //     };
  //   }
  // }, [currentUser]);

  return (
    <div>
      {filteredRooms.length > 0 ? (
        filteredRooms.map((room) => {
          let userData;
          if (room.type == "private") {
            const chatUserId = room.members.find(
              (user) => user.uid !== currentUser.uid
            ).uid;
            userData = users.find((user) => user.id === chatUserId);
          }

          return (
            <Room
              key={room.id}
              roomData={{
                ...room,
                name: room.name || userData?.name,
                photo: room.photo || userData?.photo,
              }}
            />
          );
        })
      ) : (
        <p className='no-results'>No chats found</p>
      )}
    </div>
  );
};

export default Rooms;
