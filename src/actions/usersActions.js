import {
  FILTER_USERS,
  SET_REALTIME_USERS,
} from "./types";

export const filterUsers = (input) => {
  return {
    type: FILTER_USERS,
    payload: input,
  };
};

export const setUsers = (users) => {
  return {
    type: SET_REALTIME_USERS,
    payload: users,
  };
};


