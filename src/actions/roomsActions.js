import { FILTER_ROOMS, SET_REALTIME_ROOMS } from "./types";

export const filterRooms = (input='') => {
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
