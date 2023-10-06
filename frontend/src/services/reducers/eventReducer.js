import {
  GET_ALL_EVENTS,
  GET_AFFILIATED_EVENTS,
  GET_EVENT_MEMBERS,
  GET_SINGLE_EVENT,
} from "../constants/types";

const initialState = {
  event: {},
  affiliatedData: {},
  eventMembers: {},
  events: {
    results: [],
    next: null,
    currentPage: 0,
  },
};

export default function setEvents(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_EVENT:
      return {
        ...state,
        event: action.payload,
      };
    case GET_ALL_EVENTS:
      return {
        ...state,
        events: {
          results: [...state.events.results, ...action.payload.results],
          next: action.payload.next,
          currentPage: state.events.currentPage + 1,
          count: action.payload.count,
        },
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
