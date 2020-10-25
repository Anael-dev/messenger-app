import roomsReducer from "./roomsReducer";
import usersReducer from "./usersReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  roomsReducer,
  usersReducer,
});

export default rootReducer;
