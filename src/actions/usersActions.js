import { FILTER_USERS, GET_REALTIME_USERS } from "./types";

export const filterUsers = (input) => {
  return {
    type: FILTER_USERS,
    payload: input,
  };
};

export const getUsers = (users) => {
  return {
    type: GET_REALTIME_USERS,
    payload: users,
  };
};
