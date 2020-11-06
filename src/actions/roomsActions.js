import {
  FILTER_ROOMS,
  SET_REALTIME_ROOMS,
  SET_UNREAD_ROOM_MESSAGES,
} from "./types";

export const filterRooms = (input = "") => {
  return {
    type: FILTER_ROOMS,
    payload: input,
  };
};

export const setRooms = (rooms) => {
  return {
    type: SET_REALTIME_ROOMS,
    payload: rooms,
  };
};

export const setUnreadMessages = (roomId, counterVal) => {
  return {
    type: SET_UNREAD_ROOM_MESSAGES,
    payload: { roomId, counterVal },
  };
};
