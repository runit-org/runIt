import { GET_ALL_NOTIFS } from "../actions/types";

const initialState = {
  data: [],
  notifs: [],
};

export default function setEvents(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTIFS:
      return {
        ...state,
        notifs: action.payload,
        data: action.payload.data,
      };
    default:
      return state;
  }
}
