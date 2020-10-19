// import { ADD_POST, DELETE_POST } from "../actions/types";

const initialState = {
//   posts: [
//     { id: 1, message: "hi" },
//     { id: 2, message: "hello" },
//     { id: 3, message: "bye" },
//   ],
//   post: "",
};
const roomsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
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
