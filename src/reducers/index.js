import { combineReducers } from "redux";
import user from "./userReducer";
import allUsers from "./allUsersReducer";
import componentsReducer from "./compoenetsReducer";
import currentChatRoom from "./currentChatRoomReducer";
import allRooms from "./allRoomsReducer";

const rootReducer = combineReducers({
  user,
  allUsers,
  components: componentsReducer,
  currentChatRoom,
  allRooms,
});

export default rootReducer;
