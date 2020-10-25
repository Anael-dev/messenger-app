import { FILTER_ROOMS, GET_REALTIME_ROOMS } from "../actions/types";

const initialState = {
  rooms: [],
  filteredRooms: [],
};

const roomsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_REALTIME_ROOMS:
      return {
        ...state,
        rooms: payload,
        filteredRooms: payload,
      };
    case FILTER_ROOMS:
      const inputVal = payload;
      let filteredArr;
      let filteredResult;
      if (inputVal) {
        const lowerInput = inputVal.trim().toLowerCase();
        filteredArr = state.rooms.filter((room) =>
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
