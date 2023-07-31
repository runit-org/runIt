import { GET_ALL_COMMENTS } from "../constants/types";

const initialState = {
  comments: {},
};

export default function setComments(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };

    default:
      return state;
  }
}
