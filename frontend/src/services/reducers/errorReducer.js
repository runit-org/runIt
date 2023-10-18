import { GET_ERRORS, GET_SUCCESS, RESET_SUCCESS } from "../constants/types";

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
    case RESET_SUCCESS:
      return {
        ...state,
        success: {
          type: "",
          response: {},
        },
      };

    default:
      return state;
  }
}
