import { GET_ALL_EVENTS, GET_AFFILIATED_EVENTS } from "../actions/types";

const initialState = {
  events: {},
  affiliatedData: {},
  data: [],
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
    default:
      return state;
  }
}
