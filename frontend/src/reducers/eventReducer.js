import { GET_ALL_EVENTS } from "../actions/types";

const initialState = {
  events: {},
  data: [],
};

export default function setEvents(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: action.payload,
        data: action.payload.data,
      };
    default:
      return state;
  }
}
