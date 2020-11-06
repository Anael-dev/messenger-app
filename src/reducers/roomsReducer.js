import {
  FILTER_ROOMS,
  SET_REALTIME_ROOMS,
  SET_UNREAD_ROOM_MESSAGES,
} from "../actions/types";

const initialState = {
  loadedRooms: false,
  rooms: [],
  filteredRooms: [],
};

const roomsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REALTIME_ROOMS:
      return {
        ...state,
        rooms: payload,
        filteredRooms: payload,
        loadedRooms: true,
      };
    case FILTER_ROOMS:
      const inputVal = payload;
      let filteredArr;
      let filteredResult;
      if (inputVal) {
        const lowerInput = inputVal.trim().toLowerCase();
        filteredArr = state.rooms.filter(
          (room) =>
            room.lastMessage !== null &&
            room.name.toLowerCase().trim().includes(lowerInput)
        );
        if (filteredArr !== state.rooms) {
          if (filteredArr.length > 0) {
            filteredResult = filteredArr;
          } else {
            filteredResult = [];
          }
        }
      } else {
        filteredResult = [...state.rooms];
      }
      return {
        ...state,
        filteredRooms: filteredResult,
      };
    case SET_UNREAD_ROOM_MESSAGES:
      const { roomId, counterVal } = payload;
      console.log(roomId);
      console.log(counterVal);

      const mappedRooms = state.rooms.map((room) => {
        if (room.id === roomId) {
          return { ...room, unreadMessages: counterVal };
        }
        return room;
      });
      
      return {
        ...state,
        rooms: mappedRooms,
        filteredRooms: mappedRooms,
      };
    default:
      return state;
  }
};

export default roomsReducer;
