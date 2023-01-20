import { GET_CURRENT_USER_PROFILE, GET_USER_PROFILE } from "../actions/types";

const initialState = {
  userProfile: [],
  currProfile: [],
};

export default function setUser(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        currProfile: action.payload,
      };

    default:
      return state;
  }
}
