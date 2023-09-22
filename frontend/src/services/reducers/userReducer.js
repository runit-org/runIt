import {
  GET_CURRENT_USER_PROFILE,
  GET_USER_ACTIVITY,
  GET_USER_PROFILE,
  GET_VOTES,
} from "../constants/types";

const initialState = {
  userProfile: [],
  currProfile: [],
  votes: [],
  activity: [],
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
    case GET_VOTES:
      return {
        ...state,
        votes: action.payload,
      };
    case GET_USER_ACTIVITY:
      return {
        ...state,
        activity: action.payload,
      };

    default:
      return state;
  }
}
