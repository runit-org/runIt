import { GET_EVENT_SUGGESTIONS } from "../constants/types";

const initialState = {
  suggestEvent: {},
};

export default function setEvents(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_SUGGESTIONS:
      return {
        ...state,
        suggestEvent: action.payload,
      };
    default:
      return state;
  }
}
