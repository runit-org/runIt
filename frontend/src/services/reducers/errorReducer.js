import { GET_ERRORS, GET_SUCCESS } from "../constants/types";

const initialState = {
  errors: {},
  success: {
    type: "",
    response: {},
  },
};

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case GET_SUCCESS:
      return {
        ...state,
        success: {
          type: action.payload.callType,
          response: action.payload.res,
        },
      };

    default:
      return state;
  }
}
