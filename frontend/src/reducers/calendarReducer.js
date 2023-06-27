import { GET_DAY_EVENTS, GET_MONTHLY_EVENTS } from "../actions/types";

const initialState = {
  monthly: {},
  day: {},
};

export default function setCalendar(state = initialState, action) {
  switch (action.type) {
    case GET_MONTHLY_EVENTS:
      return {
        ...state,
        monthly: action.payload,
      };
    case GET_DAY_EVENTS:
      return {
        ...state,
        day: action.payload,
      };
    default:
      return state;
  }
}
