import { GET_ALL_NOTIFS } from "../actions/types";

const initialState = {
  notifs: [],
};

export default function setNotifications(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_NOTIFS:
      return {
        ...state,
        notifs: action.payload,
      };
    default:
      return state;
  }
}
