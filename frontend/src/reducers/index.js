import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";
import notificationReducer from "./notificationReducer";
import userReducer from "./userReducer";

export default combineReducers({
  security: securityReducer,
  errors: errorReducer,
  events: eventReducer,
  notifications: notificationReducer,
  users: userReducer,
});
