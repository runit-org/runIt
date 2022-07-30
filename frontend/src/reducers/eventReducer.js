import {
  GET_ALL_EVENTS,
  GET_AFFILIATED_EVENTS,
  GET_EVENT_MEMBERS,
} from "../actions/types";

const initialState = {
  events: {},
  affiliatedData: {},
  eventMembers: {},
};

export default function setEvents(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: action.payload,
      };
    case GET_AFFILIATED_EVENTS:
      return {
        ...state,
        affiliatedData: action.payload,
      };
    case GET_EVENT_MEMBERS:
      return {
        ...state,
        eventMembers: action.payload,
      };
    default:
      return state;
  }
}
