import { FILTER_ROOMS, GET_REALTIME_ROOMS } from "./types";

export const filterRooms = (input) => {
  return {
    type: FILTER_ROOMS,
    payload: input,
  };
};

export const getRooms = (rooms) => {
  return {
    type: GET_REALTIME_ROOMS,
    payload: rooms,
  };
};
