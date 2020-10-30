import { SET_REALTIME_USERS, FILTER_USERS } from "../actions/types";

const initialState = {
  users: [],
  filteredUsers: [],
};
const roomsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_REALTIME_USERS:
      return {
        ...state,
        users: payload,
        filteredUsers: payload,
      };
    case FILTER_USERS:
      const inputVal = payload;
      let filteredArr;
      let filteredResult;
      if (inputVal) {
        const lowerInput = inputVal.trim().toLowerCase();
        filteredArr = state.users.filter((user) =>
          user.name.toLowerCase().trim().includes(lowerInput)
        );
        if (filteredArr !== state.users) {
          if (filteredArr.length > 0) {
            filteredResult = filteredArr;
          } else {
            filteredResult = [];
          }
        }
      } else {
        filteredResult = [...state.users];
      }
      return {
        ...state,
        filteredUsers: filteredResult,
      };
    // case ADD_POST:
    //   return { ...state, posts: [...state.posts, payload] };
    // case DELETE_POST:
    //   return {
    //     ...state,
    //     posts: state.posts.filter((x) => x.id !== payload.id),
    //   };
    default:
      return state;
  }
};

export default roomsReducer;
