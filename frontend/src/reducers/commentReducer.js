import { GET_ALL_COMMENTS } from "../actions/types";

const initialState = {
  events: {},
};

export default function setComments(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...state,
        events: action.payload,
      };

    default:
      return state;
  }
}
