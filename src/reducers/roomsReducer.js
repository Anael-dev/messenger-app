import { FILTER_ROOMS, SET_REALTIME_ROOMS } from "../actions/types";

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
    default:
      return state;
  }
};

export default roomsReducer;
