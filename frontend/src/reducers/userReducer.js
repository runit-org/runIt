import { GET_USER_PROFILE } from "../actions/types";

const initialState = {
  userProfile: [],
};

export default function setUser(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };

    default:
      return state;
  }
}
