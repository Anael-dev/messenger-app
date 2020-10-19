import roomsReducer from "./roomsReducer";
// import todosReducer from "./todosReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  roomsReducer,
  // postsReducer,
});

export default rootReducer;
