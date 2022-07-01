import { combineReducers } from "redux";
import securityReducer from "./securityReducer";
import errorReducer from "./errorReducer";
import eventReducer from "./eventReducer";

export default combineReducers({
  security: securityReducer,
  errors: errorReducer,
  events: eventReducer,
});
